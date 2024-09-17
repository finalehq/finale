'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { formatCurrency, formatPercentage } from '@/lib/utils'
import { BarChart4, Bitcoin, Briefcase, Building, Car, ChevronDown, ChevronLeft, ChevronRight, CreditCard, DollarSign, Home, PiggyBank, Settings, TrendingUp, Wallet } from 'lucide-react'
import React, { useState } from "react"
import { AccountSection, InvestmentSection } from './budget-sections'

// Define types for our data structures
interface Account {
  id: number
  name: string
  balance: number
  notes: string
  icon: React.ElementType
  subcategory: string
}

interface Investment {
  id: number
  name: string
  balance: number
  notes: string
  icon: React.ElementType
  group: string
}

interface Category {
  id: number
  name: string
  group: string
  budgeted: number
  spent: number
}

// Initial dummy data with subcategories
const initialAccounts: Account[] = [
  { id: 1, name: 'Main Checking', balance: 5000, notes: 'Primary account', icon: Wallet, subcategory: 'Checking' },
  { id: 2, name: 'Joint Checking', balance: 3000, notes: 'Shared with spouse', icon: Wallet, subcategory: 'Checking' },
  { id: 3, name: 'Emergency Fund', balance: 10000, notes: 'For unexpected expenses', icon: PiggyBank, subcategory: 'Savings' },
  { id: 4, name: 'Vacation Savings', balance: 2000, notes: 'For annual vacation', icon: PiggyBank, subcategory: 'Savings' },
  { id: 5, name: 'Cash', balance: 200, notes: 'Physical cash', icon: DollarSign, subcategory: 'Cash' },
]

const initialLiabilities: Account[] = [
  { id: 1, name: 'Visa', balance: -1500, notes: 'Credit card', icon: CreditCard, subcategory: 'Credit Cards' },
  { id: 2, name: 'Mastercard', balance: -2500, notes: 'Credit card', icon: CreditCard, subcategory: 'Credit Cards' },
  { id: 3, name: 'Mortgage', balance: -200000, notes: 'Home loan', icon: Home, subcategory: 'Loans' },
  { id: 4, name: 'Car Loan', balance: -15000, notes: 'Auto loan', icon: Car, subcategory: 'Loans' },
  { id: 5, name: 'Student Loan', balance: -30000, notes: 'Education loan', icon: Briefcase, subcategory: 'Loans' },
]

const initialInvestments: Investment[] = [
  { id: 1, name: '401k', balance: 50000, notes: 'Retirement account', icon: Building, group: 'Retirement' },
  { id: 2, name: 'Roth IRA', balance: 25000, notes: 'Retirement account', icon: Building, group: 'Retirement' },
  { id: 3, name: 'Bitcoin', balance: 10000, notes: 'Cryptocurrency', icon: Bitcoin, group: 'Cryptocurrency' },
  { id: 4, name: 'Apple Stock', balance: 20000, notes: 'Individual stock', icon: TrendingUp, group: 'Equity' },
  { id: 5, name: 'Index Funds', balance: 30000, notes: 'Diversified investment', icon: TrendingUp, group: 'Equity' },
]

const initialCategories: Category[] = [
  { id: 1, name: 'Salary', group: 'Income', budgeted: 5000, spent: 5000 },
  { id: 2, name: 'Rent', group: 'Housing', budgeted: 1500, spent: 1500 },
  { id: 3, name: 'Groceries', group: 'Food', budgeted: 500, spent: 450 },
  { id: 4, name: 'Dining Out', group: 'Food', budgeted: 200, spent: 180 },
  { id: 5, name: 'Gas', group: 'Transportation', budgeted: 100, spent: 90 },
  { id: 6, name: 'Car Payment', group: 'Transportation', budgeted: 300, spent: 300 },
]

export function BudgetAppComponent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [accounts, setAccounts] = useState(initialAccounts)
  const [liabilities, setLiabilities] = useState(initialLiabilities)
  const [investments, setInvestments] = useState(initialInvestments)
  const [categories, setCategories] = useState(initialCategories)
  const [expandedGroups, setExpandedGroups] = useState(['Income', 'Housing', 'Food', 'Transportation'])
  const [expandedSections, setExpandedSections] = useState(['Accounts', 'Liabilities', 'Investments'])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const totalAssets = accounts.reduce((sum, account) => sum + account.balance, 0) +
                      investments.reduce((sum, investment) => sum + investment.balance, 0)
  const totalLiabilities = Math.abs(liabilities.reduce((sum, liability) => sum + liability.balance, 0))
  const netWorth = totalAssets - totalLiabilities

  const totalBudgeted = categories.reduce((sum, category) => sum + category.budgeted, 0)
  const totalSpent = categories.reduce((sum, category) => sum + category.spent, 0)
  const remaining = totalBudgeted - totalSpent

  // Fake percentage differences for demonstration
  const budgetedDiff = 3.5
  const spentDiff = 1.8
  const remainingDiff = 12.4

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white transition-all duration-300 ease-in-out ${isSidebarOpen ? 'w-64' : 'w-16'} flex flex-col border-r relative`}>
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center">
            <DollarSign className="h-6 w-6 text-success" />
            <h2 className={`font-bold text-lg ml-2 ${isSidebarOpen ? '' : 'hidden'}`}>Finale</h2>
          </div>
        </div>
        <ScrollArea className={`flex-grow ${isSidebarOpen ? '' : 'hidden'}`}>
          <div className="p-4">
            <AccountSection title="Accounts" accounts={accounts} type="accounts" expandedSections={expandedSections} setExpandedSections={setExpandedSections} />
            <AccountSection title="Liabilities" accounts={liabilities} type="liabilities" expandedSections={expandedSections} setExpandedSections={setExpandedSections} />
            <InvestmentSection title="Investments" investments={investments} type="investments" expandedSections={expandedSections} setExpandedSections={setExpandedSections} />
          </div>
        </ScrollArea>
        <div className={`${isSidebarOpen ? 'hidden' : 'flex'} items-center justify-center mt-4`}>
          <BarChart4 className="h-8 w-8 text-gray-700" />
        </div>
        <div className={`p-4 border-t ${isSidebarOpen ? '' : 'hidden'}`}>
          <div className="mb-6 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-primary">Total Assets</span>
              <span className={`text-sm font-bold ${totalAssets >= 0 ? 'text-success' : 'text-danger'}`}>{formatCurrency(totalAssets)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-primary">Total Liabilities</span>
              <span className={`text-sm font-bold ${totalLiabilities >= 0 ? 'text-danger' : 'text-success'}`}>{formatCurrency(totalLiabilities)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-primary">Net Worth</span>
              <span className={`text-sm font-bold ${netWorth >= 0 ? 'text-success' : 'text-danger'}`}>
                {formatCurrency(netWorth)}
              </span>
            </div>
          </div>
        </div>
        <div className={`p-4 border-t ${isSidebarOpen ? 'flex items-center justify-between' : 'flex flex-col items-center space-y-4'}`}>
          <div className="flex items-center">
            <img src="/placeholder.svg?height=32&width=32" alt="User" className="w-8 h-8 rounded-full" />
            <span className={isSidebarOpen ? 'ml-2 text-primary' : 'hidden'}>John Doe</span>
          </div>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4 text-primary" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="absolute -right-4 top-4 bg-white border rounded-full shadow-md"
        >
          {isSidebarOpen ? <ChevronLeft className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-primary" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-primary">Financial Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1 text-primary">Budgeted</h3>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalBudgeted)}</div>
                  <p className="text-xs text-muted">
                    <span className={budgetedDiff >= 0 ? "text-success" : "text-danger"}>
                      {formatPercentage(budgetedDiff)}
                    </span>
                    {" "}from last month
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1 text-primary">Spent</h3>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(totalSpent)}</div>
                  <p className="text-xs text-muted">
                    <span className={spentDiff >= 0 ? "text-danger" : "text-success"}>
                      {formatPercentage(spentDiff)}
                    </span>
                    {" "}from last month
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1 text-primary">Remaining</h3>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(remaining)}</div>
                  <p className="text-xs text-muted">
                    <span className={remainingDiff >= 0 ? "text-success" : "text-danger"}>
                      {formatPercentage(remainingDiff)}
                    </span>
                    {" "}from last month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="text-left text-secondary text-sm border-b">
                  <th className="p-3 font-medium">Category</th>
                  <th className="p-3 font-medium text-right">Budgeted</th>
                  <th className="p-3 font-medium text-right">Spent</th>
                  <th className="p-3 font-medium text-right">Remaining</th>
                </tr>
              </thead>
              <tbody>
                {['Income', 'Housing', 'Food', 'Transportation'].map((group) => (
                  <React.Fragment key={group}>
                    <tr className="group border-b hover:bg-gray-50 cursor-pointer" onClick={() => setExpandedGroups(prev => prev.includes(group) ? prev.filter(g => g !== group) : [...prev, group])}>
                      <td colSpan={4} className="p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-primary">{group}</span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedGroups.includes(group) ? 'rotate-180' : ''} text-primary`} />
                        </div>
                      </td>
                    </tr>
                    {expandedGroups.includes(group) && categories
                      .filter((category) => category.group === group)
                      .map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="p-3 pl-8 text-primary">{category.name}</td>
                          <td className="p-3 text-right">
                            <Input
                              type="number"
                              value={category.budgeted}
                              onChange={(e) => {
                                const newCategories = categories.map(c =>
                                  c.id === category.id ? { ...c, budgeted: Number(e.target.value) } : c
                                )
                                setCategories(newCategories)
                              }}
                              className="w-24 text-right text-primary"
                            />
                          </td>
                          <td className="p-3 text-right text-primary">{formatCurrency(category.spent)}</td>
                          <td className="p-3 text-right text-primary">
                            <span className={category.budgeted - category.spent >= 0 ? 'text-success' : 'text-danger'}>
                              {formatCurrency(category.budgeted - category.spent)}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
