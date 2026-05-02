require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const { handleUserQuery } = require('./src/assistant_logic');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));
app.use(express.json());

/**
 * GET /api/config
 * Provides configuration variables to the frontend.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
app.get('/api/config', (req, res) => {
  res.json({
    // We send the maps API key to the frontend. Note: In production, restrict this key via Google Cloud Console
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || 'YOUR_MAPS_API_KEY'
  });
});

/**
 * GET /api/election-data
 * Reads and returns the mock election data JSON file.
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
app.get('/api/election-data', (req, res) => {
  const electionDataPath = path.join(__dirname, 'data/election_mock_data.json');
  try {
    const electionData = JSON.parse(fs.readFileSync(electionDataPath, 'utf-8'));
    res.json(electionData);
  } catch (error) {
    res.status(500).json({ error: "Failed to read election data" });
  }
});

/**
 * POST /api/chat
 * Handles incoming chat queries from the frontend and communicates with the Gemini API.
 * @param {express.Request} req - The Express request object containing query and userContext.
 * @param {express.Response} res - The Express response object.
 */
app.post('/api/chat', async (req, res) => {
  const { query, userContext } = req.body;
  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }
  const reply = await handleUserQuery(query, userContext);
  res.json({ reply });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
