const Transaction = require('../models/Transaction');

async function deleteTransaction(req, res) {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }
    return res.json({ message: 'Transaction deleted successfully.' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid transaction ID.' });
    }

    console.error('Error deleting transaction:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = deleteTransaction;