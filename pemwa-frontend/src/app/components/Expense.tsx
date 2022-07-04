import { TableCell, TableRow } from "@material-ui/core"
import { currencyNumberFormat } from "../util/util"
import { IExpense } from "../components"

interface IExpenseProps {
  children: IExpense,
  expenseNumber: number
}

function Expense({ children: expense, expenseNumber}: IExpenseProps) {
  const { description, category, day, value } = expense

  return (
    <TableRow>
      <TableCell>{expenseNumber}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{category}</TableCell>
      <TableCell>{day}</TableCell>
      <TableCell>{currencyNumberFormat.format(value)}</TableCell>
    </TableRow>
  )
}

export { Expense }