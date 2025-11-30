import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUserInfo } from '@/lib/auth-utils';

/**
 * Get current authenticated user's role information
 */
export async function GET(req: NextRequest) {
  try {
    const userInfo = await getCurrentUserInfo();

    if (!userInfo) {
      return NextResponse.json(
        { error: 'User not found or not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      role: userInfo.role,
      isAdmin: userInfo.isAdmin,
      isSuperAdmin: userInfo.isSuperAdmin,
      isOwner: userInfo.isOwner,
    });
  } catch (error) {
    console.error('Error fetching current user info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user information' },
      { status: 500 }
    );
  }
}
