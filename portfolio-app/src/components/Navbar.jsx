import { useLocation } from 'react-router'

const homeLinks = [
  { label: 'Home', href: '/' },
  { label: 'Software Engineering', href: '/software-engineering' },
  { label: 'BIM/VDC', href: '/bim-vdc' },
  { label: 'Get In Touch', href: '#', contact: true },
]

const projectLinks = (parentPath) => [
  { label: 'Home', href: '/' },
  { label: 'Back to Portfolio', href: parentPath },
  { label: 'Other Projects', href: `${parentPath}#projects` },
  { label: 'Get In Touch', href: '#', contact: true },
]

export default function Navbar({ menuOpen, setMenuOpen, contactOpen, headerBoxRef, handleNavClick, handleContactToggle, socialLinks }) {
  const location = useLocation()
  const currentPath = location.pathname

  let navItems = homeLinks

  if (currentPath === '/software-engineering') {
    navItems = [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/software-engineering#projects' },
      { label: 'BIM/VDC', href: '/bim-vdc' },
      { label: 'Get In Touch', href: '#', contact: true },
    ]
  } else if (currentPath === '/bim-vdc') {
    navItems = [
      { label: 'Home', href: '/' },
      { label: 'Projects', href: '/bim-vdc#projects' },
      { label: 'Software Engineering', href: '/software-engineering' },
      { label: 'Get In Touch', href: '#', contact: true },
    ]
  } else if (currentPath.startsWith('/software-engineering/projects/')) {
    navItems = projectLinks('/software-engineering')
  } else if (currentPath.startsWith('/bim-vdc/projects/')) {
    navItems = projectLinks('/bim-vdc')
  }

  return (
    <header className="header">
      <div ref={headerBoxRef} className={`header-box ${contactOpen ? 'contact-active' : ''}`}>
        <i
          className="fas fa-bars menu-toggle"
          onClick={() => setMenuOpen((current) => !current)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setMenuOpen((current) => !current)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Toggle navigation menu"
        />

        <nav id="menu" className={`menu ${menuOpen ? 'active' : ''}`} aria-label="Main navigation">
          <ul className="navigation">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.contact ? (
                  <a href="#" id="contact-trigger" onClick={(event) => { event.preventDefault(); handleContactToggle(event) }}>
                    {item.label}
                  </a>
                ) : (
                  <a href={item.href} onClick={handleNavClick}>{item.label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="socials">
          {socialLinks.map((item) => (
            <a key={item.className} className={item.className} href={item.href} target="_blank" rel="noreferrer" aria-label={item.className}>
              <i className={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
