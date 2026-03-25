import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { designProjects, designCategoryLabels } from '../../data/design'
import { ArrowRight } from 'lucide-react'
import { useIsMobile } from '../../hooks/useMediaQuery'
import { useLanguage } from '../../context/LanguageContext'

export default function DesignSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.design-section-num', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: '.design-section-num', start: 'top 85%' } })
      gsap.fromTo('.design-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.design-heading', start: 'top 85%' } })

      if (!isMobile && scrollContainerRef.current && containerRef.current) {
        const scrollWidth = scrollContainerRef.current.scrollWidth
        const viewportWidth = window.innerWidth
        gsap.to(scrollContainerRef.current, {
          x: -(scrollWidth - viewportWidth + 100),
          ease: 'none',
          scrollTrigger: { trigger: containerRef.current, start: 'top top', end: () => `+=${scrollWidth - viewportWidth + 100}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [isMobile])

  return (
    <section ref={sectionRef} id="design" className="relative py-32 md:py-40">
      <div className="px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Section number */}
          <div className="design-section-num opacity-0 flex items-center gap-4 mb-12">
            <span className="font-display text-[80px] md:text-[120px] font-bold leading-none text-[#1a1a1a]/[0.06] select-none">
              04
            </span>
          </div>

          <h2 className="design-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-4">{t.designHeading}</h2>
          <p className="text-[#999] text-base md:text-lg font-body mb-12 max-w-xl">{t.designSubtitle}</p>
        </div>
      </div>

      {!isMobile ? (
        <div ref={containerRef} className="relative h-screen">
          <div ref={scrollContainerRef} className="flex items-center gap-8 h-full pl-12 pr-[50vw]">
            {designProjects.map((project) => (
              <div key={project.id} className="flex-shrink-0 w-[60vw] max-w-[900px] group">
                <div className="card overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className="text-xs text-white/50 uppercase tracking-widest font-body mb-2 block">{designCategoryLabels[project.category]}</span>
                      <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-white/60 text-sm font-body max-w-md">{project.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex-shrink-0 w-[40vw] max-w-[500px] flex items-center justify-center">
              <div className="text-center">
                <p className="text-[#ccc] font-display text-xl tracking-tight mb-4">{t.moreProjects}</p>
                <ArrowRight className="text-[#ddd] mx-auto" size={32} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-6 space-y-6">
          {designProjects.map((project) => (
            <div key={project.id} className="card overflow-hidden">
              <div className="aspect-[16/10] overflow-hidden relative">
                <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-xs text-white/50 uppercase tracking-widest font-body mb-1 block">{designCategoryLabels[project.category]}</span>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{project.title}</h3>
                  <p className="text-white/60 text-sm font-body">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
