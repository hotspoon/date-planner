type SurpriseScreenProps = {
  onContinue: () => void
}

export function SurpriseScreen({ onContinue }: SurpriseScreenProps) {
  return (
    <section className="screen surprise-screen" aria-labelledby="yay-title">
      <span className="sticker confetti" aria-hidden="true">
        🎉
      </span>
      <h1 id="yay-title">HUH?? you said yes?? 🤭</h1>
      <p>okay i need a minute to process this</p>
      <button className="primary-button" type="button" onClick={onContinue}>
        okay okay! →
      </button>
    </section>
  )
}
