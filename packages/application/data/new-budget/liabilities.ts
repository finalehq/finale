import { Liability } from '../../types';

// Initial set of liabilities for the financial management system
export const initialLiabilities: Liability[] = [
  // Short-term Debt
  {
    id: '1',
    name: 'Credit Card Debt',
    value: 3000,
    type: 'credit card',
    group: 'Short-term Debt',
    notes: 'High interest rate, prioritize paying off',
  },

  // Long-term Debt
  {
    id: '2',
    name: 'Car Loan',
    value: 15000,
    type: 'loan',
    group: 'Long-term Debt',
    notes: '5-year term, monthly payment $300',
  },
  {
    id: '3',
    name: 'Mortgage',
    value: 200000,
    type: 'mortgage',
    group: 'Long-term Debt',
    notes: '30-year fixed rate at 3.5%',
  },
];

// Empty set of liabilities for the financial management system
export const emptyLiabilities: Liability[] = [];

// Function to get the appropriate liability set based on user preference
export const getLiabilities = (useInitialData: boolean): Liability[] => {
  return useInitialData ? initialLiabilities : emptyLiabilities;
};
