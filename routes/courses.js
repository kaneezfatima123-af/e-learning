import express from 'express';
import Course from '../models/Course.js';

const router = express.Router();

// GET all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

// POST new course
router.post('/', async (req, res) => {
  const { course_name, course_link } = req.body;

  if (!course_name || !course_link) {
    return res.status(400).json({ message: '⚠ Please fill all fields!' });
  }

  try {
    const course = new Course({ course_name, course_link });
    await course.save();
    res.status(201).json({ message: '✅ Course uploaded successfully!', course });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!' });
  }
});

export default router;
