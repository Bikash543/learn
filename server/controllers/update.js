const Transaction = require('../models/Transaction');

const allowedFields = ['title', 'type', 'category', 'amountPaisa', 'date'];

async function updateTransaction(req, res) {
  try {
    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => Object.hasOwn(req.body ?? {}, field))
        .map((field) => [field, req.body[field]]),
    );

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'At least one editable field is required.' });
    }

    const updated = await Transaction.findByIdAndUpdate(req.params.id, updates, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    return res.json(updated);
  } catch (error) {
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ error: error.message });
    }

    console.error('Error updating transaction:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = updateTransaction;