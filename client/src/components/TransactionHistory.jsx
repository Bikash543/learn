import { useMemo, useState } from 'react';
import TransactionEmptyState from './TransactionEmptyState.jsx';
import TransactionFilters from './TransactionFilters.jsx';
import TransactionTable from './TransactionTable.jsx';

const INITIAL_FILTERS = {
  search: '',
  type: '',
  category: '',
  month: '',
};

export default function TransactionHistory({
  transactions,
  onEdit,
  onDelete,
  onAddFirst,
}) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const matchingTransactions = useMemo(() => {
    const search = filters.search.trim().toLocaleLowerCase();
    return [...transactions]
      .filter((transaction) => {
        const matchesSearch = transaction.title.toLocaleLowerCase().includes(search);
        const matchesType = !filters.type || transaction.type === filters.type;
        const matchesCategory =
          !filters.category || transaction.category === filters.category;
        const matchesMonth =
          !filters.month || transaction.date.startsWith(filters.month);
        return matchesSearch && matchesType && matchesCategory && matchesMonth;
      })
      .sort((first, second) => second.date.localeCompare(first.date));
  }, [transactions, filters]);

  const hasFilters = Object.values(filters).some(Boolean);
  const countText = hasFilters
    ? `Showing ${matchingTransactions.length} of ${transactions.length} transactions`
    : `${transactions.length} ${transactions.length === 1 ? 'transaction' : 'transactions'}`;

  function updateFilter(name, value) {
    setFilters((current) => ({ ...current, [name]: value }));
  }

  function clearFilters() {
    setFilters(INITIAL_FILTERS);
  }

  return (
    <section className="card min-w-0 border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-5 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Your activity
            </p>
            <h2 className="mt-1 text-xl font-bold">Transaction history</h2>
          </div>
          <p className="text-sm text-base-content/60" aria-live="polite">
            {countText}
          </p>
        </div>

        <TransactionFilters
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
        />

        {transactions.length === 0 || matchingTransactions.length === 0 ? (
          <TransactionEmptyState
            hasTransactions={transactions.length > 0}
            onClearFilters={clearFilters}
            onAddFirst={onAddFirst}
          />
        ) : (
          <TransactionTable
            transactions={matchingTransactions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </section>
  );
}
