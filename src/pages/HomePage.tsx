import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import AboutSection from '../components/sections/AboutSection'
import PhotographySection from '../components/sections/PhotographySection'
import VideoSection from '../components/sections/VideoSection'
import DesignSection from '../components/sections/DesignSection'
import ContactSection from '../components/sections/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navbar transparent />
      <main>
        <HeroSection />
        <AboutSection />
        <PhotographySection />
        <VideoSection />
        <DesignSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
