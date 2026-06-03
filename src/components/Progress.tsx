import { stepOrder } from '../data/datePlanner'

type ProgressProps = {
  currentStepIndex: number
}

export function Progress({ currentStepIndex }: ProgressProps) {
  return (
    <nav className="progress-hearts" aria-label="Date planner progress">
      {stepOrder.map((stepName, index) => (
        <span
          className={index <= currentStepIndex ? 'active' : ''}
          key={stepName}
          aria-current={index === currentStepIndex ? 'step' : undefined}
        >
          💖
        </span>
      ))}
    </nav>
  )
}
