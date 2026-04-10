import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.js';
import chatRoutes from './routes/chat.js';
import authRoutes from './routes/auth.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Custom Routes
app.use('/api/profile', profileRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/auth', authRoutes);

// Base route for testing
app.get('/', (req, res) => {
  res.send('KisanSathi API is running! 🌾');
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kisansathi';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error.message));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
