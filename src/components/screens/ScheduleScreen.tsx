import { timeOptions } from '../../data/datePlanner'

type ScheduleScreenProps = {
  date: string
  time: string
  onContinue: () => void
  onDateChange: (date: string) => void
  onTimeChange: (time: string) => void
}

export function ScheduleScreen({
  date,
  time,
  onContinue,
  onDateChange,
  onTimeChange,
}: ScheduleScreenProps) {
  return (
    <section className="screen card-screen" aria-labelledby="schedule-title">
      <article className="planner-card">
        <span className="mini-icons" aria-hidden="true">
          🗓️ 🐾
        </span>
        <h1 id="schedule-title">So... when are you free?</h1>

        <label className="field">
          <span>Pick a Day ✨</span>
          <input
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </label>

        <label className="field">
          <span>What Time? 😚</span>
          <select
            value={time}
            onChange={(event) => onTimeChange(event.target.value)}
          >
            <option value="">Select a time...</option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </article>

      <button
        className="primary-button"
        type="button"
        disabled={!date || !time}
        onClick={onContinue}
      >
        lock it in →
      </button>
    </section>
  )
}
