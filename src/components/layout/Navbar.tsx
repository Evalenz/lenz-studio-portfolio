import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useSmoothScroll } from '../../context/SmoothScrollContext'
import { useLanguage } from '../../context/LanguageContext'
import { gsap } from '../../lib/gsap'
import { cn } from '../../lib/utils'

interface NavbarProps {
  transparent?: boolean
}

export default function Navbar({ transparent = false }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollTo } = useSmoothScroll()
  const { lang, setLang, t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'

  const navLinks = [
    { id: 'about', label: t.about },
    { id: 'photography', label: t.photography },
    { id: 'video', label: t.filming },
    { id: 'design', label: t.design },
    { id: 'contact', label: t.contact },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      gsap.fromTo(
        '.mobile-nav-link',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out' }
      )
    }
  }, [menuOpen])

  const handleNavClick = (id: string) => {
    if (isHome) {
      scrollTo(`#${id}`)
    } else {
      navigate(`/#${id}`)
    }
    setMenuOpen(false)
  }

  const handleLogoClick = () => {
    if (isHome) {
      scrollTo(0)
    } else {
      navigate('/')
    }
  }

  // Determine colors: if transparent mode and NOT scrolled, use white text
  const useWhiteText = transparent && !scrolled

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-[#f5f5f0]/80 backdrop-blur-xl border-b border-[#1a1a1a]/5'
            : transparent
              ? 'bg-transparent'
              : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <button
            onClick={handleLogoClick}
            className={cn(
              'font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-60',
              useWhiteText ? 'text-white' : 'text-[#1a1a1a]'
            )}
            data-cursor="hover"
          >
            LENZ STUDIO<sup className="text-[8px] ml-0.5 align-super">&reg;</sup>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={cn(
                  'text-sm tracking-wide font-body transition-colors',
                  useWhiteText
                    ? 'text-white/60 hover:text-white'
                    : 'text-[#1a1a1a]/50 hover:text-[#1a1a1a]'
                )}
                data-cursor="hover"
              >
                {link.label}
              </button>
            ))}

            {/* Language switcher */}
            <div className={cn(
              'flex items-center gap-1 ml-4 border rounded-full overflow-hidden',
              useWhiteText ? 'border-white/20' : 'border-[#1a1a1a]/10'
            )}>
              <button
                onClick={() => setLang('es')}
                className={cn(
                  'px-3 py-1.5 text-xs font-body tracking-wide transition-all',
                  lang === 'es'
                    ? useWhiteText
                      ? 'bg-white text-[#1a1a1a]'
                      : 'bg-[#1a1a1a] text-[#f5f5f0]'
                    : useWhiteText
                      ? 'text-white/40 hover:text-white/70'
                      : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70'
                )}
                data-cursor="hover"
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={cn(
                  'px-3 py-1.5 text-xs font-body tracking-wide transition-all',
                  lang === 'en'
                    ? useWhiteText
                      ? 'bg-white text-[#1a1a1a]'
                      : 'bg-[#1a1a1a] text-[#f5f5f0]'
                    : useWhiteText
                      ? 'text-white/40 hover:text-white/70'
                      : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70'
                )}
                data-cursor="hover"
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              'md:hidden p-2',
              useWhiteText ? 'text-white' : 'text-[#1a1a1a]'
            )}
            data-cursor="hover"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-[#f5f5f0]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 transition-all duration-500 md:hidden',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => handleNavClick(link.id)}
            className="mobile-nav-link font-display text-3xl font-bold text-[#1a1a1a]/80 hover:text-[#1a1a1a] py-3 tracking-tight transition-colors"
          >
            {link.label}
          </button>
        ))}

        {/* Mobile language switcher */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setLang('es')}
            className={cn(
              'px-4 py-2 text-sm font-body rounded-full border transition-all',
              lang === 'es'
                ? 'bg-[#1a1a1a] text-[#f5f5f0] border-[#1a1a1a]'
                : 'border-[#1a1a1a]/20 text-[#1a1a1a]/50'
            )}
          >
            Espanol
          </button>
          <button
            onClick={() => setLang('en')}
            className={cn(
              'px-4 py-2 text-sm font-body rounded-full border transition-all',
              lang === 'en'
                ? 'bg-[#1a1a1a] text-[#f5f5f0] border-[#1a1a1a]'
                : 'border-[#1a1a1a]/20 text-[#1a1a1a]/50'
            )}
          >
            English
          </button>
        </div>
      </div>
    </>
  )
}
