"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

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

export async function updateDisplayName(userId: string, newDisplayName: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) return { success: false, error: "Profile not found" };

    const now = new Date();
    const fifteenDaysAgo = new Date(now.getTime() - 15 * 24 * 60 * 60 * 1000);

    // Filter out dates older than 15 days
    const recentChanges = profile.displayNameChangeDates.filter((date: Date) => date > fifteenDaysAgo);

    if (recentChanges.length >= 2) {
      return { success: false, error: "Limit reached" };
    }

    // Add current date to the array
    recentChanges.push(now);

    await prisma.profile.update({
      where: { userId },
      data: {
        displayName: newDisplayName,
        displayNameChangeDates: recentChanges,
      },
    });

    // Invalidate the cache for this user's profile
    revalidateTag(`profile-${userId}`);

    return { success: true, displayName: newDisplayName, remainingChanges: 2 - recentChanges.length };
  } catch (error) {
    console.error("Error updating display name:", error);
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
