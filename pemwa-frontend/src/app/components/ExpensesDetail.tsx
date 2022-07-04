import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { IExpense, Expense } from "."

interface IExpensesProps {
  children: IExpense[]
}

function ExpensesDetail({ children: expenses }: IExpensesProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nr.</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Day</TableCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {expenses.map((expense:IExpense, idx: number) => {
          return (
            <Expense key={expense.id} expenseNumber={idx+1}>
              {expense}
            </Expense>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { ExpensesDetail }