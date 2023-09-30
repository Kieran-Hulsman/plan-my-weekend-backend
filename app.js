const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Use a specified port or 3000 by default

app.use(cors());

// Import your callAPI function
const { callAPI } = require('./call-api');

// Middleware to parse JSON data
app.use(express.json());

// Define a route to call the API
app.get('/api/call', async (req, res) => {
  const city = req.query.city || 'Toronto'; // Get the city from query params or use a default value
  try {
    const result = await callAPI(city);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
