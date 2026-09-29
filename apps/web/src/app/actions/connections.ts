"use server";

import { PrismaClient } from "@prisma/client";
import { revalidateTag } from "next/cache";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const verifyToken = (token: string, expectedUserId: string) => {
  if (!token) return false;
  try {
    const secret = process.env.JWT_SECRET || 'mencari-online-secret-key-dev';
    const decoded = jwt.verify(token, secret) as any;
    return decoded.sub === expectedUserId;
  } catch (error) {
    return false;
  }
};

// ==========================================
// UNIFIED ONE-BUTTON LOGIC
// ==========================================

export async function handlePrimaryConnectionAction(token: string, currentUserId: string, targetUserId: string) {
  if (!verifyToken(token, currentUserId)) return { success: false, error: "Unauthorized" };
  if (currentUserId === targetUserId) return { success: false, error: "Cannot connect with yourself" };

  try {
    const block = await prisma.block.findFirst({
      where: {
        OR: [
          { userId: currentUserId, blockedUserId: targetUserId },
          { userId: targetUserId, blockedUserId: currentUserId }
        ]
      }
    });
    if (block) return { success: false, error: "Blocked" };

    const existingFriendship = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId: currentUserId, friendId: targetUserId },
          { userId: targetUserId, friendId: currentUserId }
        ]
      }
    });

    const following = await prisma.follow.findUnique({
      where: { followerId_followingId: { followerId: currentUserId, followingId: targetUserId } }
    });

    if (existingFriendship?.status === "ACCEPTED") {
      // 1. UNFOLLOW & REMOVE FRIEND
      await prisma.$transaction([
        prisma.friendship.delete({ where: { id: existingFriendship.id } }),
        prisma.follow.deleteMany({
          where: { followerId: currentUserId, followingId: targetUserId }
        }),
        // Optional: Do we also remove targetUserId following currentUserId? 
        // For now, let's just break the friendship and currentUserId unfollows targetUserId.
      ]);
    } else if (existingFriendship?.status === "PENDING") {
      if (existingFriendship.requestedBy === targetUserId) {
        // 2. ACCEPT REQUEST (Target requested Current)
        await prisma.$transaction([
          prisma.friendship.update({
            where: { id: existingFriendship.id },
            data: { status: "ACCEPTED", acceptedAt: new Date() }
          }),
          prisma.follow.upsert({
            where: { followerId_followingId: { followerId: currentUserId, followingId: targetUserId } },
            create: { followerId: currentUserId, followingId: targetUserId },
            update: {}
          }),
          // Send Notification to the original requester that their request was accepted
          prisma.notification.create({
            data: {
              userId: targetUserId,
              senderId: currentUserId,
              type: "FRIEND_ACCEPT"
            }
          })
        ]);
      } else {
        // 3. CANCEL REQUEST (Current requested Target)
        await prisma.$transaction([
          prisma.friendship.delete({ where: { id: existingFriendship.id } }),
          prisma.follow.deleteMany({
            where: { followerId: currentUserId, followingId: targetUserId }
          })
        ]);
      }
    } else {
      if (following) {
        // UNFOLLOW
        await prisma.follow.delete({
          where: { id: following.id }
        });
      } else {
        // FOLLOW & SEND REQUEST
        await prisma.follow.create({
          data: { followerId: currentUserId, followingId: targetUserId }
        });
        await prisma.notification.create({
          data: { userId: targetUserId, senderId: currentUserId, type: "FOLLOW" }
        });
        await prisma.friendship.create({
          data: { userId: currentUserId, friendId: targetUserId, requestedBy: currentUserId, status: "PENDING" }
        });
        await prisma.notification.create({
          data: { userId: targetUserId, senderId: currentUserId, type: "FRIEND_REQUEST" }
        });
      }
    }

    revalidateTag(`profile-${currentUserId}`);
    revalidateTag(`profile-${targetUserId}`);
    return { success: true };
  } catch (error) {
    console.error("Error in primary connection action:", error);
    return { success: false, error: "Database error" };
  }
}

// ==========================================
// FOLLOW / UNFOLLOW
// ==========================================

export async function toggleFollow(token: string, followerId: string, followingId: string) {
  if (!verifyToken(token, followerId)) return { success: false, error: "Unauthorized" };
  
  if (followerId === followingId) {
    return { success: false, error: "Cannot follow yourself" };
  }

  try {
    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId,
          followingId
        }
      }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id }
      });
      revalidateTag(`profile-${followerId}`);
      revalidateTag(`profile-${followingId}`);
      return { success: true, isFollowing: false };
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId,
          followingId
        }
      });
      revalidateTag(`profile-${followerId}`);
      revalidateTag(`profile-${followingId}`);
      return { success: true, isFollowing: true };
    }
  } catch (error) {
    console.error("Error toggling follow:", error);
    return { success: false, error: "Database error" };
  }
}

// ==========================================
// FRIENDSHIP
// ==========================================

export async function sendFriendRequest(token: string, userId: string, friendId: string) {
  if (!verifyToken(token, userId)) return { success: false, error: "Unauthorized" };
  
  if (userId === friendId) {
    return { success: false, error: "Cannot add yourself as friend" };
  }

  try {
    // Check if block exists
    const block = await prisma.block.findFirst({
      where: {
        OR: [
          { userId, blockedUserId: friendId },
          { userId: friendId, blockedUserId: userId }
        ]
      }
    });
    
    if (block) return { success: false, error: "Cannot send request" };

    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });

    if (existing) {
      return { success: false, error: "Friendship already exists or pending" };
    }

    await prisma.friendship.create({
      data: {
        userId,
        friendId,
        requestedBy: userId,
        status: "PENDING"
      }
    });
    
    revalidateTag(`profile-${userId}`);
    revalidateTag(`profile-${friendId}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending friend request:", error);
    return { success: false, error: "Database error" };
  }
}

export async function respondFriendRequest(token: string, userId: string, friendId: string, action: "ACCEPT" | "REJECT" | "REMOVE") {
  if (!verifyToken(token, userId)) return { success: false, error: "Unauthorized" };

  try {
    const existing = await prisma.friendship.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId }
        ]
      }
    });

    if (!existing) {
      return { success: false, error: "Request not found" };
    }

    if (action === "ACCEPT") {
      if (existing.requestedBy === userId) return { success: false, error: "Cannot accept your own request" };
      await prisma.friendship.update({
        where: { id: existing.id },
        data: { status: "ACCEPTED", acceptedAt: new Date() }
      });
    } else {
      // REJECT or REMOVE
      await prisma.friendship.delete({
        where: { id: existing.id }
      });
    }

    revalidateTag(`profile-${userId}`);
    revalidateTag(`profile-${friendId}`);
    return { success: true };
  } catch (error) {
    console.error("Error responding to friend request:", error);
    return { success: false, error: "Database error" };
  }
}

// ==========================================
// BLOCKING
// ==========================================

export async function toggleBlock(token: string, userId: string, blockedUserId: string) {
  if (!verifyToken(token, userId)) return { success: false, error: "Unauthorized" };

  if (userId === blockedUserId) {
    return { success: false, error: "Cannot block yourself" };
  }

  try {
    const existing = await prisma.block.findFirst({
      where: { userId, blockedUserId }
    });

    if (existing) {
      // Unblock
      await prisma.block.delete({
        where: { id: existing.id }
      });
      revalidateTag(`profile-${userId}`);
      revalidateTag(`profile-${blockedUserId}`);
      return { success: true, isBlocked: false };
    } else {
      // Block - also remove any friendship or follow
      await prisma.$transaction([
        prisma.block.create({
          data: { userId, blockedUserId }
        }),
        prisma.follow.deleteMany({
          where: {
            OR: [
              { followerId: userId, followingId: blockedUserId },
              { followerId: blockedUserId, followingId: userId }
            ]
          }
        }),
        prisma.friendship.deleteMany({
          where: {
            OR: [
              { userId, friendId: blockedUserId },
              { userId: blockedUserId, friendId: userId }
            ]
          }
        })
      ]);
      
      revalidateTag(`profile-${userId}`);
      revalidateTag(`profile-${blockedUserId}`);
      return { success: true, isBlocked: true };
    }
  } catch (error) {
    console.error("Error toggling block:", error);
    return { success: false, error: "Database error" };
  }
}

// ==========================================
// STATUS GETTER
// ==========================================

export async function getConnectionStatus(currentUserId: string, targetUserId: string) {
  if (!currentUserId || !targetUserId || currentUserId === targetUserId) {
    return { isFollowing: false, friendshipStatus: null, isBlocked: false, hasBlockedYou: false };
  }

  try {
    const [follow, friendship, block, blockedBy] = await Promise.all([
      prisma.follow.findUnique({
        where: { followerId_followingId: { followerId: currentUserId, followingId: targetUserId } }
      }),
      prisma.friendship.findFirst({
        where: {
          OR: [
            { userId: currentUserId, friendId: targetUserId },
            { userId: targetUserId, friendId: currentUserId }
          ]
        }
      }),
      prisma.block.findFirst({
        where: { userId: currentUserId, blockedUserId: targetUserId }
      }),
      prisma.block.findFirst({
        where: { userId: targetUserId, blockedUserId: currentUserId }
      })
    ]);

    return {
      isFollowing: !!follow,
      friendshipStatus: friendship ? friendship.status : null,
      friendshipRequestedBy: friendship ? friendship.requestedBy : null,
      isBlocked: !!block,
      hasBlockedYou: !!blockedBy
    };
  } catch (error) {
    console.error("Error getting connection status:", error);
    return { isFollowing: false, friendshipStatus: null, isBlocked: false, hasBlockedYou: false };
  }
}
