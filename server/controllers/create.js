const Transaction = require('../models/Transaction');

async function createTransaction(req, res) {
  try {
    const { title, type, category, amountPaisa, date } = req.body ?? {};
    const transaction = await Transaction.create({
      title,
      type,
      category,
      amountPaisa,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ error: error.message });
    }

    console.error('Error creating transaction:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = createTransaction;
