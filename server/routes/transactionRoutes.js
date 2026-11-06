const express = require('express');
const Transaction = require('../models/Transaction');
const createTransaction = require('../controllers/create');
const updateTransaction = require('../controllers/update');
const deleteTransaction = require('../controllers/delete');
const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/', createTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id',deleteTransaction)

module.exports = router;