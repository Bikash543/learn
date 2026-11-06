import { ALL_CATEGORIES } from '../data/categories.js';

export default function TransactionFilters({
  filters,
  onFilterChange,
  onClearFilters,
}) {
  const hasFilters = Boolean(
    filters.search || filters.type || filters.category || filters.month,
  );

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <label className="form-control">
          <span className="label-text mb-2 text-xs font-medium">Search title</span>
          <input
            className="input input-bordered input-sm w-full"
            type="search"
            placeholder="Search transactions"
            value={filters.search}
            onChange={(event) => onFilterChange('search', event.target.value)}
          />
        </label>
        <label className="form-control">
          <span className="label-text mb-2 text-xs font-medium">Type</span>
          <select
            className="select select-bordered select-sm w-full"
            value={filters.type}
            onChange={(event) => onFilterChange('type', event.target.value)}
          >
            <option value="">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="form-control">
          <span className="label-text mb-2 text-xs font-medium">Category</span>
          <select
            className="select select-bordered select-sm w-full"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
          >
            <option value="">All categories</option>
            {ALL_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <span className="label-text mb-2 text-xs font-medium">Month</span>
          <input
            className="input input-bordered input-sm w-full"
            type="month"
            value={filters.month}
            onChange={(event) => onFilterChange('month', event.target.value)}
          />
        </label>
      </div>

      {hasFilters && (
        <div className="-mt-2">
          <button
            className="btn btn-ghost btn-xs"
            type="button"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
