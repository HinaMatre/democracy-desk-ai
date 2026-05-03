const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');

// Note: Ensure dotenv is configured in your main entry file (e.g., index.js)
// Initialize Gemini API client
const ai = new GoogleGenerativeAI((process.env.GEMINI_API_KEY || '').trim());

// Load mock election data
const electionDataPath = path.join(__dirname, '../data/election_mock_data.json');
const electionData = JSON.parse(fs.readFileSync(electionDataPath, 'utf-8'));

/**
 * Handles the user's query with context awareness.
 *
 * @param {string} query - The user's question or message.
 * @param {Object} userContext - Context about the user.
 * @param {boolean} userContext.isUnder18 - Whether the user is under 18.
 * @param {boolean} userContext.isExperienced - Whether the user is an experienced voter.
 * @returns {Promise<string>} The assistant's response.
 */
async function handleUserQuery(query, userContext = {}) {
  // Check if the user is asking about election dates
  const lowerQuery = query.toLowerCase();
  // Simple intent matching for election dates
  if (lowerQuery.includes('when is the election') || lowerQuery.includes('election date') || lowerQuery.includes('key dates') || lowerQuery.includes('remind me of the date')) {
    let response = `The ${electionData.election} (${electionData.year}) key dates are:\n` +
           `- Registration Deadline: ${electionData.dates.registrationDeadline}\n` +
           `- Polling Day: ${electionData.dates.polling}\n` +
           `- Results Day: ${electionData.dates.results}`;
    if (lowerQuery.includes('remind me')) {
      response += `\n\nTip: You can use the "Remind Me" button in the app to quickly add the Polling Day to your Google Calendar!`;
    }
    return response;
  }

  if (lowerQuery.includes('where do i vote') || lowerQuery.includes('polling station') || lowerQuery.includes('booth')) {
    return "You can find your exact polling station using the 'Booth Locator' section in this app. It uses Google Maps to help you find the location quickly!";
  }

  // Construct system instructions based on user context
  let systemInstruction = `You are a helpful and educational Election Process Assistant. `;

  // Pivot for users under 18
  if (userContext.isUnder18) {
    systemInstruction += `The user is under 18. Even if they ask how to vote, politely pivot the conversation to focus on "How to Pre-register" (if applicable) and general "Civic Education". `;
  }

  // Tailor tone based on experience level
  if (userContext.isExperienced) {
    systemInstruction += `The user is an experienced voter. Use professional, data-driven language, be concise, and provide advanced insights when possible. `;
  } else {
    systemInstruction += `The user is a newcomer to voting or civic engagement. Use highly encouraging, welcoming, and easy-to-understand language. Demystify the process and avoid heavy jargon. `;
  }

  try {
    const model = ai.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction,
    });

    const result = await model.generateContent(query);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response from Gemini API:", error);
    return "I'm currently in demo mode. Try asking about registration or polling locations!";
  }
}

module.exports = {
  handleUserQuery
};
