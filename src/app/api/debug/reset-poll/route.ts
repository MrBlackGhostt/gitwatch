import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

// Reset lastPolled for a specific repo to test notifications
export async function POST(request: Request) {
  try {
    const { owner, repo, telegramId } = await request.json();

    if (!owner || !repo || !telegramId) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { telegramId: BigInt(telegramId) },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Reset lastPolled to 1 hour ago
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const updated = await prisma.watchedRepo.updateMany({
      where: {
        userId: user.id,
        owner,
        repo,
      },
      data: {
        lastPolled: oneHourAgo,
      },
    });

    return NextResponse.json({
      success: true,
      updated: updated.count,
      lastPolled: oneHourAgo,
    });
  } catch (error) {
    console.error('Error resetting lastPolled:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
