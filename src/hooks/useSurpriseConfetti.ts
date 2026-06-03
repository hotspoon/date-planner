import confetti from 'canvas-confetti'
import { useEffect } from 'preact/hooks'

const confettiColors = ['#ec4a84', '#ffd166', '#7bdff2', '#b8f2c4', '#c77dff']

export function useSurpriseConfetti(isActive: boolean) {
  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReducedMotion) {
      return undefined
    }

    const burst = (origin: { x: number; y: number }) => {
      confetti({
        origin,
        particleCount: 90,
        spread: 76,
        startVelocity: 38,
        gravity: 0.86,
        scalar: 0.96,
        ticks: 220,
        colors: confettiColors,
      })
    }

    burst({ x: 0.5, y: 0.42 })

    const sideBursts = window.setTimeout(() => {
      burst({ x: 0.22, y: 0.52 })
      burst({ x: 0.78, y: 0.52 })
    }, 180)

    const fallingConfetti = window.setTimeout(() => {
      confetti({
        origin: { x: 0.5, y: 0 },
        particleCount: 120,
        spread: 110,
        startVelocity: 30,
        gravity: 0.72,
        scalar: 0.82,
        ticks: 260,
        colors: confettiColors,
      })
    }, 420)

    return () => {
      window.clearTimeout(sideBursts)
      window.clearTimeout(fallingConfetti)
      confetti.reset()
    }
  }, [isActive])
}
