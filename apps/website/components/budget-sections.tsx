import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatCurrency } from '@/lib/utils'
import { ChevronDown, Edit, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'

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

interface ItemDialogProps {
  type: 'accounts' | 'liabilities' | 'investments'
  item?: Account | Investment
  onSave: (item: Account | Investment) => void
}

export const ItemDialog = ({ type, item, onSave }: ItemDialogProps) => {
  const [localItem, setLocalItem] = useState(item || { name: '', subcategory: '', balance: 0, notes: '' })

  const handleSave = () => {
    onSave(localItem as Account | Investment)
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{item ? `Edit ${type}` : `Add ${type}`}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            value={localItem.name}
            onChange={(e) => setLocalItem({ ...localItem, name: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="subcategory" className="text-right">
            Subcategory
          </Label>
          <Input
            id="subcategory"
            value={localItem.subcategory}
            onChange={(e) => setLocalItem({ ...localItem, subcategory: e.target.value })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="balance" className="text-right">
            Balance
          </Label>
          <Input
            id="balance"
            type="number"
            value={localItem.balance}
            onChange={(e) => setLocalItem({ ...localItem, balance: Number(e.target.value) })}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="notes" className="text-right">
            Notes
          </Label>
          <Input
            id="notes"
            value={localItem.notes}
            onChange={(e) => setLocalItem({ ...localItem, notes: e.target.value })}
            className="col-span-3"
          />
        </div>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </DialogContent>
  )
}

interface SectionProps {
  title: string
  accounts: Account[]
  type: 'accounts' | 'liabilities'
  expandedSections: string[]
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>
}

export const AccountSection = ({ title, accounts, type, expandedSections, setExpandedSections }: SectionProps) => {
  const subcategories = [...new Set(accounts.map(account => account.subcategory))]
  const isExpanded = expandedSections.includes(title)

  const toggleSectionExpansion = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 group">
        <div className="flex items-center">
          <h2 className="text-sm font-semibold cursor-pointer">{title}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <ItemDialog type={type} onSave={(newAccount) => setAccounts(prev => [...prev, { ...newAccount, id: prev.length + 1 }])} />
          </Dialog>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => toggleSectionExpansion(title)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      {isExpanded && subcategories.map(subcategory => (
        <div key={subcategory} className="mb-2">
          <h3 className="text-xs font-semibold text-gray-500 mb-1">{subcategory}</h3>
          {accounts.filter(account => account.subcategory === subcategory).map(account => (
            <div key={account.id} className="mb-2 group text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {account.icon && <account.icon className="h-4 w-4 mr-2 text-gray-500" />}
                  <span>{account.name}</span>
                </div>
                <span className={`font-semibold ${account.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(account.balance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">{account.notes}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <ItemDialog type={type} item={account} onSave={(editedAccount) => setAccounts(prev => prev.map(a => a.id === account.id ? editedAccount : a))} />
                  </Dialog>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setAccounts(prev => prev.filter(a => a.id !== account.id))}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

interface InvestmentSectionProps {
  title: string
  investments: Investment[]
  type: 'investments'
  expandedSections: string[]
  setExpandedSections: React.Dispatch<React.SetStateAction<string[]>>
}

export const InvestmentSection = ({ title, investments, type, expandedSections, setExpandedSections }: InvestmentSectionProps) => {
  const isExpanded = expandedSections.includes(title)

  const toggleSectionExpansion = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section) ? prev.filter(s => s !== section) : [...prev, section]
    )
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2 group">
        <div className="flex items-center">
          <h2 className="text-sm font-semibold cursor-pointer">{title}</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <ItemDialog type={type} onSave={(newInvestment) => setInvestments(prev => [...prev, { ...newInvestment, id: prev.length + 1 }])} />
          </Dialog>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => toggleSectionExpansion(title)}
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      {isExpanded && ['Retirement', 'Cryptocurrency', 'Equity'].map(group => (
        <div key={group} className="mb-2">
          <h3 className="text-xs font-semibold text-gray-500 mb-1">{group}</h3>
          {investments.filter(investment => investment.group === group).map(investment => (
            <div key={investment.id} className="mb-2 group text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {investment.icon && <investment.icon className="h-4 w-4 mr-2 text-gray-500" />}
                  <span>{investment.name}</span>
                </div>
                <span className={`font-semibold ${investment.balance >= 0 ? 'text-success' : 'text-danger'}`}>
                  {formatCurrency(investment.balance)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">{investment.notes}</div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </DialogTrigger>
                    <ItemDialog type={type} item={investment} onSave={(editedInvestment) => setInvestments(prev => prev.map(i => i.id === investment.id ? editedInvestment : i))} />
                  </Dialog>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setInvestments(prev => prev.filter(i => i.id !== investment.id))}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
