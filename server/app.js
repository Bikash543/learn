require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const port = process.env.PORT || 5000;
const databaseStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];

app.use(express.json());
app.use('/api/transactions', transactionRoutes);

app.get('/api/health/live', (_request, response) => {
  response.json({ status: 'ok' });
});

function sendReadiness(_request, response) {
  const database = databaseStates[mongoose.connection.readyState] ?? 'unknown';
  const isReady = database === 'connected';

  response.status(isReady ? 200 : 503).json({
    status: isReady ? 'ready' : 'not_ready',
    database,
  });
}

app.get('/api/health/ready', sendReadiness);
app.get('/api/health', sendReadiness);

async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI is not set. Add it to server/.env.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
  }
}

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  connectToDatabase();
});