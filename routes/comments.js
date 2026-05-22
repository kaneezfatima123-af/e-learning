import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET comments by email (student)
router.get('/', async (req, res) => {
  const { email } = req.query;
  try {
    const query = email ? { student_email: email } : { status: 'pending' };
    const comments = await Comment.find(query).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

// POST new comment
router.post('/', async (req, res) => {
  const { student_name, student_email, comment } = req.body;

  if (!student_name || !student_email || !comment) {
    return res.status(400).json({ message: '⚠ Please fill all fields!' });
  }

  try {
    const newComment = new Comment({ student_name, student_email, comment });
    await newComment.save();
    res.status(201).json({ message: '✅ Comment submitted successfully!', comment: newComment });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

// POST teacher reply
router.post('/reply/:id', async (req, res) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({ message: '❌ Reply cannot be empty!' });
  }

  try {
    const comment = await Comment.findByIdAndUpdate(
      req.params.id,
      { answer, status: 'answered' },
      { new: true }
    );
    res.json({ message: '✅ Reply submitted successfully!', comment });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

export default router;
