const express = require('express');
const axios = require('axios');
const router = express.Router();

console.log('Gemini routes loaded!');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent';
const SYSTEM_PROMPT = `You are KalaaSetu Assistant, an expert in the KalaaSetu platform. Only answer questions related to KalaaSetu, Indian classical arts, and the features of this project. If a user asks something outside this scope, politely refuse and redirect them to project-specific topics.`;

router.post('/chat', async (req, res) => {
  console.log('Gemini chat endpoint hit', req.body);
  const { message } = req.body;
  if (!message) {
    console.log('No message provided in request body');
    return res.status(400).json({ success: false, message: 'Message is required.' });
  }
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.log('No Gemini API key found in environment variables');
      return res.status(500).json({ success: false, message: 'Gemini API key not configured.' });
    }
    console.log('Making request to Gemini API...');
    const geminiRes = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: [
          { role: 'model', parts: [{ text: SYSTEM_PROMPT }] },
          { role: 'user', parts: [{ text: message }] }
        ]
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
    const text = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log('Gemini API response received:', text ? 'Success' : 'Empty response');
    res.json({ success: true, response: text || 'Sorry, I could not generate a response.' });
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    if (error.response) {
      console.error('Gemini API error response:', error.response.data);
    }
    res.status(500).json({ success: false, message: 'Error connecting to Gemini API.' });
  }
});

// Add a test route to check if the router is working
router.get('/test', (req, res) => {
  console.log('Gemini test endpoint hit');
  res.json({ success: true, message: 'Gemini router is working!' });
});

module.exports = router;
