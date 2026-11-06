import { useNavigate, useOutletContext } from 'react-router-dom';
import DeleteConfirmation from '../components/DeleteConfirmation.jsx';
import TransactionHistory from '../components/TransactionHistory.jsx';

export default function TransactionsPage() {
  const navigate = useNavigate();
  const {
    transactions,
    onEdit,
    onDelete,
    pendingDelete,
    confirmDelete,
    isDeleting,
    cancelDelete,
  } = useOutletContext();

  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-primary">All your activity</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          Transactions
        </h1>
        <p className="mt-2 text-sm text-base-content/60">
          Search, filter, edit, or remove your entries.
        </p>
      </div>
      <TransactionHistory
        transactions={transactions}
        onEdit={onEdit}
        onDelete={onDelete}
        onAddFirst={() => navigate('/')}
      />
      <DeleteConfirmation
        transaction={pendingDelete}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </>
  );
}
