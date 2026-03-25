import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import { Send, ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const { t } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-heading', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: '.contact-heading', start: 'top 85%' } })
      gsap.fromTo('.contact-content', { opacity: 0, y: 40 }, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: '.contact-content', start: 'top 85%' } })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Subtle top divider */}
        <div className="w-12 h-[1px] bg-[#1a1a1a]/10 mb-16" />

        <h2 className="contact-heading font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-[#1a1a1a] mb-16">
          {t.contactHeading1} <span className="text-[#999]">{t.contactHeading2}</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="contact-content space-y-8">
            <p className="text-[#666] text-lg font-body leading-relaxed">{t.contactText}</p>
            <div className="space-y-4">
              <a href="mailto:hello@lenzstudio.com" className="group flex items-center gap-3 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors font-body" data-cursor="hover">
                <span className="text-lg">hello@lenzstudio.com</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors font-body" data-cursor="hover">
                <InstagramIcon size={18} />
                <span>@lenzstudio</span>
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-content space-y-8">
            <input type="text" placeholder={t.yourName} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-[#1a1a1a]/10 focus:border-[#1a1a1a]/40 py-4 text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors font-body text-base" required />
            <input type="email" placeholder={t.yourEmail} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-[#1a1a1a]/10 focus:border-[#1a1a1a]/40 py-4 text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors font-body text-base" required />
            <textarea placeholder={t.tellUs} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full bg-transparent border-b border-[#1a1a1a]/10 focus:border-[#1a1a1a]/40 py-4 text-[#1a1a1a] placeholder-[#ccc] outline-none transition-colors font-body text-base resize-none" required />
            <button type="submit" className="btn-primary" data-cursor="hover">
              {t.sendMessage}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
