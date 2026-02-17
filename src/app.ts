import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import authRoutes from './routes/authRoutes';
import { globalErrorHandler } from './middleware/errorMiddleware';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling
app.use(globalErrorHandler);

export default app;
