import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const generateRoadmap = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    // Get user's quiz result
    const quizResult = await prisma.quizResult.findUnique({
      where: { userId },
    });

    if (!quizResult) {
      return res.status(400).json({ error: 'Please complete the onboarding quiz first' });
    }

    // Find matching roadmap template based on quiz results
    const template = await prisma.roadmapTemplate.findFirst({
      where: {
        domain: quizResult.domain,
        skillLevel: quizResult.skillLevel,
        timeline: quizResult.timeline,
      },
      include: {
        steps: {
          include: {
            resources: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!template) {
      return res.status(404).json({ error: 'No matching roadmap found for your profile' });
    }

    // Check if user already has this roadmap
    const existingRoadmap = await prisma.userRoadmap.findFirst({
      where: {
        userId,
        templateId: template.id,
      },
    });

    if (existingRoadmap) {
      return res.status(400).json({ error: 'You already have this roadmap' });
    }

    // Create user roadmap
    const userRoadmap = await prisma.userRoadmap.create({
      data: {
        userId,
        templateId: template.id,
      },
    });

    res.status(201).json({
      message: 'Roadmap generated successfully',
      roadmap: {
        ...userRoadmap,
        template,
      },
    });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserRoadmaps = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const roadmaps = await prisma.userRoadmap.findMany({
      where: { userId },
      include: {
        template: {
          include: {
            steps: {
              include: {
                resources: true,
                progress: {
                  where: { userId },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(roadmaps);
  } catch (error) {
    console.error('Get user roadmaps error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getRoadmapDetails = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const roadmap = await prisma.userRoadmap.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        template: {
          include: {
            steps: {
              include: {
                resources: true,
                progress: {
                  where: { userId },
                },
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    res.json(roadmap);
  } catch (error) {
    console.error('Get roadmap details error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
