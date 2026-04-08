import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

// Inline SVG social icons — lucide-react does not include brand icons
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IconYoutube = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menus', to: '/menus' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'About Us', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const serviceLinks = [
  { label: 'Wedding Catering', to: '/services/wedding' },
  { label: 'Corporate Catering', to: '/services/corporate' },
  { label: 'Birthday & Parties', to: '/services/birthday-parties' },
  { label: 'Indian Occasions', to: '/services/indian-occasions' },
  { label: 'Bulk & Outdoor', to: '/services/bulk-outdoor' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-canvas text-cream-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Column */}
          <div>
            <img
              src="/logo.png"
              alt="The Catering Inc."
              className="h-14 w-auto object-contain mb-4"
              style={{ minWidth: 180, maxWidth: 260 }}
            />
            <p className="text-stone-sand text-sm leading-relaxed mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              Two decades of culinary mastery, delivered to your celebration. Every occasion, crafted with precision and served with grace.
            </p>
            <div className="flex gap-4">
              {/* TODO: replace # with real Instagram, Facebook, YouTube links */}
              <a href="#" aria-label="Instagram" className="text-stone-sand hover:text-gold transition-colors duration-200">
                <IconInstagram />
              </a>
              <a href="#" aria-label="Facebook" className="text-stone-sand hover:text-gold transition-colors duration-200">
                <IconFacebook />
              </a>
              <a href="#" aria-label="YouTube" className="text-stone-sand hover:text-gold transition-colors duration-200">
                <IconYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gold text-xs font-bold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-stone-sand hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-gold text-xs font-bold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-stone-sand hover:text-gold text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-gold text-xs font-bold tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-body)' }}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+919560459999"
                  className="flex items-start gap-3 text-stone-sand hover:text-gold text-sm transition-colors duration-200"
                >
                  <Phone size={16} strokeWidth={1} className="mt-0.5 flex-shrink-0 text-gold" />
                  +91 9560459999
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919560459999?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20catering%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-stone-sand hover:text-gold text-sm transition-colors duration-200"
                >
                  {/* WhatsApp icon inline SVG */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0 text-whatsapp">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@thecateringinc.com"
                  className="flex items-start gap-3 text-stone-sand hover:text-gold text-sm transition-colors duration-200"
                >
                  <Mail size={16} strokeWidth={1} className="mt-0.5 flex-shrink-0 text-gold" />
                  {/* TODO: replace with real email address */}
                  info@thecateringinc.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-stone-sand text-sm">
                <MapPin size={16} strokeWidth={1} className="mt-0.5 flex-shrink-0 text-gold" />
                {/* TODO: replace with full address */}
                Gurgaon, Haryana, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-richblack/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-sand text-xs">
            © {year} The Catering Inc. by Chef Gautam Chaudhry. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/faq" className="text-stone-sand text-xs hover:text-gold transition-colors duration-200">
              FAQ
            </Link>
            <Link to="/service-areas" className="text-stone-sand text-xs hover:text-gold transition-colors duration-200">
              Service Areas
            </Link>
            {/* TODO: create Privacy Policy page and link here */}
            <span className="text-stone-sand text-xs cursor-default">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
