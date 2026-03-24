import { useEffect, useRef } from 'react'
import { useIsMobile } from '../../hooks/useMediaQuery'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  useEffect(() => {
    if (isMobile) return

    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.15
      outlineY += (mouseY - outlineY) * 0.15
      outline.style.left = `${outlineX}px`
      outline.style.top = `${outlineY}px`
      requestAnimationFrame(animate)
    }

    const onMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"]')) {
        document.body.classList.add('cursor-hover')
      }
    }

    const onMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"]')) {
        document.body.classList.remove('cursor-hover')
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseEnter)
    document.addEventListener('mouseout', onMouseLeave)
    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseEnter)
      document.removeEventListener('mouseout', onMouseLeave)
    }
  }, [isMobile])

  if (isMobile) return null

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  )
}
