import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-section-num', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: '.about-section-num', start: 'top 85%' } })
      gsap.fromTo('.about-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.about-heading', start: 'top 85%' } })
      gsap.fromTo('.about-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, scrollTrigger: { trigger: '.about-badge', start: 'top 85%' } })
      gsap.fromTo('.about-text', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: '.about-text-container', start: 'top 80%' } })
      gsap.fromTo('.about-stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: '.about-stats', start: 'top 85%' } })
      gsap.fromTo('.about-devices', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2, scrollTrigger: { trigger: '.about-devices', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section number */}
        <div className="about-section-num opacity-0 flex items-center gap-4 mb-12">
          <span className="font-display text-[80px] md:text-[120px] font-bold leading-none text-[#1a1a1a]/[0.06] select-none">
            01
          </span>
        </div>

        {/* EVA LENZ badge */}
        <div className="about-badge opacity-0 mb-8">
          <span className="inline-block bg-[#1a1a1a] text-white text-xs font-display tracking-[0.15em] uppercase px-5 py-2 rounded-full">
            EVA LENZ
          </span>
        </div>

        {/* Heading */}
        <h2 className="about-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-16 md:mb-24">
          {t.aboutHeading} <span className="text-[#999]">LENZ STUDIO</span>?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — Text */}
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

          {/* Right — Device mockups */}
          <div className="about-devices opacity-0 relative flex items-center justify-center min-h-[400px] md:min-h-[500px]">
            {/* Tablet mockup */}
            <div className="relative w-[280px] md:w-[340px] h-[380px] md:h-[460px] bg-[#1a1a1a] rounded-[20px] p-3 shadow-2xl">
              <div className="w-full h-full bg-[#f5f5f0] rounded-[14px] flex flex-col items-center justify-center overflow-hidden relative">
                <img
                  src="/images/logo/logo-dark.png"
                  alt="LENZ STUDIO"
                  className="w-32 md:w-40 opacity-80"
                />
                <span className="text-[#999] text-[10px] tracking-[0.3em] uppercase mt-3 font-body">
                  Creative Studio
                </span>
              </div>
            </div>

            {/* Phone mockup — overlapping */}
            <div className="absolute -right-4 md:right-0 bottom-0 w-[140px] md:w-[170px] h-[260px] md:h-[320px] bg-[#1a1a1a] rounded-[24px] p-2 shadow-2xl z-10">
              <div className="w-full h-full bg-[#f5f5f0] rounded-[20px] flex flex-col items-center justify-center overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-2 w-16 h-4 bg-[#1a1a1a] rounded-full" />
                <img
                  src="/images/logo/logo-dark.png"
                  alt="LENZ STUDIO"
                  className="w-16 md:w-20 opacity-80 mt-4"
                />
                <span className="text-[#999] text-[7px] tracking-[0.2em] uppercase mt-2 font-body">
                  Est. 2020
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
