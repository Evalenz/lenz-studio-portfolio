import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from '../../lib/gsap'
import { photos, type PhotoCategory } from '../../data/photography'
import { useLanguage } from '../../context/LanguageContext'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { cn } from '../../lib/utils'

const categoryKeys: (PhotoCategory | 'all')[] = ['all', 'real-estate', 'portraits', 'weddings', 'events-sports']

export default function PhotographySection() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory | 'all'>('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const categoryLabels: Record<string, string> = {
    all: t.all,
    'real-estate': t.realEstate,
    portraits: t.portraits,
    weddings: t.weddings,
    'events-sports': t.eventsSports,
  }

  const filteredPhotos = activeCategory === 'all' ? photos : photos.filter((p) => p.category === activeCategory)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.photo-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.photo-heading', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('.photo-item')
    gsap.fromTo(items, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out' })
  }, [activeCategory])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  return (
    <section ref={sectionRef} id="photography" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Subtle top divider */}
        <div className="w-12 h-[1px] bg-[#1a1a1a]/10 mb-16" />

        <h2 className="photo-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-12">
          {t.photoHeading}
        </h2>

        <div className="flex flex-wrap gap-3 mb-12">
          {categoryKeys.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-5 py-2 rounded-full text-sm font-body tracking-wide transition-all duration-300',
                activeCategory === cat ? 'bg-[#1a1a1a] text-[#f5f5f0]' : 'bg-[#1a1a1a]/5 text-[#666] hover:bg-[#1a1a1a]/10 hover:text-[#1a1a1a]'
              )}
              data-cursor="hover"
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={cn('photo-item group relative overflow-hidden rounded-xl cursor-pointer', photo.height > photo.width ? 'row-span-2' : '')}
              onClick={() => openLightbox(index)}
              data-cursor="hover"
            >
              <div className={cn('w-full bg-[#eaeae5]', photo.height > photo.width ? 'aspect-[3/4]' : 'aspect-[4/3]')}>
                <img src={photo.src} alt={photo.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-body tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">{t.view}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filteredPhotos.map((p) => ({ src: p.src, alt: p.alt }))}
        styles={{ container: { backgroundColor: 'rgba(26, 26, 26, 0.95)' } }}
      />
    </section>
  )
}
