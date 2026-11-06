import { useEffect, useState } from 'react';
import { CATEGORIES } from '../data/categories.js';
import { amountToPaisa, getLocalDateString } from '../utils/finance.js';

const AMOUNT_ERROR = 'Enter a positive amount with up to 2 decimal places.';

export default function TransactionForm({
  editingTransaction,
  onSave,
  onCancel,
  isSaving,
}) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getLocalDateString());
  const [amountError, setAmountError] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setType(editingTransaction.type);
      setCategory(editingTransaction.category);
      setAmount((editingTransaction.amountPaisa / 100).toFixed(2));
      setDate(editingTransaction.date);
      setAmountError('');
      return;
    }

    setTitle('');
    setType('expense');
    setCategory(CATEGORIES.expense[0]);
    setAmount('');
    setDate(getLocalDateString());
    setAmountError('');
  }, [editingTransaction]);

  function handleTypeChange(nextType) {
    setType(nextType);
    setCategory(CATEGORIES[nextType][0]);
  }

  function handleAmountChange(event) {
    const value = event.target.value;
    setAmount(value);
    setAmountError(value && amountToPaisa(value) === null ? AMOUNT_ERROR : '');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const amountPaisa = amountToPaisa(amount);
    if (amountPaisa === null) {
      setAmountError(AMOUNT_ERROR);
      return;
    }

    const saved = await onSave({
      title: title.trim(),
      type,
      category,
      amountPaisa,
      date,
    });

    if (saved && !editingTransaction) {
      setTitle('');
      setType('expense');
      setCategory(CATEGORIES.expense[0]);
      setAmount('');
      setDate(getLocalDateString());
      setAmountError('');
    }
  }

  return (
    <section className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body p-5 sm:p-6">
        <div className="mb-1">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {editingTransaction ? 'Update entry' : 'New entry'}
          </p>
          <h2 className="mt-1 text-xl font-bold">
            {editingTransaction ? 'Edit transaction' : 'Add a transaction'}
          </h2>
        </div>

        <form className="mt-3 grid gap-4" onSubmit={handleSubmit}>
          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">Title</span>
            <input
              className="input input-bordered w-full"
              type="text"
              placeholder="e.g. Monthly salary"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              maxLength={80}
              required
            />
          </label>

          <fieldset>
            <legend className="mb-2 text-sm font-medium">Type</legend>
            <div className="join w-full">
              <button
                className={`btn join-item flex-1 ${
                  type === 'income' ? 'btn-success' : 'btn-outline'
                }`}
                type="button"
                aria-pressed={type === 'income'}
                onClick={() => handleTypeChange('income')}
              >
                Income
              </button>
              <button
                className={`btn join-item flex-1 ${
                  type === 'expense' ? 'btn-error' : 'btn-outline'
                }`}
                type="button"
                aria-pressed={type === 'expense'}
                onClick={() => handleTypeChange('expense')}
              >
                Expense
              </button>
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="form-control w-full">
              <span className="label-text mb-2 font-medium">Category</span>
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                {CATEGORIES[type].map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-2 font-medium">Amount (NPR)</span>
              <input
                className={`input input-bordered w-full ${
                  amountError ? 'input-error' : ''
                }`}
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                aria-invalid={Boolean(amountError)}
                aria-describedby={amountError ? 'amount-error' : undefined}
                required
              />
              {amountError && (
                <span className="mt-1 text-xs text-error" id="amount-error">
                  {amountError}
                </span>
              )}
            </label>
          </div>

          <label className="form-control w-full">
            <span className="label-text mb-2 font-medium">Date</span>
            <input
              className="input input-bordered w-full"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <div className="mt-1 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            {editingTransaction && (
              <button className="btn btn-ghost" type="button" onClick={onCancel}>
                Cancel
              </button>
            )}
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
              {isSaving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : editingTransaction ? (
                'Save changes'
              ) : (
                'Add transaction'
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
