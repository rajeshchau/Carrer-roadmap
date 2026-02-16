import { NextRequest, NextResponse } from 'next/server';
import { getPrisma } from '@/lib/server/prisma';
import { readAuthToken } from '@/lib/server/auth';
import { toApiError } from '@/lib/server/errors';

export async function POST(request: NextRequest) {
  try {
    const prisma = getPrisma();
    const auth = readAuthToken(request);
    if (!auth) return NextResponse.json({ error: 'No token provided' }, { status: 401 });

    const quizResult = await prisma.quizResult.findUnique({ where: { userId: auth.userId } });
    if (!quizResult) {
      return NextResponse.json({ error: 'Please complete the onboarding quiz first' }, { status: 400 });
    }

    const template = await prisma.roadmapTemplate.findFirst({
      where: {
        domain: quizResult.domain,
        skillLevel: quizResult.skillLevel,
        timeline: quizResult.timeline,
      },
      include: {
        steps: { include: { resources: true }, orderBy: { order: 'asc' } },
      },
    });

    if (!template) {
      return NextResponse.json({ error: 'No matching roadmap found for your profile' }, { status: 404 });
    }

    const existingRoadmap = await prisma.userRoadmap.findFirst({
      where: { userId: auth.userId, templateId: template.id },
    });

    if (existingRoadmap) {
      return NextResponse.json({ error: 'You already have this roadmap' }, { status: 400 });
    }

    const userRoadmap = await prisma.userRoadmap.create({
      data: { userId: auth.userId, templateId: template.id },
    });

    return NextResponse.json({
      message: 'Roadmap generated successfully',
      roadmap: { ...userRoadmap, template },
    }, { status: 201 });
  } catch (error) {
    console.error('Generate roadmap error', error);
    const mapped = toApiError(error);
    return NextResponse.json({ error: mapped.error, issue: mapped.issue }, { status: mapped.status });
  }
}
