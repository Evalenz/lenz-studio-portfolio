import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SmoothScrollProvider } from './context/SmoothScrollContext'
import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/ui/CustomCursor'
import GrainOverlay from './components/ui/GrainOverlay'
import LoadingScreen from './components/ui/LoadingScreen'
import HomePage from './pages/HomePage'
import GalleryPage from './pages/GalleryPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <BrowserRouter>
      <LanguageProvider>
        <SmoothScrollProvider>
          <CustomCursor />
          <GrainOverlay />
          <LoadingScreen onComplete={handleLoadComplete} />

          <div
            className={loaded ? 'opacity-100' : 'opacity-0'}
            style={{ transition: 'opacity 0.5s ease' }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery/:category" element={<GalleryPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
        </SmoothScrollProvider>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
