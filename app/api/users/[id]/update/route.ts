import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getCurrentUserInfo } from '@/lib/auth-utils';

async function handlePATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check if user is OWNER
    const userInfo = await getCurrentUserInfo();
    if (!userInfo || !userInfo.isOwner) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Owner privileges required' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { email, name, role, image } = body;

    // Only allow updating these fields (exclude IDs: id, clerkId)
    const updateData: any = {};
    if (email !== undefined) updateData.email = email;
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (image !== undefined) updateData.image = image;

    const user = await db.user.update({
      where: { id: id },
      data: updateData,
    });

    // Return in UserResponse format
    const userResponse = {
      id: user.id,
      clerkId: user.clerkId || undefined,
      name: user.name || undefined,
      email: user.email,
      role: user.role as any,
      image: user.image || undefined,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    return NextResponse.json(userResponse);
  } catch (error) {
    console.error('Error updating user:', error);
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

export const { PATCH } = { PATCH: handlePATCH };
