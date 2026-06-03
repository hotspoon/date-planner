export function formatDateForPlan(dateValue: string) {
  const [year, month, day] = dateValue.split('-')

  if (!year || !month || !day) {
    return ''
  }

  return `${day}-${month}-${year}`
}
