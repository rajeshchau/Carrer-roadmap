import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const auth = readAuthToken(request);
    if (!auth) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const { stepId, completed } = await request.json();

    if (!stepId || typeof completed !== 'boolean') {
      return NextResponse.json({ error: 'stepId and completed status are required' }, { status: 400 });
    }

    const progress = await prisma.progress.upsert({
      where: { userId_stepId: { userId: auth.userId, stepId } },
      update: { completed },
      create: { userId: auth.userId, stepId, completed },
    });

    return NextResponse.json({ message: 'Progress updated successfully', progress });
  } catch (error) {
    console.error('Update progress error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
