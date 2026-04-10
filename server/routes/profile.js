import express from 'express';
import Profile from '../models/Profile.js';

import User from '../models/User.js';

const router = express.Router();

// Create profile
router.post('/', async (req, res) => {
  try {
    const { userId, ...profileData } = req.body;
    const profile = new Profile({ ...profileData, userId });
    const savedProfile = await profile.save();

    // Link back to user
    await User.findByIdAndUpdate(userId, { profileId: savedProfile._id });

    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get profile by userId
router.get('/user/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete profile (actually just reset user linking)
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    await User.findByIdAndUpdate(profile.userId, { $unset: { profileId: "" } });
    await Profile.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
