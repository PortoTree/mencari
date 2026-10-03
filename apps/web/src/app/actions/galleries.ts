"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/utils/prisma";

import { PostVisibility } from "@prisma/client";

export async function getUserGalleries(userId: string, currentUserId?: string | null) {
  try {
    const isSelf = currentUserId === userId;
    let isFriend = false;

    if (!isSelf && currentUserId) {
      const friendship = await prisma.friendship.findFirst({
        where: {
          OR: [
            { userId: userId, friendId: currentUserId },
            { userId: currentUserId, friendId: userId }
          ],
          status: 'ACCEPTED'
        }
      });
      isFriend = !!friendship;
    }

    let allowedVisibilities: PostVisibility[] = ['PUBLIC'];
    if (isSelf) {
      allowedVisibilities = ['PUBLIC', 'FRIENDS', 'PRIVATE', 'COMMUNITY_ONLY'];
    } else if (isFriend) {
      allowedVisibilities = ['PUBLIC', 'FRIENDS'];
    }

    const galleries = await prisma.gallery.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
      include: {
        posts: {
          where: {
            visibility: {
              in: allowedVisibilities
            }
          },
          orderBy: { createdAt: 'asc' },
          include: {
            postMedia: {
              include: { media: true }
            }
          }
        }
      }
    });

    // Sembunyikan galeri yang kosong jika bukan milik sendiri
    const filteredGalleries = isSelf ? galleries : galleries.filter((g: any) => g.posts.length > 0);

    return { success: true, galleries: filteredGalleries };
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return { success: false, error: "Failed to fetch galleries" };
  }
}

export async function createGallery(userId: string, name: string) {
  try {
    const gallery = await prisma.gallery.create({
      data: {
        name,
        userId
      }
    });
    return { success: true, gallery };
  } catch (error) {
    console.error("Error creating gallery:", error);
    return { success: false, error: "Failed to create gallery" };
  }
}

export async function updateGallery(galleryId: string, name?: string, privacy?: string) {
  try {
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (privacy !== undefined) data.privacy = privacy;

    const gallery = await prisma.gallery.update({
      where: { id: galleryId },
      data
    });

    if (privacy !== undefined) {
      const visibility = privacy as any;
      await prisma.post.updateMany({
        where: { galleryId },
        data: { visibility }
      });
    }
    revalidatePath("/", "layout");
    return { success: true, gallery };
  } catch (error) {
    console.error("Error updating gallery:", error);
    return { success: false, error: "Failed to update gallery" };
  }
}

export async function deleteGallery(galleryId: string) {
  try {
    await prisma.gallery.delete({
      where: { id: galleryId }
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    console.error("Error deleting gallery:", error);
    return { success: false, error: "Failed to delete gallery" };
  }
}
