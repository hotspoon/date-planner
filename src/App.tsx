import { useMemo, useState } from 'react'
import './App.css'
import { DecorativeDots } from './components/DecorativeDots'
import { Progress } from './components/Progress'
import { AskScreen } from './components/screens/AskScreen'
import { DoneScreen } from './components/screens/DoneScreen'
import { FoodScreen } from './components/screens/FoodScreen'
import { ScheduleScreen } from './components/screens/ScheduleScreen'
import { SurpriseScreen } from './components/screens/SurpriseScreen'
import { foods, stepOrder } from './data/datePlanner'
import { useRunawayButton } from './hooks/useRunawayButton'
import { useSurpriseConfetti } from './hooks/useSurpriseConfetti'
import type { Step } from './types/datePlanner'
import { formatDateForPlan } from './utils/date'

function App() {
  const [step, setStep] = useState<Step>('ask')
  const [selectedFoods, setSelectedFoods] = useState<string[]>([])
  const [date, setDate] = useState('2026-05-30')
  const [time, setTime] = useState('')
  const [copyLabel, setCopyLabel] = useState('Copy plan & text me')
  const runawayButton = useRunawayButton(step === 'ask')

  useSurpriseConfetti(step === 'surprise')

  const currentStepIndex = stepOrder.indexOf(step)
  const selectedFoodNames = useMemo(
    () =>
      foods
        .filter((food) => selectedFoods.includes(food.id))
        .map((food) => food.name),
    [selectedFoods],
  )
  const formattedDate = useMemo(() => formatDateForPlan(date), [date])

  const planText = useMemo(() => {
    const foodLine = selectedFoodNames.length
      ? selectedFoodNames.join(', ')
      : 'whatever makes us happiest'

    return `It's a date! ${formattedDate || 'Pick a day'} at ${time || 'a mystery time'}. Food: ${foodLine}.`
  }, [formattedDate, selectedFoodNames, time])

  const goTo = (nextStep: Step) => {
    setStep(nextStep)
    setCopyLabel('Copy plan & text me')
  }

  const toggleFood = (id: string) => {
    setSelectedFoods((currentFoods) =>
      currentFoods.includes(id)
        ? currentFoods.filter((foodId) => foodId !== id)
        : [...currentFoods, id],
    )
  }

  const copyPlan = async () => {
    try {
      await navigator.clipboard.writeText(planText)
      setCopyLabel('Copied. now text me')
    } catch {
      setCopyLabel('Plan ready to text')
    }
  }

  return (
    <main className="app-shell">
      <Progress currentStepIndex={currentStepIndex} />
      <DecorativeDots />

      {step === 'ask' && (
        <AskScreen
          noButtonRef={runawayButton.buttonRef}
          noPosition={runawayButton.position}
          onAccept={() => goTo('surprise')}
        />
      )}

      {step === 'surprise' && (
        <SurpriseScreen onContinue={() => goTo('food')} />
      )}

      {step === 'food' && (
        <FoodScreen
          selectedFoods={selectedFoods}
          onContinue={() => goTo('schedule')}
          onToggleFood={toggleFood}
        />
      )}

      {step === 'schedule' && (
        <ScheduleScreen
          date={date}
          time={time}
          onContinue={() => goTo('done')}
          onDateChange={setDate}
          onTimeChange={setTime}
        />
      )}

      {step === 'done' && (
        <DoneScreen
          copyLabel={copyLabel}
          date={formattedDate}
          selectedFoodNames={selectedFoodNames}
          time={time}
          onCopyPlan={copyPlan}
        />
      )}
    </main>
  )
}

export default App
