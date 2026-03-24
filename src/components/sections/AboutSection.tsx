import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'
import ChromeDecor from '../ui/ChromeDecor'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.about-heading', start: 'top 85%' } })
      gsap.fromTo('.about-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: '.about-text-container', start: 'top 80%' } })
      gsap.fromTo('.about-stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: '.about-stats', start: 'top 85%' } })
      gsap.fromTo('.about-image', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, scrollTrigger: { trigger: '.about-image', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      {/* Chrome sphere decoration — top right */}
      <ChromeDecor shape="sphere" className="absolute -top-10 -right-16 w-48 h-48 md:w-64 md:h-64 opacity-60" />

      {/* Chrome pill decoration — bottom left */}
      <ChromeDecor shape="pill" className="absolute -bottom-20 -left-20 w-40 h-40 md:w-56 md:h-56 opacity-40" />

      <div className="max-w-7xl mx-auto relative">
        <h2 className="about-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-16 md:mb-24">
          {t.aboutHeading} <span className="text-[#999]">LENZ</span>?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="about-image card p-3 relative group">
            <div className="aspect-[3/4] bg-[#eaeae5] rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-[#ccc] font-display text-2xl">
                LENZ STUDIO
              </div>
            </div>
            {/* Small chrome torus next to image */}
            <ChromeDecor shape="torus" className="absolute -bottom-8 -right-8 w-28 h-28 opacity-70" />
          </div>

          <div className="about-text-container space-y-6">
            <p className="about-text text-[#666] text-base md:text-lg leading-relaxed font-body">{t.aboutP1}</p>
            <p className="about-text text-[#666] text-base md:text-lg leading-relaxed font-body">{t.aboutP2}</p>
            <p className="about-text text-[#666] text-base md:text-lg leading-relaxed font-body">{t.aboutP3}</p>
            <p className="about-text text-[#666] text-base md:text-lg leading-relaxed font-body">{t.aboutP4}</p>

            <div className="about-stats grid grid-cols-3 gap-6 pt-8 border-t border-[#1a1a1a]/10">
              <div className="about-stat">
                <span className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">4+</span>
                <span className="block text-[#999] text-xs uppercase tracking-wider mt-1 font-body">{t.years}</span>
              </div>
              <div className="about-stat">
                <span className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">&infin;</span>
                <span className="block text-[#999] text-xs uppercase tracking-wider mt-1 font-body">{t.passion}</span>
              </div>
              <div className="about-stat">
                <span className="font-display text-3xl md:text-4xl font-bold text-[#1a1a1a]">100%</span>
                <span className="block text-[#999] text-xs uppercase tracking-wider mt-1 font-body">{t.dedication}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
