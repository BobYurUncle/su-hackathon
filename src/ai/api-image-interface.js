import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const formatPrompt = (object) => {
    return `"${object}" - In which garbage color should this be disposed of?`;
};

const geminiImageResponse = async (file) => {
    console.log("API Key:", API_KEY);


    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const base64Data = file.replace(/^data:image\/[a-z]+;base64,/, '');

        function fileToGenerativePart(path, mimeType) {
            return {
              inlineData: {
                data: base64Data,
                mimeType,
              },
            };
          }
          
        const prompt = "In which garbage color should this be disposed of?";
        const imagePart = fileToGenerativePart("/path/to/image.png", "image/png");

        const result = await model.generateContent([prompt, imagePart]);
        console.log(result.response.text())

    } catch (error) {
        console.error('Gemini API Error:', error);
        return 'Error fetching response.';
    }
};

export { geminiImageResponse };