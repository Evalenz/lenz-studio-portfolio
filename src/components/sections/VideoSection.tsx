import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { Play } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

const videoPlaceholders = [
  { id: 'v-1', title: 'Wedding Film', category: 'Cinematic' },
  { id: 'v-2', title: 'Event Highlight', category: 'Corporate' },
  { id: 'v-3', title: 'Brand Story', category: 'Commercial' },
  { id: 'v-4', title: 'Music Video', category: 'Creative' },
  { id: 'v-5', title: 'Documentary', category: 'Personal' },
  { id: 'v-6', title: 'Short Film', category: 'Artistic' },
]

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.video-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.video-heading', start: 'top 85%' } })
      gsap.fromTo('.video-card', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: '.video-grid', start: 'top 80%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="video" className="relative py-32 md:py-40 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="video-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-12">
          {t.videoHeading}
        </h2>

        <div className="video-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {videoPlaceholders.map((video) => (
            <div key={video.id} className="video-card group relative aspect-video rounded-xl overflow-hidden bg-[#eaeae5] border border-[#1a1a1a]/5 hover:border-[#1a1a1a]/15 transition-colors duration-500">
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-4 p-6">
                <div className="w-14 h-14 rounded-full border border-[#1a1a1a]/15 flex items-center justify-center group-hover:border-[#1a1a1a]/30 group-hover:scale-110 transition-all duration-300">
                  <Play size={20} className="text-[#1a1a1a]/30 group-hover:text-[#1a1a1a]/60 ml-0.5" />
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-semibold text-[#1a1a1a]/80 mb-1">{video.title}</h3>
                  <span className="text-xs text-[#999] uppercase tracking-wider font-body">{video.category}</span>
                </div>
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-[#999] font-body border border-[#1a1a1a]/10 px-3 py-1 rounded-full">{t.comingSoon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
