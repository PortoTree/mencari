import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q || q.trim() === "") {
      return NextResponse.json({ users: [] });
    }

    const query = q.toLowerCase();

    // Find users by username or displayName where privacyTag is PUBLIC
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
              { profileSettings: { privacyTag: "PUBLIC" } },
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
