import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const serviceLinks = [
  { label: 'Wedding Catering', to: '/services/wedding' },
  { label: 'Corporate Catering', to: '/services/corporate' },
  { label: 'Birthday & Parties', to: '/services/birthday-parties' },
  { label: 'Indian Occasions', to: '/services/indian-occasions' },
  { label: 'Bulk & Outdoor', to: '/services/bulk-outdoor' },
]

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menus', to: '/menus' },
  { label: 'Services', to: '/services', hasDropdown: true },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
    setMobileServicesOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const baseLinkClass =
    'text-white/75 hover:text-gold transition-colors duration-200 text-xs font-bold tracking-widest uppercase pb-0.5'
  const activeLinkClass = 'text-gold border-b border-gold'

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'shadow-[0_2px_30px_rgba(0,0,0,0.6)]' : ''
      }`}
      style={{ background: '#0A0A0A' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/logo.png"
              alt="The Catering Inc. by Chef Gautam Chaudhry"
              className="h-14 w-auto object-contain"
              style={{
                maxWidth: 260,
                filter: 'drop-shadow(0 0 12px rgba(240,180,20,0.5)) brightness(1.15)',
              }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    className={`${baseLinkClass} flex items-center gap-1`}
                    onClick={() => setServicesOpen((o) => !o)}
                    aria-expanded={servicesOpen}
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      strokeWidth={1.5}
                      className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {servicesOpen && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 py-2"
                      style={{
                        background: '#111',
                        border: '1px solid rgba(240,180,20,0.2)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.6)',
                      }}
                    >
                      {serviceLinks.map((s) => (
                        <NavLink
                          key={s.to}
                          to={s.to}
                          className="block px-5 py-2.5 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-gold hover:bg-white/5 transition-colors duration-150"
                        >
                          {s.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `${baseLinkClass} ${isActive ? activeLinkClass : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/get-quote"
              className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 border"
              style={{
                background: '#F0B414',
                color: '#0A0A0A',
                borderColor: '#F0B414',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#F0B414'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F0B414'
                e.currentTarget.style.color = '#0A0A0A'
              }}
            >
              Get a Quote
            </Link>
            <button
              className="lg:hidden p-2 text-white/70 hover:text-gold transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t px-4 pb-6"
          style={{ background: '#111', borderColor: 'rgba(240,180,20,0.15)' }}
        >
          <div className="flex flex-col gap-1 pt-4">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label}>
                  <button
                    className="w-full flex items-center justify-between py-3 text-xs font-bold tracking-widest uppercase text-white/70"
                    onClick={() => setMobileServicesOpen((o) => !o)}
                  >
                    {link.label}
                    <ChevronDown
                      size={16}
                      strokeWidth={1.5}
                      className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 border-l border-gold/40 ml-2 mb-2">
                      {serviceLinks.map((s) => (
                        <NavLink
                          key={s.to}
                          to={s.to}
                          className="block py-2.5 text-xs font-bold tracking-widest uppercase text-white/50 hover:text-gold transition-colors"
                        >
                          {s.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={link.label}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block py-3 text-xs font-bold tracking-widest uppercase ${
                      isActive ? 'text-gold' : 'text-white/70'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <Link
              to="/get-quote"
              className="mt-4 inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase border transition-all duration-300"
              style={{ background: '#F0B414', color: '#0A0A0A', borderColor: '#F0B414' }}
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
