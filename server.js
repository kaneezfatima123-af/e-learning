import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import quizRoutes from './routes/quiz.js';
import commentRoutes from './routes/comments.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: 'https://fatima-elearning.netlify.app'
}));
app.use(express.json());
app.use(express.static(__dirname));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/comments', commentRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .catch(err => console.error('❌ MongoDB Error:', err));

export default app;