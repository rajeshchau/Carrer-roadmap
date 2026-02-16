import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

export async function GET(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const auth = readAuthToken(request);
    if (!auth) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const quizResult = await prisma.quizResult.findUnique({ where: { userId: auth.userId } });

    if (!quizResult) return NextResponse.json({ error: 'Quiz result not found' }, { status: 404 });

    return NextResponse.json(quizResult);
  } catch (error) {
    console.error('Get quiz result error', error);
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error, issue: mapped.issue }, { status: mapped.status });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
