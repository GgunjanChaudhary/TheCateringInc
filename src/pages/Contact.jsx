import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const IconFacebook = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to EmailJS or Formspree for actual email delivery
    alert('Thank you for reaching out. We will be in touch shortly.')
    setForm({ name: '', phone: '', message: '' })
  }

  return (
    <>
      <Helmet>
        <title>Contact The Catering Inc. | Gurgaon | +91 9560459999</title>
        <meta name="description" content="Contact The Catering Inc. by Chef Gautam Chaudhry. Call +91 9560459999, WhatsApp us, or fill our contact form. Based in Gurgaon, serving Delhi NCR and beyond." />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Reach Us</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Let's Talk About Your Event
          </h1>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#1A1200', marginBottom: '2rem' }}>
              Contact Information
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone-sand flex items-center justify-center flex-shrink-0">
                  <Phone size={16} strokeWidth={1} style={{ color: '#F0B414' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Phone</p>
                  <a href="tel:+919560459999" className="text-sm font-bold transition-colors duration-200 hover:text-gold" style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}>
                    +91 9560459999
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone-sand flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>WhatsApp</p>
                  <a
                    href="https://wa.me/919560459999?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20catering%20services"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold transition-colors duration-200 hover:text-gold"
                    style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}
                  >
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone-sand flex items-center justify-center flex-shrink-0">
                  <Mail size={16} strokeWidth={1} style={{ color: '#F0B414' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Email</p>
                  <a href="mailto:info@thecateringinc.com" className="text-sm font-bold transition-colors duration-200 hover:text-gold" style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}>
                    {/* TODO: replace with real email address */}
                    info@thecateringinc.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone-sand flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} strokeWidth={1} style={{ color: '#F0B414' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Address</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}>
                    {/* TODO: replace with full street address */}
                    Gurgaon, Haryana — 122001<br />India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 border border-stone-sand flex items-center justify-center flex-shrink-0">
                  <Clock size={16} strokeWidth={1} style={{ color: '#F0B414' }} />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Business Hours</p>
                  <p className="text-sm" style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}>
                    {/* TODO: confirm actual business hours */}
                    Monday – Saturday: 9:00 am – 8:00 pm<br />Sunday: By appointment
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="mt-8 pt-8 border-t border-stone-mist">
              <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Follow Us</p>
              <div className="flex gap-4">
                {/* TODO: replace # with real social media links */}
                <a href="#" aria-label="Instagram" className="w-10 h-10 border border-stone-sand flex items-center justify-center hover:border-gold transition-colors duration-200" style={{ color: '#3D2E1A' }}>
                  <IconInstagram />
                </a>
                <a href="#" aria-label="Facebook" className="w-10 h-10 border border-stone-sand flex items-center justify-center hover:border-gold transition-colors duration-200" style={{ color: '#3D2E1A' }}>
                  <IconFacebook />
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 border border-stone-sand flex items-center justify-center hover:border-gold transition-colors duration-200" style={{ color: '#3D2E1A' }}>
                  <IconYoutube />
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 w-full h-48 bg-stone-mist border border-stone-sand flex items-center justify-center">
              <p className="text-xs text-center px-4" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                {/* TODO: embed real Google Maps iframe here */}
                Google Maps — Gurgaon Kitchen
              </p>
            </div>
          </div>

          {/* Right — Contact Form */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#1A1200', marginBottom: '2rem' }}>
              Send Us a Message
            </h2>
            {/* TODO: connect to EmailJS or Formspree for actual email delivery */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Your Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Full name"
                  className="w-full px-4 py-3 border text-sm focus:outline-none transition-colors duration-200"
                  style={{ backgroundColor: '#FFFDF7', borderColor: '#D4C5A9', color: '#1A1200', fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border text-sm focus:outline-none transition-colors duration-200"
                  style={{ backgroundColor: '#FFFDF7', borderColor: '#D4C5A9', color: '#1A1200', fontFamily: 'var(--font-body)' }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your event..."
                  className="w-full px-4 py-3 border text-sm focus:outline-none transition-colors duration-200 resize-none"
                  style={{ backgroundColor: '#FFFDF7', borderColor: '#D4C5A9', color: '#1A1200', fontFamily: 'var(--font-body)' }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[52px]"
                style={{ fontFamily: 'var(--font-body)', backgroundColor: '#F0B414', color: '#1A1200' }}
              >
                Send Message
              </button>
              <p className="text-xs text-center" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                We respond within 24 hours ·{' '}
                <a
                  href="https://wa.me/919560459999?text=Hi%2C%20I'd%20like%20to%20enquire%20about%20catering"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#C8860A', borderBottom: '1px solid #C8860A' }}
                >
                  WhatsApp for urgent enquiries
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
