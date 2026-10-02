"use server";

import { revalidateTag } from "next/cache";

import prisma from "@/utils/prisma";

// Helper to map DB post to frontend expected post structure
function mapPost(post: any) {
  if (!post) return post;
  const mapped = { ...post };
  if (post.postMedia) {
    mapped.mediaUrls = post.postMedia
      .sort((a: any, b: any) => a.order - b.order)
      .map((pm: any) => pm.media.originalUrl);
    delete mapped.postMedia;
  } else {
    mapped.mediaUrls = [];
  }
  if (post.taggedUsers) {
    mapped.taggedUsers = post.taggedUsers;
  }
  return mapped;
}

export async function createPost(data: {
  authorId: string;
  content: string;
  visibility: "PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY";
  label?: "DEFAULT" | "MENCARI" | "LOKASI" | "PROFESI" | "SEKOLAH";
  mediaUrls?: string[];
  mediaLayout?: "GRID" | "CAROUSEL";
  linkMetadata?: any;
  taggedUserIds?: string[];
}) {
  try {
    const extractedTags = data.content.match(/#[\w_]+/g)?.map(t => t.slice(1).toLowerCase()) || [];
    const uniqueTags = [...new Set(extractedTags)];

    if (uniqueTags.length > 0) {
      await Promise.all(uniqueTags.map(tag =>
        prisma.hashtag.upsert({
          where: { name: tag },
          update: { count: { increment: 1 } },
          create: { name: tag, count: 1 }
        })
      ));
    }

    const newPost = await prisma.post.create({
      data: {
        content: data.content,
        authorId: data.authorId,
        visibility: data.visibility,
        label: data.label || "DEFAULT",
        mediaLayout: data.mediaLayout || "GRID",
        linkMetadata: data.linkMetadata || null,
        postMedia: data.mediaUrls && data.mediaUrls.length > 0 ? {
          create: data.mediaUrls.map((url, idx) => ({
            order: idx,
            media: {
              create: {
                userId: data.authorId,
                type: "IMAGE",
                provider: "cloudinary",
                publicId: url.split('/').pop()?.split('.')[0] || url,
                originalUrl: url,
              }
            }
          }))
        } : undefined,
        taggedUsers: data.taggedUserIds && data.taggedUserIds.length > 0 ? {
          connect: data.taggedUserIds.map(id => ({ id }))
        } : undefined,
        hashtags: uniqueTags.length > 0 ? {
          connect: uniqueTags.map(tag => ({ name: tag }))
        } : undefined
      },
      include: {
        postMedia: {
          include: { media: true }
        },
        taggedUsers: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                displayName: true,
                avatarUrl: true,
                coverUrl: true
              }
            }
          }
        }
      }
    });

    if (data.taggedUserIds && data.taggedUserIds.length > 0) {
      await Promise.all(
        data.taggedUserIds.map((taggedId: string) =>
          prisma.notification.create({
            data: {
              type: "POST_TAG",
              userId: taggedId,
              senderId: data.authorId,
              postId: newPost.id,
            },
          })
        )
      );
    }

    revalidateTag("feed_posts", "page");
    revalidateTag(`profile_posts_${data.authorId}`, "page");

    return { success: true, post: mapPost(newPost) };
  } catch (error: any) {
    console.error("Error creating post:", error);
    return { success: false, error: error.message };
  }
}

export async function getFeedPosts(userId: string, targetProfileId?: string) {
  try {
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: userId, status: "ACCEPTED" },
          { friendId: userId, status: "ACCEPTED" }
        ]
      }
    });
    
    const friendIds = friendships.map(f => f.userId === userId ? f.friendId : f.userId);

    const visibilityFilter = {
      OR: [
        { visibility: "PUBLIC" },
        { authorId: userId },
        { 
          visibility: "FRIENDS", 
          authorId: { in: friendIds } 
        }
      ]
    };

    const whereClause = targetProfileId ? {
      AND: [
        {
          OR: [
            { authorId: targetProfileId },
            { taggedUsers: { some: { id: targetProfileId } } }
          ]
        },
        visibilityFilter
      ]
    } : visibilityFilter;

    const posts = await prisma.post.findMany({
      where: whereClause as any,
      include: {
        author: {
          include: { profile: true }
        },
        postMedia: {
          include: { media: true },
          orderBy: { order: 'asc' }
        },
        taggedUsers: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                displayName: true,
                avatarUrl: true,
                coverUrl: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return { success: true, posts: posts.map(mapPost) };
  } catch (error: any) {
    console.error("Error fetching feed:", error);
    return { success: false, error: error.message };
  }
}


export async function deletePost(postId: string, authorId: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId }, include: { hashtags: true } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }
    
    const tagsToRemove = post.hashtags.map(h => h.name);
    if (tagsToRemove.length > 0) {
      await prisma.hashtag.updateMany({
        where: { name: { in: tagsToRemove } },
        data: { count: { decrement: 1 } }
      });
    }

    await prisma.post.delete({ where: { id: postId } });
    
    revalidateTag("feed_posts", "page");
    revalidateTag(`profile_posts_${authorId}`, "page");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePost(postId: string, authorId: string, content: string, visibility: "PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY", label?: "DEFAULT" | "MENCARI" | "LOKASI" | "PROFESI" | "SEKOLAH", mediaLayout?: "GRID" | "CAROUSEL", taggedUserIds?: string[]) {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId }, include: { hashtags: true } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }

    const extractedTags = content.match(/#[\w_]+/g)?.map(t => t.slice(1).toLowerCase()) || [];
    const newUniqueTags = [...new Set(extractedTags)];
    const oldTags = post.hashtags.map(h => h.name);
    
    const tagsToAdd = newUniqueTags.filter(t => !oldTags.includes(t));
    const tagsToRemove = oldTags.filter(t => !newUniqueTags.includes(t));

    if (tagsToRemove.length > 0) {
      await prisma.hashtag.updateMany({
        where: { name: { in: tagsToRemove } },
        data: { count: { decrement: 1 } }
      });
    }

    if (tagsToAdd.length > 0) {
      await Promise.all(tagsToAdd.map(tag =>
        prisma.hashtag.upsert({
          where: { name: tag },
          update: { count: { increment: 1 } },
          create: { name: tag, count: 1 }
        })
      ));
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { 
        content, 
        visibility, 
        label, 
        mediaLayout: mediaLayout || undefined,
        taggedUsers: taggedUserIds ? {
          set: taggedUserIds.map(id => ({ id }))
        } : undefined,
        hashtags: {
          disconnect: tagsToRemove.map(tag => ({ name: tag })),
          connect: tagsToAdd.map(tag => ({ name: tag }))
        }
      },
      include: {
        postMedia: { include: { media: true } }
      }
    });
    
    revalidateTag("feed_posts", "page");
    revalidateTag(`profile_posts_${authorId}`, "page");
    
    return { success: true, post: mapPost(updatedPost) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getExplorePosts(tag?: string) {
  try {
    const whereClause: any = {
      visibility: "PUBLIC",
    };
    if (tag) {
      whereClause.hashtags = {
        some: { name: tag }
      };
    } else {
      whereClause.label = "MENCARI";
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        author: {
          include: { profile: true }
        },
        postMedia: {
          include: { media: true },
          orderBy: { order: 'asc' }
        },
        taggedUsers: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                displayName: true,
                avatarUrl: true,
                coverUrl: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    return { success: true, posts: posts.map(mapPost) };
  } catch (error: any) {
    console.error("Error fetching explore posts:", error);
    return { success: false, error: error.message };
  }
}

export async function getPostById(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          include: { profile: true }
        },
        postMedia: {
          include: { media: true },
          orderBy: { order: 'asc' }
        },
        taggedUsers: {
          select: {
            id: true,
            username: true,
            profile: {
              select: {
                displayName: true,
                avatarUrl: true,
                coverUrl: true
              }
            }
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      }
    });
    if (!post) return { success: false, error: "Post not found" };
    return { success: true, post: mapPost(post) };
  } catch (error: any) {
    console.error("Error fetching post by ID:", error);
    return { success: false, error: error.message };
  }
}
