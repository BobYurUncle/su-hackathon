import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const formatPrompt = (object) => {
    return `"${object}" - In which garbage color should this be disposed of? Requirements: Your response MUST be less than 225 characters and MORE than 114 characters.`;
};

const geminiResponse = async (object) => {
    console.log("API Key:", API_KEY);

    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Ensure the prompt always follows the correct question format
        const formattedPrompt = formatPrompt(object);
        console.log("Formatted Prompt:", formattedPrompt);

        const result = await model.generateContent(formattedPrompt);
        
        // Extract response properly
        const responseText = await result.response.text();
        console.log("Gemini API Response:", responseText);

        return responseText;
    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'Error fetching response.';
    }
};

export { geminiResponse };