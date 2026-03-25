import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useSmoothScroll } from '../../context/SmoothScrollContext'
import { useLanguage } from '../../context/LanguageContext'

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollTo } = useSmoothScroll()
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 3.2 })

      // Overlay fade in
      tl.fromTo(
        '.hero-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.inOut' }
      )

      // Tagline
      tl.fromTo(
        '.hero-tagline',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )

      // Title lines
      tl.fromTo(
        '.hero-title-word',
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )

      // Subtitle
      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )

      // CTA button
      tl.fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )

      // Badge
      tl.fromTo(
        '.hero-badge',
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )

      // Background image parallax on scroll
      gsap.to('.hero-bg-image', {
        y: 120,
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
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-portrait.jpg"
          alt="LENZ STUDIO"
          className="hero-bg-image w-full h-full object-cover object-center scale-110"
        />
      </div>

      {/* Dark overlay */}
      <div className="hero-overlay absolute inset-0 bg-black/50 opacity-0" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Tagline */}
        <span className="hero-tagline opacity-0 text-white/60 text-xs md:text-sm uppercase tracking-[0.3em] font-body mb-6 md:mb-8">
          {t.heroTagline}
        </span>

        {/* Main title */}
        <h1 className="font-display font-bold tracking-tighter text-white leading-[0.95] mb-6 md:mb-8 overflow-hidden">
          {t.heroTitle.split(' ').map((word, i) => (
            <span key={i} className="hero-title-word inline-block opacity-0 mx-[0.15em] text-[clamp(2rem,6.5vw,5.5rem)]">
              {word}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle opacity-0 text-white/60 text-sm md:text-base font-body max-w-[520px] leading-[1.7] mb-8 md:mb-10">
          {t.heroSubtitle}
        </p>

        {/* CTA Button */}
        <button
          onClick={() => scrollTo('#contact')}
          className="hero-cta opacity-0 border border-white/60 text-white px-8 py-3.5 rounded-full text-sm font-display tracking-wider uppercase hover:bg-white hover:text-[#1a1a1a] transition-all duration-300"
          data-cursor="hover"
        >
          {t.heroCta}
        </button>
      </div>

      {/* Badge — right side */}
      <div className="hero-badge opacity-0 absolute right-6 md:right-12 bottom-8 md:bottom-12 z-10">
        <span className="text-white/40 text-[10px] md:text-xs font-body tracking-[0.25em] uppercase writing-mode-vertical hidden md:block"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {t.heroBadge}
        </span>
        <span className="text-white/40 text-[10px] font-body tracking-[0.25em] uppercase md:hidden">
          {t.heroBadge}
        </span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-[1px] h-8 bg-white/20 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-full bg-white/60 animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}
