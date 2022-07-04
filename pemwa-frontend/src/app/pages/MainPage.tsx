import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box } from "@material-ui/core"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"
import { apiGetAllExpenses } from "../services/apiService"
import { 
  IExpense, ExpensesDetail, Main, YearMonthForm, 
  UserInfo, TabPanel, ExpensesSummary 
} from "../components"
import { AxiosError } from "axios"
import { currencyNumberFormat, getTodayYearMonthISO } from "../util/util"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

export default function MainPage() {
  const params = useParams<{ yearMonth: string }>()
  const yearMonth = params.yearMonth || getTodayYearMonthISO()
  const [tabIndex, setTabIndex] = useState(1);
  const [expenses, setExpenses] = useState<IExpense[]>([])
  const [selectedYear, setSelectedYear] = useState<string>(`${yearMonth.substring(0, 4)}`)
  const [selectedMonth, setSelectedMonth] = useState<string>(`${yearMonth.substring(5)}`)
  const navigate = useNavigate()

  useEffect(() => {
    async function getExpensesByYearMonth() {
      try {
        const allExpenses = await apiGetAllExpenses(yearMonth)
        setExpenses(allExpenses)

      } catch (err: unknown) {
        const typedError = err as AxiosError
        throw Error(typedError.message)
      }
    }
    getExpensesByYearMonth()
  }, [yearMonth])

  function handleSelectedYearChange(newValue: MaterialUiPickersDate) {
    if (newValue) {
      const newYear = `${newValue.getFullYear().toString()}`
      setSelectedYear(newYear)
      navigate(`/expenses/${newYear}-${selectedMonth}`)
    }
  }

  function handleSelectedMonthChange(evt: React.ChangeEvent<{ value: unknown }>) {
    if (evt) {
      const newMonth: string = evt.target.value as string
      setSelectedMonth(newMonth)
      navigate(`/expenses/${selectedYear}-${newMonth}`)
    }
  }

  let totalExpense: number = 0
  if (expenses) {
    totalExpense = expenses.reduce((acumulator, currentExpense) => {
      return acumulator + currentExpense.value
    }, 0)
  }

  if (!expenses) {
    return <div>Loading data...</div>
  }

  return (
    <Main>
      <UserInfo />

      <Box margin="50px">
        <YearMonthForm
          selectedYear={selectedYear}
          handleSelectedYearChange={handleSelectedYearChange}
          selectedMonth={selectedMonth}
          handleSelectedMonthChange={handleSelectedMonthChange}
        />
        <Box
          marginRight="50px"
          display="flex" 
          alignItems="center"
          justifyContent="flex-end">
            <strong style={{ whiteSpace: "pre", fontSize: "20px" }}>
              Total Expense: {currencyNumberFormat.format(totalExpense)}
            </strong>
        </Box>
        
        <Tabs
          value={tabIndex}
          onChange={(_evt, newValue) => setTabIndex(newValue)}
          indicatorColor="secondary"
          textColor="primary"
          centered
        >
          <Tab label="Summary"/>
          <Tab label="Detail"/>
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <ExpensesSummary>{expenses}</ExpensesSummary>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <ExpensesDetail>{expenses}</ExpensesDetail>
        </TabPanel>

      </Box>
    </Main>
  )
}