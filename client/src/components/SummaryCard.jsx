import { formatAmount } from '../utils/finance.js';

export default function SummaryCard({ label, amountPaisa, description, tone }) {
  const amountColor =
    tone === 'income'
      ? 'text-success'
      : tone === 'expense'
        ? 'text-error'
        : 'text-base-content';

  return (
    <article className="card border border-base-300 bg-base-100 shadow-sm">
      <div className="card-body gap-2 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-medium text-base-content/65">{label}</h2>
          <span className="badge badge-ghost badge-sm">All time</span>
        </div>
        <p className={`text-2xl font-bold tracking-tight sm:text-3xl ${amountColor}`}>
          {formatAmount(amountPaisa)}
        </p>
        <p className="text-xs text-base-content/55">{description}</p>
      </div>
    </article>
  );
}
