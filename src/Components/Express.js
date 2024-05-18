const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const apiKey = "7dafd038da8b94911539b1223db5a9ce545bd045";
const serperUrl = `https://serper.dev/search`;

app.post('/api/search', async (req, res) => {
  try {
    const response = await axios.post(serperUrl, {
      q: req.body.query,
      api_key: apiKey,
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    res.status(500).send('Error fetching search results');
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
