export default function DeleteConfirmation({
  transaction,
  onCancel,
  onConfirm,
  isDeleting = false,
}) {
  if (!transaction) return null;

  return (
    <dialog className="modal modal-open" aria-labelledby="delete-title">
      <div className="modal-box">
        <h2 className="text-lg font-bold" id="delete-title">
          Delete transaction?
        </h2>
        <p className="py-4 text-sm text-base-content/70">
          Are you sure you want to delete “{transaction.title}”? This action cannot be undone.
        </p>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Keep transaction
          </button>
          <button
            className="btn btn-error"
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="loading loading-spinner loading-sm" />
            ) : (
              'Delete transaction'
            )}
          </button>
        </div>
      </div>
      <button
        className="modal-backdrop"
        type="button"
        aria-label="Close confirmation dialog"
        onClick={onCancel}
      >
        close
      </button>
    </dialog>
  );
}
