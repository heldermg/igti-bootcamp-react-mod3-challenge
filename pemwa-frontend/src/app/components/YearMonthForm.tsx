import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import { parseISO } from 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { months, padStartWithZero } from "../util/util"
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date"

interface IYearMonthFormProps {
  selectedYear: string,
  selectedMonth: string,
  handleSelectedYearChange: (newValue: MaterialUiPickersDate) => void,
  handleSelectedMonthChange: (evt: React.ChangeEvent<{ value: unknown }>) => void
}

function YearMonthForm({
    selectedYear, handleSelectedYearChange, 
    selectedMonth, handleSelectedMonthChange}: IYearMonthFormProps) {
  return (
    <Box 
      flex="1" 
      display="flex" 
      justifyContent="flex-start" 
      p="1" m="1">
      <Box 
        component="span" 
        margin="10px">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            views={["year"]}
            label="Year"
            value={parseISO(selectedYear)}
            onChange={handleSelectedYearChange}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Box 
        component="span" 
        margin="10px">
        <FormControl>
          <InputLabel id="select-month">Month</InputLabel>
          <Select
            label="Month"
            labelId="select-month"
            value={selectedMonth}
            onChange={handleSelectedMonthChange}
          >
            {months.map((month: string, idx: number) => (
              <MenuItem 
                key={idx} 
                value={padStartWithZero((months.indexOf(month)+1), 2)}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export { YearMonthForm }