import express from 'express';
import mongoose from 'mongoose';
import Profile from '../models/Profile.js';
import User from '../models/User.js';

const router = express.Router();

// Fallback in-memory profile store
const memoryProfiles = new Map();

// Create or Update profile
router.post('/', async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;
    if (!userId) return res.status(400).json({ message: 'userId is required' });

    if (mongoose.connection.readyState === 1) {
      // Find by userId and update, or create if not exists
      const profile = await Profile.findOneAndUpdate(
        { userId }, 
        profileData, 
        { upsert: true, new: true, runValidators: true }
      );

      // Link back to user (if not already linked)
      await User.findByIdAndUpdate(userId, { profileId: profile._id });

      return res.status(201).json(profile);
    }

    // In-memory fallback
    const existing = memoryProfiles.get(userId) || { _id: 'prof_' + Date.now(), userId };
    const updated = { ...existing, ...profileData };
    memoryProfiles.set(userId, updated);
    return res.status(201).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get profile by userId
router.get('/user/:userId', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const profile = await Profile.findOne({ userId: req.params.userId });
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      return res.json(profile);
    }

    const profile = memoryProfiles.get(req.params.userId);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      return res.json(profile);
    }

    for (const [uid, prof] of memoryProfiles.entries()) {
      if (prof._id === req.params.id) {
        const updated = { ...prof, ...req.body };
        memoryProfiles.set(uid, updated);
        return res.json(updated);
      }
    }
    return res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete profile (actually just reset user linking)
router.delete('/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const profile = await Profile.findById(req.params.id);
      if (!profile) return res.status(404).json({ message: 'Profile not found' });

      await User.findByIdAndUpdate(profile.userId, { $unset: { profileId: "" } });
      await Profile.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Profile deleted' });
    }

    for (const [uid, prof] of memoryProfiles.entries()) {
      if (prof._id === req.params.id) {
        memoryProfiles.delete(uid);
        return res.json({ message: 'Profile deleted' });
      }
    }
    return res.status(404).json({ message: 'Profile not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
