import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [hiding, setHiding] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const start = Date.now()
    const duration = 2000

    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)

      if (pct >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setHiding(true)
          setTimeout(() => {
            setHidden(true)
            onComplete()
          }, 800)
        }, 300)
      }
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  if (hidden) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#f5f5f0]"
      style={{
        transform: hiding ? 'translateY(-100%)' : 'translateY(0)',
        transition: hiding ? 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)' : 'none',
      }}
    >
      <h1 className="text-shimmer font-display text-5xl md:text-8xl font-bold tracking-tighter mb-2">
        LENZ STUDIO
      </h1>
      <p className="text-[#999] text-xs tracking-[0.3em] uppercase font-body mb-8">
        Photography / Filming / Designer
      </p>

      <div className="w-48 h-[1px] bg-[#1a1a1a]/10 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-[#1a1a1a]/60"
          style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      <span className="font-body text-[#999] text-sm mt-4 tracking-widest">
        {progress}%
      </span>
    </div>
  )
}
