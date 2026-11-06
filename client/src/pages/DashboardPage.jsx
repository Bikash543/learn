import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DeleteConfirmation from '../components/DeleteConfirmation.jsx';
import SummaryCards from '../components/SummaryCards.jsx';
import TransactionForm from '../components/TransactionForm.jsx';
import TransactionHistory from '../components/TransactionHistory.jsx';

export default function DashboardPage() {
  const {
    transactions,
    totals,
    editingTransaction,
    saveTransaction,
    isSaving,
    cancelEditing,
    onEdit,
    onDelete,
    pendingDelete,
    confirmDelete,
    isDeleting,
    cancelDelete,
  } = useOutletContext();

  useEffect(() => {
    if (editingTransaction) {
      document.getElementById('transaction-form')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [editingTransaction]);

  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-primary">Your money, at a glance</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Finance overview
        </h1>
        <p className="mt-2 text-sm text-base-content/60">
          Track what comes in and what goes out.
        </p>
      </div>

      <SummaryCards totals={totals} />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.8fr)]">
        <div id="transaction-form">
          <TransactionForm
            editingTransaction={editingTransaction}
            onSave={saveTransaction}
            onCancel={cancelEditing}
            isSaving={isSaving}
          />
        </div>
        <TransactionHistory
          transactions={transactions}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddFirst={() =>
            document.getElementById('transaction-form')?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            })
          }
        />
      </div>

      <DeleteConfirmation
        transaction={pendingDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
