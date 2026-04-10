import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user exists
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already taken.' });

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, userId: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    // Check if user has a profile
    const profile = await Profile.findOne({ _id: user.profileId });

    res.json({ 
      token, 
      userId: user._id, 
      username: user.username,
      hasProfile: !!user.profileId,
      profileId: user.profileId
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
