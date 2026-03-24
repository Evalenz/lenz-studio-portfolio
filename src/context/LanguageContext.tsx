import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'en' | 'es'

const translations = {
  en: {
    // Nav
    about: 'About',
    photography: 'Photography',
    filming: 'Filming',
    design: 'Design',
    contact: 'Contact',

    // Hero
    heroTitle1: 'Bold Ideas That',
    heroTitle2: 'Start With Vision.',
    heroSubtitle: 'We help transform moments into eternal emotions through photography, filming, and creative design.',
    heroCta: 'Get In Touch',
    heroBadge: 'Photography / Filming / Designer',

    // About
    aboutHeading: 'Who is',
    aboutP1: 'LENZ STUDIO is not just a photography and video studio. We are tireless creators, artists who find in each project the opportunity to transform moments into eternal emotions. With over 4 years of experience in the world of image, backed by a lifetime of love for cameras and visual art.',
    aboutP2: 'Photography has always been our refuge, our way of connecting with the world and freezing emotions in time. That camera was our window to the world and our tool to capture the authenticity that characterizes each of our works.',
    aboutP3: 'With technical training in Lighting, Capture and Image Processing, we combine professional knowledge with natural creativity to perfect our art and confidently tackle projects of all kinds.',
    aboutP4: 'Our versatility defines us. From real estate photography to authentic portraits, weddings with the sensitivity of those who understand that these moments only happen once, events and sports with the energy and precision they require. If you are looking for a team that combines technique, passion, creativity and authenticity to tell your story, LENZ STUDIO is the answer.',
    years: 'Years',
    passion: 'Passion',
    dedication: 'Dedication',

    // Photography
    photoHeading: 'Photography',
    all: 'All',
    realEstate: 'Real Estate',
    portraits: 'Portraits',
    weddings: 'Weddings',
    eventsSports: 'Events & Sports',
    view: 'View',

    // Video
    videoHeading: 'Filming',
    comingSoon: 'Coming Soon',

    // Design
    designHeading: 'Design',
    designSubtitle: 'Posters, flyers, web design, and app interfaces — creative solutions for every need.',
    moreProjects: 'More projects coming soon',

    // Contact
    contactHeading1: 'Let\'s Work',
    contactHeading2: 'Together',
    contactText: 'Have a project in mind? We would love to hear your idea and help you make it a reality. Every project is unique and deserves personalized attention.',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    tellUs: 'Tell us about your project...',
    sendMessage: 'Send Message',
  },
  es: {
    // Nav
    about: 'Nosotros',
    photography: 'Fotografia',
    filming: 'Video',
    design: 'Diseno',
    contact: 'Contacto',

    // Hero
    heroTitle1: 'Ideas Audaces Que',
    heroTitle2: 'Nacen Con Vision.',
    heroSubtitle: 'Transformamos momentos en emociones eternas a traves de la fotografia, el video y el diseno creativo.',
    heroCta: 'Contactanos',
    heroBadge: 'Fotografia / Video / Diseno',

    // About
    aboutHeading: 'Quienes somos en',
    aboutP1: 'LENZ STUDIO no es solo un estudio de fotografia y video. Somos creadores incansables, artistas que encuentran en cada proyecto la oportunidad de transformar momentos en emociones eternas. Con mas de 4 anos de experiencia en el mundo de la imagen, respaldados por toda una vida de amor por las camaras y el arte visual.',
    aboutP2: 'Desde siempre, la fotografia fue nuestro refugio, nuestra manera de conectar con el mundo y de congelar emociones en el tiempo. Esa camara fue nuestra ventana al mundo y nuestra herramienta para captar la autenticidad que caracteriza cada uno de nuestros trabajos.',
    aboutP3: 'Con formacion tecnica en Iluminacion, Captacion y Tratamiento de la Imagen, combinamos conocimiento profesional con creatividad natural para perfeccionar nuestro arte y afrontar con confianza proyectos de todo tipo.',
    aboutP4: 'Nuestra versatilidad nos define. Desde fotografias de inmuebles hasta retratos cargados de autenticidad, bodas con la sensibilidad de quien entiende que esos momentos solo ocurren una vez, eventos y deportes con la energia y precision que requieren. Si buscas un equipo que combine tecnica, pasion, creatividad y autenticidad para contar tu historia, LENZ STUDIO es la respuesta.',
    years: 'Anos',
    passion: 'Pasion',
    dedication: 'Dedicacion',

    // Photography
    photoHeading: 'Fotografia',
    all: 'Todo',
    realEstate: 'Inmuebles',
    portraits: 'Retratos',
    weddings: 'Bodas',
    eventsSports: 'Eventos y Deportes',
    view: 'Ver',

    // Video
    videoHeading: 'Video',
    comingSoon: 'Proximamente',

    // Design
    designHeading: 'Diseno',
    designSubtitle: 'Carteles, flyers, diseno web e interfaces de apps — soluciones creativas para cada necesidad.',
    moreProjects: 'Mas proyectos proximamente',

    // Contact
    contactHeading1: 'Trabajemos',
    contactHeading2: 'Juntos',
    contactText: 'Tienes un proyecto en mente? Nos encantaria conocer tu idea y ayudarte a hacerla realidad. Cada proyecto es unico y merece una atencion personalizada.',
    yourName: 'Tu Nombre',
    yourEmail: 'Tu Email',
    tellUs: 'Cuentanos sobre tu proyecto...',
    sendMessage: 'Enviar Mensaje',
  },
} as const

type Translations = typeof translations['en']

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
  t: translations.es,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
