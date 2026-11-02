export default function Navbar({ menuOpen, setMenuOpen, contactOpen, setContactOpen, headerBoxRef, handleNavClick, handleContactToggle, socialLinks }) {
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

        <nav id="menu" className={`menu ${menuOpen ? 'active' : ''}`}>
          <ul className="navigation">
            <li>
              <a href="/#top" onClick={handleNavClick}>Home</a>
            </li>
            <li>
              <a href="/#worked-with" onClick={handleNavClick}>Recent Work</a>
            </li>
            <li>
              <a href="/#testimonials" onClick={handleNavClick}>Testimonials</a>
            </li>
            <li>
              <a href="/#contact" id="contact-trigger" onClick={handleContactToggle}>Get In Touch</a>
            </li>
          </ul>
        </nav>

        <div className="socials">
          {socialLinks.map((item) => (
            <a key={item.className} className={item.className} href={item.href} target="_blank" rel="noreferrer">
              <i className={item.icon} />
            </a>
          ))}
        </div>
      </div>
    </header>
  )
}
