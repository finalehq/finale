// Financial Account Interfaces
export interface Account {
  id: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings' | 'credit' | 'investment';
  subcategory: string;
  group: string;
  notes: string;
}

export interface Investment {
  id: string;
  name: string;
  value: number;
  type: 'stock' | 'bond' | 'mutual fund' | 'etf' | 'other';
  group: string;
  notes: string;
}

export interface Liability {
  id: string;
  name: string;
  value: number;
  type: 'credit card' | 'loan' | 'mortgage' | 'other';
  group: string;
  notes: string;
}

// Transaction and Category Interfaces
export interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  categoryId: string;
  accountId: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  type: 'income' | 'expense';
  budgeted?: number;
  spent?: number;
}
