export default function TransactionEmptyState({
  hasTransactions,
  onClearFilters,
  onAddFirst,
}) {
  if (!hasTransactions) {
    return (
      <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/50 px-5 py-12 text-center">
        <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-primary/10 text-xl text-primary">
          +
        </div>
        <h3 className="text-lg font-semibold">Add your first transaction</h3>
        <p className="mt-1 text-sm text-base-content/60">
          Your income and expenses will appear here.
        </p>
        <button
          className="btn btn-primary btn-sm mt-4"
          type="button"
          onClick={onAddFirst}
        >
          Add transaction
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-dashed border-base-300 bg-base-200/50 px-5 py-12 text-center">
      <h3 className="text-lg font-semibold">No matching transactions</h3>
      <p className="mt-1 text-sm text-base-content/60">
        Try changing your search or filters.
      </p>
      <button
        className="btn btn-primary btn-sm mt-4"
        type="button"
        onClick={onClearFilters}
      >
        Clear filters
      </button>
    </div>
  );
}
