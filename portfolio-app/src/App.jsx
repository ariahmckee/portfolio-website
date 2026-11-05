import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
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
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  const headerBoxRef = useRef(null)

  useEffect(() => {
    document.body.classList.toggle('home-page', isHomePage)
    document.body.classList.toggle('portfolio-page', !isHomePage)

    return () => {
      document.body.classList.remove('home-page', 'portfolio-page')
    }
  }, [isHomePage])

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (headerBoxRef.current && !headerBoxRef.current.contains(event.target)) {
        setContactOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)
    return () => document.removeEventListener('click', handleDocumentClick)
  }, [])

const scrollToProjects = (behavior = 'smooth') => {
  const projects = document.getElementById('projects')
  const navbar = headerBoxRef.current

  if (!projects || !navbar) return

  const targetTop = navbar.getBoundingClientRect().bottom + 12

  const desiredScrollY =
    window.scrollY +
    projects.getBoundingClientRect().top -
    targetTop

  window.scrollTo({
    top: desiredScrollY,
    behavior,
  })
}

const handleNavClick = (event) => {
  setMenuOpen(false)
  setContactOpen(false)

  const href = event.currentTarget.getAttribute('href')

  if (!href?.endsWith('#projects')) return

  event.preventDefault()

  const destination = href.split('#')[0]

  if (location.pathname === destination) {
    scrollToProjects()
  } else {
    navigate(`${destination}#projects`)
  }
}

useEffect(() => {
  if (location.hash !== '#projects') return

  const frame = requestAnimationFrame(() => {
    scrollToProjects('instant')
  })

  return () => cancelAnimationFrame(frame)
}, [location.pathname, location.hash])

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
        headerBoxRef={headerBoxRef}
        handleNavClick={handleNavClick}
        handleContactToggle={handleContactToggle}
        socialLinks={socialLinks}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/software-engineering" element={<SoftwareEngineering />} />
        <Route path="/software-engineering/projects/:projectId" element={<ProjectDetail discipline="software-engineering" />} />
        <Route path="/bim-vdc" element={<BIMVDC />} />
        <Route path="/bim-vdc/projects/:projectId" element={<ProjectDetail discipline="bim-vdc" />} />
        <Route path="*" element={<main className="portfolio-page"><h1>Page not found</h1></main>} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
