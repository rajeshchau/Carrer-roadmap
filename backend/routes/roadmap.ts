import { Router } from 'express';
import { generateRoadmap, getUserRoadmaps, getRoadmapDetails } from '../controllers/roadmapController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/generate', authMiddleware, generateRoadmap);
router.get('/my-roadmaps', authMiddleware, getUserRoadmaps);
router.get('/:id', authMiddleware, getRoadmapDetails);

export default router;
