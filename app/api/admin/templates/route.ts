import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';

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

export async function GET(request: NextRequest) {
  try {
    const { error } = ensureAdmin(request);
    if (error) return error;

    const prisma = getPrisma();

    const templates = await prisma.roadmapTemplate.findMany({
      include: {
        steps: {
          include: { resources: true },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(templates);
  } catch (error) {
    console.error('Get templates error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const { error } = ensureAdmin(request);
    if (error) return error;

    const { title, description, domain, skillLevel, timeline } = await request.json();

    if (!title || !description || !domain || !skillLevel || !timeline) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const template = await prisma.roadmapTemplate.create({
      data: { title, description, domain, skillLevel, timeline },
    });

    return NextResponse.json({ message: 'Template created successfully', template }, { status: 201 });
  } catch (error) {
    console.error('Create template error', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
