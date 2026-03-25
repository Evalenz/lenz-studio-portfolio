import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { ArrowUpRight } from 'lucide-react'
import { useSmoothScroll } from '../../context/SmoothScrollContext'
import { useLanguage } from '../../context/LanguageContext'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 })

      // Photo reveal
      tl.fromTo(
        '.hero-image-wrapper',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'power4.inOut' }
      )
      tl.fromTo(
        '.hero-image-inner',
        { scale: 1.3 },
        { scale: 1, duration: 1.8, ease: 'power2.out' },
        '-=1.2'
      )

      // Text reveal
      tl.fromTo(
        '.hero-title-line',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.9, ease: 'power3.out' },
        '-=1.0'
      )
      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      tl.fromTo(
        '.hero-meta-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      )
      tl.fromTo(
        '.hero-bottom',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      )

      // Subtle parallax on scroll
      gsap.to('.hero-image-inner', {
        y: 80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Layout: split — left text, right photo */}
      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.1fr_0.9fr] gap-6 md:gap-10 items-end md:items-center pt-24 pb-20 md:pb-0">

        {/* Left — Text content */}
        <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1 z-10">
          <div>
            <h1 className="font-display font-bold tracking-tighter text-[#1a1a1a] leading-[0.88]">
              <span className="hero-title-line block text-[clamp(3rem,7vw,5.5rem)] opacity-0">
                LENZ
              </span>
              <span className="hero-title-line block text-[clamp(3rem,7vw,5.5rem)] opacity-0">
                STUDIO<span className="text-[#bbb]">.</span>
              </span>
            </h1>
          </div>

          <div className="hero-subtitle opacity-0 flex flex-col gap-3">
            <span className="text-[10px] text-[#1a1a1a]/25 uppercase tracking-[0.35em] font-body">
              Creative Studio — Est. 2022
            </span>
            <p className="text-[#888] text-[15px] md:text-base font-body max-w-[380px] leading-[1.7]">
              {t.heroSubtitle}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="hero-meta-item opacity-0">
              <button
                onClick={() => scrollTo('#contact')}
                className="btn-outline"
                data-cursor="hover"
              >
                {t.heroCta}
                <ArrowUpRight size={14} />
              </button>
            </div>
            <span className="hero-meta-item opacity-0 text-[#1a1a1a]/60 text-[11px] font-body tracking-[0.2em] uppercase font-medium">
              {t.heroBadge}
            </span>
          </div>
        </div>

        {/* Right — Photo */}
        <div className="order-1 md:order-2 flex items-center justify-center md:justify-end h-[45vh] md:h-[75vh] relative">
          <div className="hero-image-wrapper relative w-full h-full max-w-[500px] md:max-w-none overflow-hidden rounded-[4px]" style={{ clipPath: 'inset(100% 0% 0% 0%)' }}>
            <img
              src="/images/hero-portrait.jpg"
              alt="LENZ STUDIO Photography"
              className="hero-image-inner w-full h-full object-cover object-center grayscale-[30%] contrast-[1.05]"
            />
            {/* Photo overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent" />
          </div>

          {/* Number badge */}
          <div className="hero-meta-item opacity-0 absolute bottom-4 md:bottom-8 left-4 md:-left-8 z-20">
            <span className="font-display text-[80px] md:text-[120px] font-bold leading-none text-[#1a1a1a]/[0.04] select-none">
              01
            </span>
          </div>
        </div>
      </div>

      {/* "Bold Ideas" watermark — behind everything */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none w-full px-6">
        <h2 className="hero-title-line opacity-0 font-display font-bold text-[#1a1a1a]/[0.025] text-[clamp(2rem,6vw,5rem)] leading-[1] tracking-tighter text-center select-none whitespace-nowrap">
          Bold Ideas That Start With Vision.
        </h2>
      </div>

      {/* Bottom bar */}
      <div className="hero-bottom opacity-0 absolute bottom-5 left-6 md:left-12 right-6 md:right-12 z-10 flex items-center justify-between">
        <span className="font-display text-[10px] text-[#1a1a1a]/15 tracking-widest uppercase">
          Lenz Studio
        </span>
        <div className="hidden md:flex items-center gap-3">
          <div className="w-8 h-[1px] bg-[#1a1a1a]/10" />
          <span className="font-body text-[10px] text-[#1a1a1a]/20 tracking-widest uppercase italic">
            &ldquo;Bold Ideas That Start With Vision&rdquo;
          </span>
          <div className="w-8 h-[1px] bg-[#1a1a1a]/10" />
        </div>
        <span className="font-display text-[10px] text-[#1a1a1a]/15 tracking-widest uppercase">
          Portfolio 2026
        </span>
      </div>
    </section>
  )
}
