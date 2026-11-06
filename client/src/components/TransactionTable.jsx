import { formatAmount, formatDate } from '../utils/finance.js';
import TransactionActions from './TransactionActions.jsx';
import TransactionTypeBadge from './TransactionTypeBadge.jsx';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <>
      <div className="hidden overflow-x-auto rounded-xl border border-base-300 md:block">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Type</th>
              <th className="text-right">Amount</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="whitespace-nowrap text-base-content/65">
                  {formatDate(transaction.date)}
                </td>
                <td>
                  <p className="font-semibold">{transaction.title}</p>
                  <p className="text-xs text-base-content/55">{transaction.category}</p>
                </td>
                <td>
                  <TransactionTypeBadge type={transaction.type} />
                </td>
                <td
                  className={`whitespace-nowrap text-right font-semibold ${
                    transaction.type === 'income' ? 'text-success' : 'text-error'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatAmount(transaction.amountPaisa)}
                </td>
                <td>
                  <div className="flex justify-end">
                    <TransactionActions
                      transaction={transaction}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 md:hidden">
        {transactions.map((transaction) => (
          <article
            className="rounded-xl border border-base-300 bg-base-100 p-4"
            key={transaction.id}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="truncate font-semibold">{transaction.title}</h3>
                <p className="mt-1 text-xs text-base-content/60">
                  {transaction.category} <span aria-hidden="true">·</span>{' '}
                  {formatDate(transaction.date)}
                </p>
              </div>
              <p
                className={`whitespace-nowrap text-right font-semibold ${
                  transaction.type === 'income' ? 'text-success' : 'text-error'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatAmount(transaction.amountPaisa)}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-base-200 pt-3">
              <TransactionTypeBadge type={transaction.type} />
              <TransactionActions
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
