import SummaryCard from './SummaryCard.jsx';

export default function SummaryCards({ totals }) {
  return (
    <section
      className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="All-time totals"
    >
      <SummaryCard
        label="Total income"
        amountPaisa={totals.income}
        description="Money received · All time"
        tone="income"
      />
      <SummaryCard
        label="Total expenses"
        amountPaisa={totals.expense}
        description="Money spent · All time"
        tone="expense"
      />
      <SummaryCard
        label="Current balance"
        amountPaisa={totals.income - totals.expense}
        description="Income minus expenses · All time"
        tone="balance"
      />
    </section>
  );
}
