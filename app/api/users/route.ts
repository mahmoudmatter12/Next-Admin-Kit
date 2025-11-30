import { NextResponse } from "next/server";
import { db } from "@/lib/db";

async function handleGET() {
  try {
    const users = await db.user.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// Apply tracking to all methods using crud preset
export const { GET } = { GET: handleGET };
