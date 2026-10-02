"use server";

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
