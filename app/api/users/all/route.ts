import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
  UserResponse,
  ApiErrorResponse,
  PaginatedResponse,
} from '@/types/user';
import { getCurrentUserInfo } from '@/lib/auth-utils';

// Handle CORS preflight requests
async function handleOPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-user-id',
    },
  });
}

async function handleGET(req: NextRequest) {
  try {
    // Check if user has admin privileges (ADMIN, SUPERADMIN, or OWNER)
    const userInfo = await getCurrentUserInfo();
    if (
      !userInfo ||
      (!userInfo.isAdmin && !userInfo.isSuperAdmin && !userInfo.isOwner)
    ) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Admin privileges required' },
        { status: 403 }
      );
    }
    const { searchParams } = new URL(req.url);
    const includeCollege = searchParams.get('includeCollege') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = (page - 1) * limit;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 1000) {
      const errorResponse: ApiErrorResponse = {
        error: 'Invalid pagination parameters',
        message: 'Page must be >= 1, limit must be between 1 and 1000',
        statusCode: 400,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    // Fetch all users to sort properly by role
    const [allUsers, totalCount] = await Promise.all([
      db.user.findMany(),
      db.user.count(),
    ]);

    // Define role order: OWNER > SUPERADMIN > ADMIN > GUEST
    const roleOrder: Record<string, number> = {
      OWNER: 0,
      SUPERADMIN: 1,
      ADMIN: 2,
      GUEST: 3,
    };

    // Sort users by role first, then by createdAt desc
    const sortedUsers = allUsers.sort((a, b) => {
      const roleA = roleOrder[a.role] ?? 999;
      const roleB = roleOrder[b.role] ?? 999;

      if (roleA !== roleB) {
        return roleA - roleB;
      }

      // If roles are the same, sort by createdAt desc
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    // Apply pagination after sorting
    const users = sortedUsers.slice(skip, skip + limit);

    // Convert to response format
    const usersResponse: UserResponse[] = users.map(user => ({
      id: user.id,
      clerkId: user.clerkId || undefined,
      name: user.name || undefined,
      email: user.email,
      role: user.role as any,
      image: user.image || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));

    const response: PaginatedResponse<UserResponse> = {
      data: usersResponse,
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching all users:', error);
    const errorResponse: ApiErrorResponse = {
      error: 'Internal server error',
      message: 'Failed to fetch users',
      statusCode: 500,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export const { OPTIONS, GET } = { OPTIONS: handleOPTIONS, GET: handleGET };
