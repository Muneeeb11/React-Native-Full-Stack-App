const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

app.post('/add', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a + b });
});

app.post('/subtract', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a - b });
});

app.post('/multiply', (req, res) => {
  const { a, b } = req.body;
  res.json({ result: a * b });
});

app.post('/divide', (req, res) => {
  const { a, b } = req.body;
  if (b === 0) {
    return res.status(400).json({ error: 'Division by zero' });
  }
  res.json({ result: a / b });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
