import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export interface CurrentUserInfo {
  id: string;
  role: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isOwner: boolean;
}

/**
 * Get current authenticated user's role and university information
 * Returns null if user is not authenticated or not found
 */
export async function getCurrentUserInfo(): Promise<CurrentUserInfo | null> {
  try {
    // Get auth result - this should work in API routes when middleware has initialized auth
    const authResult = await auth();
    const userId = authResult?.userId;

    if (!userId) {
      // Log in production to help debug
      if (process.env.NODE_ENV === "production") {
        console.log("[getCurrentUserInfo] No userId found in auth result");
      }
      return null;
    }

    const user = await db.user.findUnique({
      where: { clerkId: userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      // Log in production to help debug
      if (process.env.NODE_ENV === "production") {
        console.log(
          `[getCurrentUserInfo] User not found in database for clerkId: ${userId}`,
        );
      }
      return null;
    }

    const role = user.role;
    // Calculate permissions based on effective role (for viewing)
    const isAdmin = role === "ADMIN";
    const isSuperAdmin = role === "SUPERADMIN";
    const isOwner = role === "OWNER"; // Always check actual role for ownership

    // Only ADMIN role should be filtered by university
    // SUPERADMIN and OWNER can see all students

    return {
      id: user.id,
      role,
      isAdmin,
      isSuperAdmin,
      isOwner,
    };
  } catch (error) {
    // Enhanced error logging for production debugging
    console.error("Error getting current user info:", error);
    if (error instanceof Error) {
      console.error("Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    return null;
  }
}
