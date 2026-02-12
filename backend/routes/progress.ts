import { Router } from 'express';
import { updateProgress, getProgress } from '../controllers/progressController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/update', authMiddleware, updateProgress);
router.get('/:roadmapId', authMiddleware, getProgress);

export default router;
