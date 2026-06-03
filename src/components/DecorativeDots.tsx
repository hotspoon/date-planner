export function DecorativeDots() {
  return (
    <div className="decorative-dots" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, index) => (
        <span key={index} />
      ))}
    </div>
  )
}
