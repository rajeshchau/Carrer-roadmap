import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', protect, AuthController.getProfile);

export default router;
