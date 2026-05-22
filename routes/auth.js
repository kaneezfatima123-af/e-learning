import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// SIGNUP
router.post('/signup', async (req, res) => {
  const { full_name, email, password, role } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: '⚠ Please fill all fields!' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: '❌ Email already registered!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ full_name, email, password: hashedPassword, role });
    await user.save();

    res.status(201).json({ message: '✅ Signup successful!', role, full_name });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!', error: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: '⚠ Please fill all fields!' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: '❌ Invalid email or password!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: '❌ Invalid email or password!' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, full_name: user.full_name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ message: '✅ Login successful!', token, role: user.role, full_name: user.full_name });
  } catch (err) {
    res.status(500).json({ message: '⚠ Server error!', error: err.message });
  }
});

export default router;
