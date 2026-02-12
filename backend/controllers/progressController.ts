import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { stepId, completed } = req.body;
    const userId = req.userId!;

    // Validate input
    if (!stepId || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'stepId and completed status are required' });
    }

    // Check if progress exists
    const existingProgress = await prisma.progress.findUnique({
      where: {
        userId_stepId: {
          userId,
          stepId,
        },
      },
    });

    let progress;
    if (existingProgress) {
      // Update existing progress
      progress = await prisma.progress.update({
        where: {
          userId_stepId: {
            userId,
            stepId,
          },
        },
        data: {
          completed,
        },
      });
    } else {
      // Create new progress
      progress = await prisma.progress.create({
        data: {
          userId,
          stepId,
          completed,
        },
      });
    }

    res.json({
      message: 'Progress updated successfully',
      progress,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { roadmapId } = req.params;
    const userId = req.userId!;

    // Get roadmap with steps
    const roadmap = await prisma.userRoadmap.findFirst({
      where: {
        id: roadmapId,
        userId,
      },
      include: {
        template: {
          include: {
            steps: true,
          },
        },
      },
    });

    if (!roadmap) {
      return res.status(404).json({ error: 'Roadmap not found' });
    }

    // Get progress for all steps
    const stepIds = roadmap.template.steps.map(step => step.id);
    const progress = await prisma.progress.findMany({
      where: {
        userId,
        stepId: {
          in: stepIds,
        },
      },
    });

    const totalSteps = stepIds.length;
    const completedSteps = progress.filter(p => p.completed).length;
    const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

    res.json({
      totalSteps,
      completedSteps,
      progressPercentage: Math.round(progressPercentage),
      progress,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
