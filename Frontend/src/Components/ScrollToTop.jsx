import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router'

export default function ScrollToTop() {
  const { key, hash } = useLocation()
  const navigationType = useNavigationType()
  const positions = useRef(new Map([[key, { left: window.scrollX, top: window.scrollY }]]))

  useLayoutEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'

    return () => {
      window.history.scrollRestoration = previousRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const savePosition = () => {
      positions.current.set(key, { left: window.scrollX, top: window.scrollY })
    }

    window.addEventListener('scroll', savePosition, { passive: true })
    return () => {
      savePosition()
      window.removeEventListener('scroll', savePosition)
    }
  }, [key])

  useLayoutEffect(() => {
    if (navigationType === 'POP') {
      const position = positions.current.get(key)
      if (position) {
        window.scrollTo({ ...position, behavior: 'instant' })
      } else if (!hash) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      }
      return
    }

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [key, hash, navigationType])

  return null
}
