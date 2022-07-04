import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { currencyNumberFormat, groupBy } from "../util/util"
import { IExpense } from "./domain/IExpense"

interface IExpenseSummaryProps {
  children: IExpense[]
}

function ExpensesSummary({ children: expenses }: IExpenseSummaryProps) {

  const expensesByCategory = groupBy(expenses, "category")
  const categoriesKeys = Object.keys(expensesByCategory)
  
  categoriesKeys.forEach((c: any) => {
    let totalExpense = expensesByCategory[c].reduce((acumulator: any, currentExpense: any) => {
      return acumulator + currentExpense.value
    }, 0)
    expensesByCategory[c] = {...expensesByCategory[c], totalExpense}
  })

  categoriesKeys.sort((a, b) => {
    return expensesByCategory[b].totalExpense - expensesByCategory[a].totalExpense
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell width="80%">Category</TableCell>
          <TableCell width="20%">Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {categoriesKeys.map((c:any, idx: number) => {
          return (
            <TableRow key={idx}>
              <TableCell>{c}</TableCell>
              <TableCell>{currencyNumberFormat.format(expensesByCategory[c].totalExpense)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { ExpensesSummary }