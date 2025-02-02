import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");



const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const geminiResponse = async (prompt) => {
    console.log(API_KEY)
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return await result.response.text();
    }   catch (error) {
        console.error('Gemini API Error:', error);
        return 'Error fetching response.';
    }
};

export {geminiResponse};