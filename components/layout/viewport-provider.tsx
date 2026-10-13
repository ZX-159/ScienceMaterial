"use client"
import { useEffect } from "react"

export function ViewportProvider() {
  useEffect(() => {
    const setHeights = () => {
      const vv = window.visualViewport
      const vh = vv ? vv.height : window.innerHeight
      const vw = vv ? vv.width : window.innerWidth
      document.documentElement.style.setProperty('--app-height', `${vh}px`)
      document.documentElement.style.setProperty('--visual-viewport-height', `${vh}px`)
      document.documentElement.style.setProperty('--visual-viewport-width', `${vw}px`)
    }

    setHeights()

    const vv = window.visualViewport
    if (vv) {
      vv.addEventListener('resize', setHeights)
      vv.addEventListener('scroll', setHeights)
    }
    window.addEventListener('resize', setHeights)
    window.addEventListener('orientationchange', setHeights)

    const onFocusIn = () => {
      setTimeout(setHeights, 100)
    }
    window.addEventListener('focusin', onFocusIn)
    window.addEventListener('focusout', onFocusIn)

    return () => {
      if (vv) {
        vv.removeEventListener('resize', setHeights)
        vv.removeEventListener('scroll', setHeights)
      }
      window.removeEventListener('resize', setHeights)
      window.removeEventListener('orientationchange', setHeights)
      window.removeEventListener('focusin', onFocusIn)
      window.removeEventListener('focusout', onFocusIn)
    }
  }, [])

  return null
}
