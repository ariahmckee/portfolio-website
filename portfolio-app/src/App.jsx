import { useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SoftwareEngineering from './pages/SoftwareEngineering'
import BIMVDC from './pages/BIMVDC'
import ProjectDetail from './pages/ProjectDetail'

const socialLinks = [
  { href: 'https://www.facebook.com', className: 'color-1', icon: 'fab fa-facebook' },
  { href: 'https://www.youtube.com', className: 'color-2', icon: 'fa-brands fa-youtube' },
  { href: 'https://www.x.com', className: 'color-3', icon: 'fa-brands fa-x' },
  { href: 'https://www.instagram.com', className: 'color-4', icon: 'fa-brands fa-instagram' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const headerBoxRef = useRef(null)

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (headerBoxRef.current && !headerBoxRef.current.contains(event.target)) {
        setContactOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

  const handleNavClick = () => {
    setMenuOpen(false)
    setContactOpen(false)
  }

  const handleContactToggle = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setContactOpen((current) => !current)
  }

  return (
    <>
      <Navbar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        contactOpen={contactOpen}
        setContactOpen={setContactOpen}
        headerBoxRef={headerBoxRef}
        handleNavClick={handleNavClick}
        handleContactToggle={handleContactToggle}
        socialLinks={socialLinks}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/software-engineering" element={<SoftwareEngineering />} />
        <Route path="/bim-vdc" element={<BIMVDC />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
