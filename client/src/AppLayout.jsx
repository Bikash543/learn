import { useMemo, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppHeader from './components/AppHeader.jsx';
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
} from './features/transactions/transactionApi.js';

function getRequestErrorMessage(error) {
  return (
    error?.data?.error ??
    error?.error ??
    'The request could not be completed. Please try again.'
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const {
    data: transactions = [],
    isLoading,
    isError,
    error: queryError,
    refetch,
  } = useGetTransactionsQuery();
  const [createTransaction, { isLoading: isCreating }] =
    useCreateTransactionMutation();
  const [updateTransaction, { isLoading: isUpdating }] =
    useUpdateTransactionMutation();
  const [deleteTransaction, { isLoading: isDeleting }] =
    useDeleteTransactionMutation();
  const [editingId, setEditingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [requestError, setRequestError] = useState('');
  const isSaving = isCreating || isUpdating;

  const totals = useMemo(
    () =>
      transactions.reduce(
        (result, transaction) => {
          result[transaction.type] += transaction.amountPaisa;
          return result;
        },
        { income: 0, expense: 0 },
      ),
    [transactions],
  );

  const editingTransaction =
    transactions.find((transaction) => transaction.id === editingId) ?? null;

  async function saveTransaction(transactionData) {
    setRequestError('');
    try {
      if (editingId) {
        await updateTransaction({ id: editingId, ...transactionData }).unwrap();
        setEditingId(null);
        return true;
      }

      await createTransaction(transactionData).unwrap();
      return true;
    } catch (error) {
      setRequestError(getRequestErrorMessage(error));
      return false;
    }
  }

  function startEditing(transaction) {
    setEditingId(transaction.id);
    navigate('/');
  }

  async function confirmDelete() {
    if (!pendingDelete) return;

    setRequestError('');
    try {
      await deleteTransaction(pendingDelete.id).unwrap();
      if (editingId === pendingDelete.id) setEditingId(null);
      setPendingDelete(null);
    } catch (error) {
      setRequestError(getRequestErrorMessage(error));
    }
  }

  return (
    <main className="min-h-screen bg-base-200/70 text-base-content">
      <AppHeader />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {isLoading ? (
          <div className="flex min-h-60 items-center justify-center gap-3" role="status">
            <span className="loading loading-spinner loading-md text-primary" />
            <span>Loading transactions…</span>
          </div>
        ) : isError ? (
          <section className="alert alert-error flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold">Could not load transactions</h1>
              <p className="text-sm">{getRequestErrorMessage(queryError)}</p>
            </div>
            <button className="btn btn-sm" type="button" onClick={refetch}>
              Try again
            </button>
          </section>
        ) : (
          <>
            {requestError && (
              <div className="alert alert-error mb-5" role="alert">
                <span>{requestError}</span>
                <button
                  className="btn btn-ghost btn-sm"
                  type="button"
                  onClick={() => setRequestError('')}
                  aria-label="Dismiss error"
                >
                  Dismiss
                </button>
              </div>
            )}
            <Outlet
              context={{
                transactions,
                totals,
                editingTransaction,
                saveTransaction,
                isSaving,
                cancelEditing: () => setEditingId(null),
                onEdit: startEditing,
                onDelete: setPendingDelete,
                pendingDelete,
                confirmDelete,
                isDeleting,
                cancelDelete: () => setPendingDelete(null),
              }}
            />
          </>
        )}
      </div>
    </main>
  );
}
