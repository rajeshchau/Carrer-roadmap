import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const submitQuiz = async (req: AuthRequest, res: Response) => {
  try {
    const { skillLevel, goal, timeline, domain } = req.body;
    const userId = req.userId!;

    // Validate input
    if (!skillLevel || !goal || !timeline || !domain) {
      return res.status(400).json({ error: 'All quiz fields are required' });
    }

    // Delete existing quiz result if any
    await prisma.quizResult.deleteMany({ where: { userId } });

    // Create new quiz result
    const quizResult = await prisma.quizResult.create({
      data: {
        userId,
        skillLevel,
        goal,
        timeline,
        domain,
      },
    });

    res.status(201).json({
      message: 'Quiz submitted successfully',
      quizResult,
    });
  } catch (error) {
    console.error('Submit quiz error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getQuizResult = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const quizResult = await prisma.quizResult.findUnique({
      where: { userId },
    });

    if (!quizResult) {
      return res.status(404).json({ error: 'Quiz result not found' });
    }

    res.json(quizResult);
  } catch (error) {
    console.error('Get quiz result error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
