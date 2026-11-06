export default function TransactionActions({ transaction, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-1">
      <button
        className="btn btn-ghost btn-sm"
        type="button"
        onClick={() => onEdit(transaction)}
        aria-label={`Edit ${transaction.title}`}
      >
        Edit
      </button>
      <button
        className="btn btn-ghost btn-sm text-error"
        type="button"
        onClick={() => onDelete(transaction)}
        aria-label={`Delete ${transaction.title}`}
      >
        Delete
      </button>
    </div>
  );
}
