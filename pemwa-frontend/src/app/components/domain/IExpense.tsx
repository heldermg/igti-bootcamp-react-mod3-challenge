interface IExpense {
  id: number
  description: string
  category: string
  value: number
  yearMonth: string
  day: number
}

export type { IExpense }