export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: [
    'Food & Dining',
    'Transport',
    'Housing',
    'Utilities',
    'Health',
    'Shopping',
    'Entertainment',
    'Education',
    'Other',
  ],
};

export const ALL_CATEGORIES = [...new Set(Object.values(CATEGORIES).flat())].sort();
