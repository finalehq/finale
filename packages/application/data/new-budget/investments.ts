import { Investment } from '../../types';

// Initial set of investments for the financial management system
export const initialInvestments: Investment[] = [
  // Equity Investments
  {
    id: '1',
    name: 'S&P 500 Index Fund',
    value: 50000,
    type: 'etf',
    group: 'Equity',
    notes: 'Broad market exposure through low-cost index fund',
  },
  {
    id: '2',
    name: 'Tech Company Stock',
    value: 10000,
    type: 'stock',
    group: 'Individual Stocks',
    notes: 'High-growth potential in the technology sector',
  },

  // Fixed Income Investments
  {
    id: '3',
    name: 'Government Bonds',
    value: 20000,
    type: 'bond',
    group: 'Fixed Income',
    notes: 'Stable, low-risk investment for portfolio balance',
  },
];

// Empty set of investments for the financial management system
export const emptyInvestments: Investment[] = [];

// Function to get the appropriate investment set based on user preference
export const getInvestments = (useInitialData: boolean): Investment[] => {
  return useInitialData ? initialInvestments : emptyInvestments;
};
