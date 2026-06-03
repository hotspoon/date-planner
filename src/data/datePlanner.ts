import type { Food, Step, TimeOption } from '../types/datePlanner'

export const foods: Food[] = [
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'sushi', name: 'Sushi', icon: '🍣' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'tacos', name: 'Tacos', icon: '🌮' },
  { id: 'ramen', name: 'Ramen', icon: '🍜' },
]

export const timeOptions: TimeOption[] = [
  { value: '5:00 PM', label: '5:00 PM - we eating with the retirees' },
  { value: '6:00 PM', label: '6:00 PM - this is the right answer tbh' },
  { value: '7:00 PM', label: "7:00 PM - you're making me hungry already" },
  { value: '8:00 PM', label: '8:00 PM - we eating dinner or breakfast?' },
  { value: '9:00 PM', label: '9:00 PM - late night fun' },
]

export const stepOrder: Step[] = ['ask', 'surprise', 'food', 'schedule', 'done']
