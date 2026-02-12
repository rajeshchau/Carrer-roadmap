import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export const getTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await prisma.roadmapTemplate.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(templates);
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const { title, description, domain, skillLevel, timeline } = req.body;

    // Validate input
    if (!title || !description || !domain || !skillLevel || !timeline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const template = await prisma.roadmapTemplate.create({
      data: {
        title,
        description,
        domain,
        skillLevel,
        timeline,
      },
    });

    res.status(201).json({
      message: 'Template created successfully',
      template,
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, domain, skillLevel, timeline } = req.body;

    const template = await prisma.roadmapTemplate.update({
      where: { id: id as string },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(domain && { domain }),
        ...(skillLevel && { skillLevel }),
        ...(timeline && { timeline }),
      },
    });

    res.json({
      message: 'Template updated successfully',
      template,
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.roadmapTemplate.delete({
      where: { id: id as string },
    });

    res.json({ message: 'Template deleted successfully' });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStep = async (req: Request, res: Response) => {
  try {
    const { templateId } = req.params;
    const { order, title, description, duration, resources } = req.body;

    // Validate input
    if (!order || !title || !description || !duration) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const step = await prisma.roadmapStep.create({
      data: {
        templateId,
        order,
        title,
        description,
        duration,
        ...(resources && {
          resources: {
            create: resources,
          },
        }),
      },
      include: {
        resources: true,
      },
    });

    res.status(201).json({
      message: 'Step created successfully',
      step,
    });
  } catch (error) {
    console.error('Create step error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { order, title, description, duration } = req.body;

    const step = await prisma.roadmapStep.update({
      where: { id: id as string },
      data: {
        ...(order && { order }),
        ...(title && { title }),
        ...(description && { description }),
        ...(duration && { duration }),
      },
    });

    res.json({
      message: 'Step updated successfully',
      step,
    });
  } catch (error) {
    console.error('Update step error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.roadmapStep.delete({
      where: { id: id as string },
    });

    res.json({ message: 'Step deleted successfully' });
  } catch (error) {
    console.error('Delete step error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
