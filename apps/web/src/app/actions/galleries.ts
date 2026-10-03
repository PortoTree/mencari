"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/utils/prisma";

export async function getUserGalleries(userId: string) {
  try {
    const galleries = await prisma.gallery.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        posts: {
          orderBy: { createdAt: 'desc' },
          include: {
            postMedia: {
              include: { media: true }
            }
          }
        }
      }
    });
    return { success: true, galleries };
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

export async function updateGallery(galleryId: string, name: string) {
  try {
    const gallery = await prisma.gallery.update({
      where: { id: galleryId },
      data: { name }
    });
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
