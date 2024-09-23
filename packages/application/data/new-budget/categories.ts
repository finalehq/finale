import { Category } from '../../types';

// Initial set of categories and subcategories for income and expenses
export const initialCategories: Category[] = [
  // Income Categories
  {
    id: '1',
    name: 'Income',
    type: 'income',
    subcategories: [
      {
        id: '1a',
        name: 'Salary',
        type: 'income',
        budgeted: 0,
        spent: 0,
      },
      {
        id: '1b',
        name: 'Freelance Work',
        type: 'income',
        budgeted: 0,
        spent: 0,
      },
    ],
  },

  // Expense Categories
  {
    id: '2',
    name: 'Housing',
    type: 'expense',
    subcategories: [
      {
        id: '2a',
        name: 'Rent/Mortgage',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
      {
        id: '2b',
        name: 'Utilities',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
    ],
  },
  {
    id: '3',
    name: 'Food',
    type: 'expense',
    subcategories: [
      {
        id: '3a',
        name: 'Groceries',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
      {
        id: '3b',
        name: 'Dining Out',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
    ],
  },
  {
    id: '4',
    name: 'Transportation',
    type: 'expense',
    subcategories: [
      {
        id: '4a',
        name: 'Auto Loan',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
      {
        id: '4b',
        name: 'Fuel',
        type: 'expense',
        budgeted: 0,
        spent: 0,
      },
    ],
  },
];

// Empty set of categories for the financial management system
export const emptyCategories: Category[] = [];

// Function to get the appropriate category set based on user preference
export const getCategories = (useInitialData: boolean): Category[] => {
  return useInitialData ? initialCategories : emptyCategories;
};
