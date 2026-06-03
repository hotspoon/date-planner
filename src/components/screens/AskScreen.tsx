import type { RefObject } from 'react'
import type { Position } from '../../types/datePlanner'

type AskScreenProps = {
  noButtonRef: RefObject<HTMLButtonElement | null>
  noPosition: Position | null
  onAccept: () => void
}

export function AskScreen({
  noButtonRef,
  noPosition,
  onAccept,
}: AskScreenProps) {
  return (
    <section className="screen intro-screen" aria-labelledby="intro-title">
      <div className="sticker sticker-envelope" aria-hidden="true">
        💌
      </div>
      <h1 id="intro-title">Will you go on a date with me?</h1>
      <div className="answer-row">
        <button className="primary-button" type="button" onClick={onAccept}>
          Yes 💖
        </button>
        <button
          className={`secondary-button runaway-button ${
            noPosition ? 'is-running' : ''
          }`}
          ref={noButtonRef}
          style={
            noPosition
              ? {
                  left: `${noPosition.x}px`,
                  top: `${noPosition.y}px`,
                }
              : undefined
          }
          type="button"
          aria-disabled="true"
          tabIndex={-1}
        >
          No
        </button>
      </div>
    </section>
  )
}
