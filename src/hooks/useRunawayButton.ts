import { useCallback, useEffect, useRef, useState } from 'react'
import type { Position } from '../types/datePlanner'

export function useRunawayButton(isActive: boolean) {
  const [position, setPosition] = useState<Position | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const anchorRef = useRef<Position | null>(null)

  const dodge = useCallback((pointerX?: number, pointerY?: number) => {
    const buttonRect = buttonRef.current?.getBoundingClientRect()
    const buttonWidth = buttonRect?.width ?? 112
    const buttonHeight = buttonRect?.height ?? 64
    const padding = 48
    const viewportWidth =
      window.visualViewport?.width ?? document.documentElement.clientWidth
    const viewportHeight =
      window.visualViewport?.height ?? document.documentElement.clientHeight
    const maxX = Math.max(padding, viewportWidth - buttonWidth - padding)
    const maxY = Math.max(padding, viewportHeight - buttonHeight - padding)
    const cursorX = pointerX ?? viewportWidth / 2
    const cursorY = pointerY ?? viewportHeight / 2
    const currentX = buttonRect?.left ?? position?.x ?? maxX / 2
    const currentY = buttonRect?.top ?? position?.y ?? maxY / 2
    anchorRef.current ??= { x: currentX, y: currentY }

    const anchor = anchorRef.current
    const localMinX = Math.max(padding, anchor.x - 280)
    const localMaxX = Math.min(maxX, anchor.x + 280)
    const localMinY = Math.max(padding, anchor.y - 150)
    const localMaxY = Math.min(maxY, anchor.y + 150)
    const buttonCenterX = currentX + buttonWidth / 2
    const buttonCenterY = currentY + buttonHeight / 2
    const awayX = buttonCenterX - cursorX
    const awayY = buttonCenterY - cursorY
    const distance = Math.hypot(awayX, awayY) || 1
    const directionX = awayX / distance
    const directionY = awayY / distance
    const yesButtonRect = document
      .querySelector('.primary-button')
      ?.getBoundingClientRect()
    let bestHop = {
      score: -Infinity,
      x: currentX,
      y: currentY,
    }

    for (let attempt = 0; attempt < 14; attempt += 1) {
      const hopDistance = 92 + Math.random() * 42
      const sideStep = (Math.random() - 0.5) * 82
      const angle = Math.random() * Math.PI * 2
      const candidateX =
        distance < 24
          ? currentX + Math.cos(angle) * hopDistance
          : currentX + directionX * hopDistance - directionY * sideStep
      const candidateY =
        distance < 24
          ? currentY + Math.sin(angle) * hopDistance
          : currentY + directionY * hopDistance + directionX * sideStep
      const x = Math.min(Math.max(candidateX, localMinX), localMaxX)
      const y = Math.min(Math.max(candidateY, localMinY), localMaxY)
      const candidateCenterX = x + buttonWidth / 2
      const candidateCenterY = y + buttonHeight / 2
      const pointerDistance = Math.hypot(
        candidateCenterX - cursorX,
        candidateCenterY - cursorY,
      )
      const yesDistance = yesButtonRect
        ? Math.hypot(
            candidateCenterX -
              (yesButtonRect.left + yesButtonRect.width / 2),
            candidateCenterY -
              (yesButtonRect.top + yesButtonRect.height / 2),
          )
        : 220
      const overlapsYes =
        yesButtonRect &&
        x < yesButtonRect.right + 18 &&
        x + buttonWidth > yesButtonRect.left - 18 &&
        y < yesButtonRect.bottom + 18 &&
        y + buttonHeight > yesButtonRect.top - 18
      const score = pointerDistance + yesDistance * 0.55 - (overlapsYes ? 900 : 0)

      if (score > bestHop.score) {
        bestHop = { score, x, y }
      }
    }

    setPosition({
      x: Math.round(bestHop.x),
      y: Math.round(bestHop.y),
    })
  }, [position])

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const buttonRect = buttonRef.current?.getBoundingClientRect()

      if (!buttonRect) {
        return
      }

      const safeZone = 84
      const isPointerNearby =
        event.clientX >= buttonRect.left - safeZone &&
        event.clientX <= buttonRect.right + safeZone &&
        event.clientY >= buttonRect.top - safeZone &&
        event.clientY <= buttonRect.bottom + safeZone

      if (isPointerNearby) {
        dodge(event.clientX, event.clientY)
      }
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [dodge, isActive])

  return {
    buttonRef,
    position,
  }
}
