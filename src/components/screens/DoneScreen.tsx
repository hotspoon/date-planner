type DoneScreenProps = {
  copyLabel: string
  date: string
  selectedFoodNames: string[]
  time: string
  onCopyPlan: () => void
}

export function DoneScreen({
  copyLabel,
  date,
  selectedFoodNames,
  time,
  onCopyPlan,
}: DoneScreenProps) {
  return (
    <section className="screen result-screen" aria-labelledby="done-title">
      <article className="result-card">
        <span className="floating-note" aria-hidden="true">
          💌
        </span>
        <h1 id="done-title">It's a date! 💌</h1>
        <p>{time || '6:00 PM'}, got it. bringing snacks just in case 🍿</p>
        <p className="note">
          p.s. normal people text. i made a website during lunch, for you. no
          big deal.
        </p>

        <div className="summary">
          <div>
            <span aria-hidden="true">📅</span>
            <div>
              <strong>WHEN</strong>
              <p>{date || '30-05-2026'}</p>
              <small>at {time || '6:00 PM'}</small>
            </div>
          </div>
          <div>
            <span aria-hidden="true">🍽️</span>
            <div>
              <strong>FOOD</strong>
              <p>{selectedFoodNames.join(', ')}</p>
            </div>
          </div>
        </div>

        <button className="primary-button" type="button" onClick={onCopyPlan}>
          {copyLabel}
        </button>
      </article>
    </section>
  )
}
