export type Step = 'ask' | 'surprise' | 'food' | 'schedule' | 'done'

export type Food = {
  id: string
  name: string
  icon: string
}

export type TimeOption = {
  value: string
  label: string
}

export type Position = {
  x: number
  y: number
}
