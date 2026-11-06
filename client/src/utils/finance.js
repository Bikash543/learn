const amountFormatter = new Intl.NumberFormat('en-NP', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatAmount(paisa) {
  return `NPR ${amountFormatter.format(paisa / 100)}`;
}

export function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Intl.DateTimeFormat('en-NP', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));
}

export function amountToPaisa(value) {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) return null;

  const [whole, fraction = ''] = value.split('.');
  const paisa = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  return Number.isSafeInteger(paisa) && paisa > 0 ? paisa : null;
}
