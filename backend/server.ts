import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import quizRoutes from './routes/quiz';
import roadmapRoutes from './routes/roadmap';
import progressRoutes from './routes/progress';
import adminRoutes from './routes/admin';

const app = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/roadmap', roadmapRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Career Roadmap API is running' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

export default app;
