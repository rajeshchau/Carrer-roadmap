import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';

export async function GET(request: NextRequest) {
  try {
    const auth = readAuthToken(request);
    if (!auth) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const roadmaps = await prisma.userRoadmap.findMany({
      where: { userId: auth.userId },
      include: {
        template: {
          include: {
            steps: {
              include: {
                resources: true,
                progress: { where: { userId: auth.userId } },
              },
              orderBy: { order: 'asc' },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(roadmaps);
  } catch (error) {
    console.error('Get my roadmaps error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
