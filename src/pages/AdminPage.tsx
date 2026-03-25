import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, LogOut } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { portfolioCategories } from '../data/portfolioCategories'
import Navbar from '../components/layout/Navbar'

const ADMIN_PASSWORD = 'lenz2024'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('lenz-admin-auth') === 'true'
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(portfolioCategories[0]?.slug ?? '')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('lenz-admin-auth', 'true')
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('lenz-admin-auth')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const names = Array.from(files).map((f) => f.name)
    setUploadedFiles((prev) => [...prev, ...names])
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 px-6 md:px-12 min-h-screen">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
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

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tighter text-[#1a1a1a] mb-12">
            {t.adminTitle}
          </h1>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-6 max-w-sm">
              <div>
                <label className="block text-sm text-[#666] font-body mb-2">{t.adminPassword}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent border-b border-[#1a1a1a]/10 focus:border-[#1a1a1a]/40 py-3 text-[#1a1a1a] outline-none transition-colors font-body"
                  required
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2 font-body">Incorrect password</p>
                )}
              </div>
              <button type="submit" className="btn-primary" data-cursor="hover">
                {t.adminLogin}
              </button>
            </form>
          ) : (
            <div className="space-y-8">
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[#999] hover:text-[#1a1a1a] transition-colors font-body text-sm"
                data-cursor="hover"
              >
                <LogOut size={16} />
                {t.adminLogout}
              </button>

              {/* Upload section */}
              <div className="card p-8 space-y-6">
                <h2 className="font-display text-xl font-bold text-[#1a1a1a]">{t.adminUpload}</h2>

                {/* Category selector */}
                <div>
                  <label className="block text-sm text-[#666] font-body mb-2">{t.adminCategory}</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-white border border-[#1a1a1a]/10 rounded-lg px-4 py-3 text-[#1a1a1a] font-body outline-none focus:border-[#1a1a1a]/30 transition-colors"
                  >
                    {portfolioCategories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {t[cat.labelKey] || cat.slug}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File input */}
                <div>
                  <label className="block text-sm text-[#666] font-body mb-2">{t.adminSelectFiles}</label>
                  <label
                    className="flex items-center justify-center gap-3 w-full py-8 border-2 border-dashed border-[#1a1a1a]/10 rounded-xl hover:border-[#1a1a1a]/30 transition-colors cursor-pointer"
                    data-cursor="hover"
                  >
                    <Upload size={20} className="text-[#999]" />
                    <span className="text-[#999] font-body text-sm">{t.adminSelectFiles}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Uploaded files list */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-[#666] font-body">
                      {uploadedFiles.length} file(s) selected:
                    </p>
                    <ul className="space-y-1">
                      {uploadedFiles.map((name, i) => (
                        <li key={i} className="text-sm text-[#1a1a1a]/70 font-body pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#1a1a1a]/20 before:-translate-y-1/2">
                          {name}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-[#999] font-body italic mt-4">
                      Note: Upload functionality requires a backend server. Files are listed locally for preview only.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
