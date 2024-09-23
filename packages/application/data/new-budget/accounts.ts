import { Account } from '../../types';

// Initial set of accounts for the financial management system
export const initialAccounts: Account[] = [
  // Cash Accounts
  {
    id: '1',
    name: 'Checking Account',
    balance: 5000,
    type: 'checking',
    group: 'Cash Accounts',
    subcategory: 'Liquid Assets',
    notes: 'Primary checking account for daily expenses',
  },
  {
    id: '2',
    name: 'Savings Account',
    balance: 10000,
    type: 'savings',
    group: 'Cash Accounts',
    subcategory: 'Liquid Assets',
    notes: 'Emergency fund and short-term savings',
  },

  // Credit Accounts
  {
    id: '3',
    name: 'Credit Card',
    balance: -1500,
    type: 'credit',
    group: 'Credit Accounts',
    subcategory: 'Revolving Credit',
    notes: 'Main credit card for monthly expenses',
  },
];

// Empty set of accounts for the financial management system
export const emptyAccounts: Account[] = [];

// Function to get the appropriate account set based on user preference
export const getAccounts = (useInitialData: boolean): Account[] => {
  return useInitialData ? initialAccounts : emptyAccounts;
};
