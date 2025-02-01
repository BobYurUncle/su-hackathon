import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;


const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`

const geminiResponse = async (prompt) => {
    console.log(API_KEY)
    try {
        const response = await axios.post(`${URL}?key=${API_KEY}`, {
            contents: [{ parts: [{ text: prompt }] }]
        });

        console.log(response.data.candidates[0]?.content?.parts[0]?.text)

        return response.data.candidates[0]?.content?.parts[0]?.text || 'No response received.';
    }   catch (error) {
        console.error('Gemini API Error:', error);
        return 'Error fetching response.';
    }
};

export {geminiResponse};