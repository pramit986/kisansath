import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req, res) => {
  const { messages } = req.body;
  const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

  if (!SARVAM_API_KEY) {
    return res.status(500).json({ message: 'Sarvam API Key is not configured on the server.' });
  }

  try {
    // Sarvam might not support 'system' role. Let's merge it into the first user message.
    let processedMessages = [...messages];
    if (processedMessages.length > 0 && processedMessages[0].role === 'system') {
      const systemMessage = processedMessages.shift();
      if (processedMessages.length > 0 && processedMessages[0].role === 'user') {
        processedMessages[0].content = `${systemMessage.content}\n\nFarmer's Query: ${processedMessages[0].content}`;
      } else {
        processedMessages.unshift({ role: 'user', content: systemMessage.content });
      }
    }

    const response = await axios.post('https://api.sarvam.ai/v1/chat/completions', {
      messages: processedMessages,
      model: 'sarvam-105b', 
      temperature: 0.7,
    }, {
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json',
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Sarvam API Error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ 
      message: 'Error communicating with Sarvam AI',
      details: error.response?.data || error.message 
    });
  }
});

export default router;
