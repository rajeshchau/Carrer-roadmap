import { Router } from 'express';
import {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  createStep,
  updateStep,
  deleteStep,
} from '../controllers/adminController';
import { authMiddleware, adminMiddleware } from '../middleware/auth';

const router = Router();

// All routes require authentication and admin role
router.use(authMiddleware, adminMiddleware);

// Template management
router.get('/templates', getTemplates);
router.post('/templates', createTemplate);
router.put('/templates/:id', updateTemplate);
router.delete('/templates/:id', deleteTemplate);

// Step management
router.post('/templates/:templateId/steps', createStep);
router.put('/steps/:id', updateStep);
router.delete('/steps/:id', deleteStep);

export default router;
