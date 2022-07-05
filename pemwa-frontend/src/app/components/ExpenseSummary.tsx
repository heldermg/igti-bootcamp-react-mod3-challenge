import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { currencyNumberFormat } from "../util/util"
import { IExpense } from "./domain/IExpense"

interface IExpenseSummaryProps {
  children: IExpense[]
}

interface ICategorySummary {
  category: string
  totalValue: number
}

function ExpensesSummary({ children: expenses }: IExpenseSummaryProps) {

  const categories = expenses
    .map(e => e.category)
    .filter((value, index, self) => self.indexOf(value) === index)
  
  let categoriesSummary: ICategorySummary[] = []
  categories.forEach(category => {
    categoriesSummary.push({
      category,
      totalValue: expenses
              .filter(expense => expense.category === category)
              .reduce((ac, currentCategory) => ac + currentCategory.value, 0)
    })
  })

  categoriesSummary.sort((a, b) => {
    return b.totalValue - a.totalValue
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
        {categoriesSummary.map(({category, totalValue}: ICategorySummary, idx: number) => {
          return (
            <TableRow key={idx}>
              <TableCell>{category}</TableCell>
              <TableCell>{currencyNumberFormat.format(totalValue)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { ExpensesSummary }