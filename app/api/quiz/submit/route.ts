import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const auth = readAuthToken(request);
    if (!auth) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const { skillLevel, goal, timeline, domain } = await request.json();

    if (!skillLevel || !goal || !timeline || !domain) {
      return NextResponse.json({ error: 'All quiz fields are required' }, { status: 400 });
    }

    await prisma.quizResult.deleteMany({ where: { userId: auth.userId } });

    const quizResult = await prisma.quizResult.create({
      data: { userId: auth.userId, skillLevel, goal, timeline, domain },
    });

    return NextResponse.json({ message: 'Quiz submitted successfully', quizResult }, { status: 201 });
  } catch (error) {
    console.error('Submit quiz error', error);
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error, issue: mapped.issue }, { status: mapped.status });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
