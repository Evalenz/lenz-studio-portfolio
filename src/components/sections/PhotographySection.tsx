import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from '../../lib/gsap'
import { useLanguage } from '../../context/LanguageContext'
import { portfolioCategories } from '../../data/portfolioCategories'

function FolderIcon({ label }: { label: string }) {
  return (
    <div className="folder-item group flex flex-col items-center gap-3 cursor-pointer" data-cursor="hover">
      {/* Folder shape */}
      <div className="relative w-full aspect-square max-w-[160px]">
        {/* Tab on top-right */}
        <div className="absolute top-0 right-2 w-[40%] h-[14%] bg-[#2a2a2a] rounded-t-lg" />
        {/* Main folder body */}
        <div className="absolute top-[10%] inset-x-0 bottom-0 bg-[#1a1a1a] rounded-2xl group-hover:bg-[#333] transition-colors duration-300 shadow-lg" />
        {/* Subtle shine on folder */}
        <div className="absolute top-[10%] inset-x-0 h-[30%] bg-gradient-to-b from-white/[0.06] to-transparent rounded-t-2xl pointer-events-none" />
      </div>
      {/* Label */}
      <span className="text-[#1a1a1a] text-xs md:text-sm font-display tracking-wide uppercase text-center group-hover:text-[#666] transition-colors">
        {label}
      </span>
    </div>
  )
}

export default function PhotographySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.photo-section-num', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, scrollTrigger: { trigger: '.photo-section-num', start: 'top 85%' } })
      gsap.fromTo('.photo-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.photo-heading', start: 'top 85%' } })
      gsap.fromTo('.folder-item', { opacity: 0, y: 40, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '.folder-grid', start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFolderClick = (slug: string) => {
    navigate(`/gallery/${slug}`)
  }

  return (
    <section ref={sectionRef} id="photography" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Section number */}
        <div className="photo-section-num opacity-0 flex items-center gap-4 mb-12">
          <span className="font-display text-[80px] md:text-[120px] font-bold leading-none text-[#1a1a1a]/[0.06] select-none">
            02
          </span>
        </div>

        <h2 className="photo-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-16 md:mb-20">
          {t.photoHeading}
        </h2>

        {/* Folder grid — 4x2 */}
        <div className="folder-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-10 max-w-[800px] mx-auto">
          {portfolioCategories.map((cat) => (
            <div key={cat.id} onClick={() => handleFolderClick(cat.slug)}>
              <FolderIcon label={t[cat.labelKey] || cat.slug} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
