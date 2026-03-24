import { Suspense, useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { useSmoothScroll } from '../../context/SmoothScrollContext'
import { useLanguage } from '../../context/LanguageContext'
import ChromeRing from '../three/ChromeRing'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 })

      tl.fromTo('.hero-3d', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' })
      tl.fromTo('.hero-title-line', { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out' }, '-=1.2')
      tl.fromTo('.hero-phrase', { opacity: 0 }, { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.6')
      tl.fromTo('.hero-meta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '-=0.5')
      tl.fromTo('.hero-bottom', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 3D Chrome Ring — full screen background, no clipping */}
      <div className="hero-3d opacity-0 absolute inset-0 z-0">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-[#1a1a1a]/5 animate-pulse" />
          </div>
        }>
          <ChromeRing />
        </Suspense>
      </div>

      {/* "Bold Ideas" phrase — large, faded, behind content */}
      <div className="hero-phrase opacity-0 absolute top-28 md:top-32 left-6 md:left-12 right-6 md:right-12 z-[1] pointer-events-none">
        <h2 className="font-display font-bold text-[#1a1a1a]/[0.04] text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter text-center">
          Bold Ideas That<br />Start With Vision.
        </h2>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-20 pt-20">

        {/* Main title + info — bottom left */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left block */}
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-display font-bold tracking-tighter text-[#1a1a1a] leading-[0.92]">
                <span className="hero-title-line block text-5xl md:text-6xl lg:text-7xl opacity-0">
                  LENZ
                </span>
                <span className="hero-title-line block text-5xl md:text-6xl lg:text-7xl opacity-0">
                  STUDIO.
                </span>
              </h1>
            </div>

            <div className="hero-meta opacity-0">
              <span className="text-[10px] text-[#1a1a1a]/30 uppercase tracking-[0.3em] font-body">
                Creative Studio | Est. 2022
              </span>
            </div>

            <p className="hero-meta opacity-0 text-[#666] text-sm md:text-[15px] font-body max-w-sm leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>

          {/* Right block */}
          <div className="hero-meta opacity-0 flex flex-col items-start md:items-end gap-4">
            <span className="text-[#1a1a1a] text-xs font-body tracking-wider uppercase font-medium">
              {t.heroBadge}
            </span>
            <button
              onClick={() => scrollTo('#contact')}
              className="btn-outline"
              data-cursor="hover"
            >
              {t.heroCta}
              <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom opacity-0 absolute bottom-5 left-6 md:left-12 right-6 md:right-12 z-10 flex items-center justify-between">
        <span className="font-display text-[10px] text-[#1a1a1a]/15 tracking-widest uppercase">
          Lenz Studio
        </span>
        <span className="font-body text-[10px] text-[#1a1a1a]/15 tracking-widest uppercase italic">
          &ldquo;Bold Ideas That Start With Vision&rdquo;
        </span>
        <span className="font-display text-[10px] text-[#1a1a1a]/15 tracking-widest uppercase">
          Portfolio 2026
        </span>
      </div>
    </section>
  )
}
