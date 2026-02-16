import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
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
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error, issue: mapped.issue }, { status: mapped.status });
  }
}
