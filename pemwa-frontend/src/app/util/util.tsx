
const months: string[] = [
  'January', 'February', 'March', 
  'April', 'May', 'June', 
  'July', 'August', 'September',
  'October', 'November', 'December']

function padStartWithZero(element: any, length: number): string {
  if (element) {
    return element.toString().padStart(length, "0")
  }
  return element
}

function getTodayYearMonthISO(): string {
  const today = new Date()
  return `${today.getFullYear()}-${padStartWithZero((today.getMonth()+1), 2)}`
}

const currencyOptions = {
  style: 'currency',
  currency: 'BRL',
  minimumFractionDigits: 2,
}

const currencyNumberFormat = Intl.NumberFormat('pt-BR', currencyOptions)

export { months, currencyNumberFormat, padStartWithZero, getTodayYearMonthISO }