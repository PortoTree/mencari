"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

export async function createPost(data: {
  authorId: string;
  content: string;
  visibility: "PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY";
}) {
  try {
    const newPost = await prisma.post.create({
      data: {
        content: data.content,
        authorId: data.authorId,
        visibility: data.visibility,
      },
    });

    // Invalidate caches so the UI updates
    revalidateTag("feed_posts");
    revalidateTag(`profile_posts_${data.authorId}`, "page");

    return { success: true, post: newPost };
  } catch (error: any) {
    console.error("Error creating post:", error);
    return { success: false, error: error.message };
  }
}

export async function getFeedPosts(userId: string) {
  try {
    // 1. Get list of friend IDs
    const friendships = await prisma.friendship.findMany({
      where: {
        OR: [
          { userId: userId, status: "ACCEPTED" },
          { friendId: userId, status: "ACCEPTED" }
        ]
      }
    });
    
    const friendIds = friendships.map(f => f.userId === userId ? f.friendId : f.userId);

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { visibility: "PUBLIC" },
          { authorId: userId },
          { 
            visibility: "FRIENDS", 
            authorId: { in: friendIds } 
          }
        ]
      },
      include: {
        author: {
          include: {
            profile: true
          }
        },
        _count: {
          select: { likes: true, comments: true }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return { success: true, posts };
  } catch (error: any) {
    console.error("Error fetching feed:", error);
    return { success: false, error: error.message };
  }
}


export async function deletePost(postId: string, authorId: string) {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }
    await prisma.post.delete({ where: { id: postId } });
    
    revalidateTag("feed_posts");
    revalidateTag(`profile_posts_${authorId}`, "page");
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updatePost(postId: string, authorId: string, content: string, visibility: "PUBLIC" | "FRIENDS" | "PRIVATE" | "COMMUNITY_ONLY") {
  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post || post.authorId !== authorId) {
      return { success: false, error: "Unauthorized or not found" };
    }
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { content, visibility },
    });
    
    revalidateTag("feed_posts");
    revalidateTag(`profile_posts_${authorId}`, "page");
    
    return { success: true, post: updatedPost };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
