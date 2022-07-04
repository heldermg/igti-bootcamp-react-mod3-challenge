import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core"
import { currencyNumberFormat } from "../util/util"
import { IExpense } from "./domain/IExpense"

interface IExpenseSummaryProps {
  children: IExpense[]
}

interface ICategorySummary {
  category: string
  value: number
}

function ExpensesSummary({ children: expenses }: IExpenseSummaryProps) {

  const categories = expenses
  .map(e => e.category)
  .filter((value, index, self) => self.indexOf(value) === index)
  
  let categoriesSummary: ICategorySummary[] = []
  categories.forEach(category => {
    categoriesSummary.push({
      category,
      value: expenses
              .filter(expense => expense.category === category)
              .reduce((acumulator, currentCategory) => acumulator + currentCategory.value, 0)
    })
  })

  categoriesSummary.sort((a, b) => {
    return b.value - a.value
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
        {categoriesSummary.map(({category, value}: ICategorySummary, idx: number) => {
          return (
            <TableRow key={idx}>
              <TableCell>{category}</TableCell>
              <TableCell>{currencyNumberFormat.format(value)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export { ExpensesSummary }