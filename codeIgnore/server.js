// Import required modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 400;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY";

// Middleware
app.use(cors());
app.use(express.json());

// AI Chatbot Endpoint
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Send request to Gemini API
        const response = await axios.post(
            GEMINI_API_URL,
            {
                messages: [
                    { role: 'system', content: 'You are a kind and empathetic mental health assistant.' },
                    { role: 'user', content: message }
                ],
                max_tokens: 150,
                temperature: 0.7
            },
            {
                headers: {
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const botMessage = response.data.choices[0]?.message?.text || 'Sorry, I am unable to process that right now.';
        res.json({ reply: botMessage });
    } catch (error) {
        console.error('Error communicating with Gemini API:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);   
});
