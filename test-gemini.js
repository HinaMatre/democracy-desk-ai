require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function test() {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'YOUR_GEMINI_API_KEY') {
    console.log("Key is missing or still placeholder.");
    return;
  }
  console.log("Key length:", key.length);
  const ai = new GoogleGenerativeAI(key.trim());
  try {
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent("hello");
    console.log("Success! Response:", result.response.text());
  } catch (err) {
    console.error("Gemini Error:", err.message);
  }
}
test();
