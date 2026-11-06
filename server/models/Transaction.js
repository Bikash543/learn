const mongoose = require('mongoose');

function isCalendarDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const transactionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    type: {
      type: String,
      required: true,
      enum: ['income', 'expense'],
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    amountPaisa: {
      type: Number,
      required: true,
      min: 1,
      validate: {
        validator: Number.isSafeInteger,
        message: 'Amount in paisa must be a positive safe integer.',
      },
    },
    date: {
      type: String,
      required: true,
      validate: {
        validator: isCalendarDate,
        message: 'Date must be a valid calendar date in YYYY-MM-DD format.',
      },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Transaction', transactionSchema);
