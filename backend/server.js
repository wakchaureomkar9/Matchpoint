require('dotenv').config();
const express = require('express');
const cors = require('cors');
const matchRoutes = require('./src/routes/matchRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', matchRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'Matchpoint server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});