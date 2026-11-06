export default function TransactionTypeBadge({ type }) {
  const isIncome = type === 'income';
  return (
    <span
      className={`badge ${isIncome ? 'badge-success' : 'badge-error'} badge-outline`}
    >
      {isIncome ? 'Income' : 'Expense'}
    </span>
  );
}
