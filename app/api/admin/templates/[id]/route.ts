import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

function ensureAdmin(request: NextRequest) {
  const auth = readAuthToken(request);
  if (!auth) {
    return { error: NextResponse.json({ error: 'No token provided' }, { status: 401 }) };
  }
  if (auth.role !== 'ADMIN') {
    return { error: NextResponse.json({ error: 'Admin access required' }, { status: 403 }) };
  }
  return { auth };
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const prisma = getPrisma();
    const { error } = ensureAdmin(request);
    if (error) return error;

    const { id } = await params;
    await prisma.roadmapTemplate.delete({ where: { id } });

    return NextResponse.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error', error);
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error, issue: mapped.issue }, { status: mapped.status });
  }
}
