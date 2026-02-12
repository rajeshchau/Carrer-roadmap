import { Router } from 'express';
import { submitQuiz, getQuizResult } from '../controllers/quizController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.post('/submit', authMiddleware, submitQuiz);
router.get('/result', authMiddleware, getQuizResult);

export default router;
