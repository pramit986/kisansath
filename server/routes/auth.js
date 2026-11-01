import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Profile from '../models/Profile.js';

const router = express.Router();

// In-memory store fallback when MongoDB is offline
const memoryUsers = new Map();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (mongoose.connection.readyState === 1) {
      // Check if user exists
      const existing = await User.findOne({ username });
      if (existing) return res.status(400).json({ message: 'Username already taken.' });

      const user = new User({ username, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'kisansathi_secret', { expiresIn: '7d' });
      return res.status(201).json({ token, userId: user._id, username: user.username });
    }

    // In-memory fallback
    if (memoryUsers.has(username)) {
      return res.status(400).json({ message: 'Username already taken.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = 'mem_' + Date.now();
    const user = { _id: userId, username, password: hashedPassword, profileId: null };
    memoryUsers.set(username, user);

    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'kisansathi_secret', { expiresIn: '7d' });
    return res.status(201).json({ token, userId, username: user.username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'User not found.' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'kisansathi_secret', { expiresIn: '7d' });
      
      const profile = await Profile.findOne({ _id: user.profileId });

      return res.json({ 
        token, 
        userId: user._id, 
        username: user.username,
        hasProfile: !!user.profileId,
        profileId: user.profileId
      });
    }

    // In-memory fallback
    const user = memoryUsers.get(username);
    if (!user) return res.status(400).json({ message: 'User not found.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'kisansathi_secret', { expiresIn: '7d' });
    return res.json({ 
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
