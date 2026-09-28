"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProfile(userId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });
    return { success: true, profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateProfileMedia(userId: string, type: "avatar" | "cover", url: string) {
  try {
    if (type === "avatar") {
      await prisma.profile.update({
        where: { userId },
        data: { avatarUrl: url },
      });
    } else if (type === "cover") {
      await prisma.profile.update({
        where: { userId },
        data: { coverUrl: url },
      });
    }
    return { success: true, url };
  } catch (error) {
    console.error("Error updating profile media:", error);
    return { success: false, error: "Database error" };
  }
}
