const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
const openai = new OpenAIApi(new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/ask', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      maxTokens: 150,
      temperature: 0.5,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/record', (req, res) => {
  const data = req.body;
  // TODO: Save the data in your database
  console.log('Recorded data:', data);
  res.sendStatus(200);
});

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
