import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { gsap } from '../lib/gsap'
import { useLanguage } from '../context/LanguageContext'
import { portfolioCategories } from '../data/portfolioCategories'
import { listPhotos } from '../lib/supabase'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

export default function GalleryPage() {
  const { category } = useParams<{ category: string }>()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const [photos, setPhotos] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const cat = portfolioCategories.find((c) => c.slug === category)
  const label = cat ? (t[cat.labelKey] || cat.slug) : category || ''

  // Load photos from Supabase Storage
  useEffect(() => {
    window.scrollTo(0, 0)
    if (!cat) return

    setLoading(true)
    listPhotos(cat.folder).then((urls) => {
      setPhotos(urls)
      setLoading(false)

      // Animate items in after render
      setTimeout(() => {
        gsap.fromTo(
          '.gallery-item',
          { opacity: 0, y: 40, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out' }
        )
      }, 100)
    })
  }, [category, cat])

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, closeLightbox, goNext, goPrev])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightboxOpen])

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Back button + title */}
          <div className="flex items-center gap-4 mb-12">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-[#1a1a1a]/60 hover:text-[#1a1a1a] transition-colors font-body text-sm"
              data-cursor="hover"
            >
              <ArrowLeft size={18} />
              {t.galleryBack}
            </button>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-16">
            {label}
          </h1>

          {loading ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <Loader2 className="animate-spin text-[#999]" size={32} />
            </div>
          ) : photos.length === 0 ? (
            <div className="flex items-center justify-center min-h-[40vh]">
              <p className="text-[#999] font-body text-lg">{t.galleryEmpty}</p>
            </div>
          ) : (
            /* Masonry-style grid */
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={photo}
                  className="gallery-item opacity-0 break-inside-avoid mb-4 group relative overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => openLightbox(index)}
                  data-cursor="hover"
                >
                  <img
                    src={photo}
                    alt={`${label} ${index + 1}`}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#1a1a1a]/0 group-hover:bg-[#1a1a1a]/30 transition-colors duration-300" />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Custom Lightbox */}
      {lightboxOpen && photos.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10"
            onClick={closeLightbox}
            data-cursor="hover"
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 md:left-8 text-white/40 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            data-cursor="hover"
          >
            <ChevronLeft size={40} />
          </button>

          <img
            src={photos[lightboxIndex]}
            alt={`${label} ${lightboxIndex + 1}`}
            className="max-h-[85vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 md:right-8 text-white/40 hover:text-white transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            data-cursor="hover"
          >
            <ChevronRight size={40} />
          </button>

          <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm font-body tracking-wider">
            {lightboxIndex + 1} / {photos.length}
          </span>
        </div>
      )}
    </>
  )
}
