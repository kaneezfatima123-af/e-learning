import express from 'express';
import Quiz from '../models/Quiz.js';

const router = express.Router();

// GET all quizzes
router.get('/', async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

// POST new quiz question
router.post('/', async (req, res) => {
  const { question, option_a, option_b, option_c, option_d, correct_answer } = req.body;

  if (!question || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
    return res.status(400).json({ message: '⚠ Please fill all fields!' });
  }

  try {
    const quiz = new Quiz({ question, option_a, option_b, option_c, option_d, correct_answer });
    await quiz.save();
    res.status(201).json({ message: '✅ Quiz uploaded successfully!', quiz });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

export default router;
