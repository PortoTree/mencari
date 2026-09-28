"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";

const prisma = new PrismaClient();

import { unstable_cache } from "next/cache";

export const getProfile = async (userId: string) => {
  const getCachedProfile = unstable_cache(
    async (id: string) => {
      return prisma.profile.findUnique({
        where: { userId: id },
        include: {
          user: {
            include: {
              socialLinks: true
            }
          }
        }
      });
    },
    [`profile-${userId}`],
    { tags: [`profile-${userId}`], revalidate: 604800 } // 7 days
  );

  try {
    const profile = await getCachedProfile(userId);
    return { success: true, profile };
  } catch (error) {
    console.error("Error fetching profile:", error);
    return { success: false, error: "Database error" };
  }
};

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
    
    // Invalidate cache
    revalidateTag(`profile-${userId}`);

    return { success: true, url };
  } catch (error) {
    console.error("Error updating profile media:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateProfileInfo(userId: string, data: any) {
  try {
    const { bio, locationName, websiteUrl, externalLinks, education, profession, gender, birthDate } = data;
    
    await prisma.profile.update({
      where: { userId },
      data: {
        bio,
        locationName,
        websiteUrl,
        externalLinks: externalLinks !== undefined ? externalLinks : undefined,
        education,
        profession,
        gender,
        birthDate: birthDate ? new Date(birthDate) : null,
      },
    });

    revalidateTag(`profile-${userId}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating profile info:", error);
    return { success: false, error: "Database error" };
  }
}
