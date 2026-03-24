import { useState, useCallback } from 'react'
import { SmoothScrollProvider } from './context/SmoothScrollContext'
import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/ui/CustomCursor'
import GrainOverlay from './components/ui/GrainOverlay'
import LoadingScreen from './components/ui/LoadingScreen'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import AboutSection from './components/sections/AboutSection'
import PhotographySection from './components/sections/PhotographySection'
import VideoSection from './components/sections/VideoSection'
import DesignSection from './components/sections/DesignSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <LanguageProvider>
      <SmoothScrollProvider>
        <CustomCursor />
        <GrainOverlay />
        <LoadingScreen onComplete={handleLoadComplete} />

        <div
          className={loaded ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.5s ease' }}
        >
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <PhotographySection />
            <VideoSection />
            <DesignSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </SmoothScrollProvider>
    </LanguageProvider>
  )
}

export default App
