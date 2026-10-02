import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

import prisma from "@/utils/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json({ users: [] });
    }

    const query = q.toLowerCase();

    // Check for current user via token cookie
    const token = req.cookies.get("token")?.value;
    let currentUserId: string | null = null;
    let friendIds: string[] = [];

    if (token) {
      try {
        const secret = process.env.JWT_SECRET || 'mencari-online-secret-key-dev';
        const decoded = jwt.verify(token, secret) as any;
        currentUserId = decoded.sub;
      } catch (err) {
        // Ignore invalid token
      }
    }

    if (currentUserId) {
      const friendships = await prisma.friendship.findMany({
        where: {
          OR: [
            { userId: currentUserId },
            { friendId: currentUserId },
          ],
          status: "ACCEPTED",
        },
        select: {
          userId: true,
          friendId: true,
        },
      });

      friendIds = friendships.map(f => (f.userId === currentUserId ? f.friendId : f.userId));
      
      // Also allow user to find themselves
      friendIds.push(currentUserId);
    }

    // Find users by username or displayName where privacyTag is PUBLIC, or FRIENDS (if they are friends)
    const users = await prisma.user.findMany({
      where: {
        AND: [
          {
            OR: [
              { username: { contains: query, mode: "insensitive" } },
              { profile: { displayName: { contains: query, mode: "insensitive" } } },
            ],
          },
          {
            OR: [
              { profileSettings: { is: null } },
              { profileSettings: { privacyTag: "PUBLIC" as any } },
              ...(friendIds.length > 0 ? [{
                AND: [
                  { profileSettings: { privacyTag: "FRIENDS" as any } },
                  { id: { in: friendIds } }
                ]
              }] : [])
            ],
          },
        ],
      },
      select: {
        id: true,
        username: true,
        profile: {
          select: {
            displayName: true,
            avatarUrl: true,
          },
        },
      },
      take: 10,
    });

    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
