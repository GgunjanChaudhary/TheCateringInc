import { Helmet } from 'react-helmet-async'
import { useState } from 'react'

const eventTypes = ['Wedding', 'Corporate Event', 'Birthday / Party', 'Indian Occasion (Pooja / Sangeet / Engagement)', 'Bulk / Outdoor', 'Other']
const hearAboutUs = ['Google Search', 'Instagram', 'Facebook', 'WhatsApp', 'Friend / Family Referral', 'Previous Client', 'Other']

export default function GetQuote() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', eventType: '', eventDate: '',
    guests: '', venue: '', budget: '', dietary: [], howHeard: '', notes: ''
  })
  const dietaryOptions = ['Vegetarian only', 'Non-vegetarian', 'Jain', 'Vegan', 'Mixed']

  const toggleDietary = (opt) => {
    setForm((f) => ({
      ...f,
      dietary: f.dietary.includes(opt) ? f.dietary.filter((d) => d !== opt) : [...f.dietary, opt]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to EmailJS or Formspree for actual email delivery
    alert('Thank you! We will send you a customised quote within 24 hours.')
  }

  const inputStyle = { backgroundColor: '#FFFDF7', borderColor: '#D4C5A9', color: '#1A1200', fontFamily: 'var(--font-body)' }
  const labelStyle = { fontFamily: 'var(--font-body)', color: '#6B5A45' }

  return (
    <>
      <Helmet>
        <title>Get a Free Catering Quote | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Request a free catering quote from The Catering Inc. — weddings, corporate, Indian occasions, bulk events. Response within 24 hours." />
      </Helmet>

      <section className="py-20 bg-canvas text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Let's Begin</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Get a Free Quote
          </h1>
          <p className="mt-4 text-stone-sand" style={{ fontFamily: 'var(--font-body)' }}>We respond within 24 hours.</p>
        </div>
      </section>

      <section className="py-16 bg-page">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* TODO: connect to EmailJS or Formspree for actual email delivery */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Full Name *</label>
              <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Your name" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
            </div>
            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Phone Number *</label>
              <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+91 XXXXX XXXXX" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Email Address</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
            </div>
            {/* Event Type */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Event Type *</label>
              <select required value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle}>
                <option value="">Select event type</option>
                {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            {/* Date + Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Event Date *</label>
                <input type="date" required value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
                  className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Number of Guests *</label>
                <input type="number" required value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  placeholder="e.g. 200" min="1" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
              </div>
            </div>
            {/* Venue */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Venue / Location</label>
              <input type="text" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="Venue name or city" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
            </div>
            {/* Budget */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Approximate Budget per Plate (₹)</label>
              <input type="text" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="e.g. ₹1,000 – ₹1,500" className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle} />
            </div>
            {/* Dietary */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Dietary Requirements</label>
              <div className="flex flex-wrap gap-3">
                {dietaryOptions.map((opt) => (
                  <button key={opt} type="button" onClick={() => toggleDietary(opt)}
                    className="px-4 py-2 text-xs font-bold tracking-wide border transition-all duration-200 min-h-[44px]"
                    style={{
                      fontFamily: 'var(--font-body)',
                      borderColor: form.dietary.includes(opt) ? '#F0B414' : '#D4C5A9',
                      backgroundColor: form.dietary.includes(opt) ? '#F0B414' : 'transparent',
                      color: form.dietary.includes(opt) ? '#1A1200' : '#3D2E1A',
                    }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {/* How heard */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>How did you hear about us?</label>
              <select value={form.howHeard} onChange={(e) => setForm({ ...form, howHeard: e.target.value })}
                className="w-full px-4 py-3 border text-sm focus:outline-none" style={inputStyle}>
                <option value="">Select an option</option>
                {hearAboutUs.map((h) => <option key={h} value={h}>{h}</option>)}
              </select>
            </div>
            {/* Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold tracking-widest uppercase" style={labelStyle}>Additional Notes</label>
              <textarea rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Any special requests, theme, cuisine preferences..."
                className="w-full px-4 py-3 border text-sm focus:outline-none resize-none" style={inputStyle} />
            </div>
            {/* Submit */}
            <button type="submit" className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', backgroundColor: '#F0B414', color: '#1A1200' }}>
              Send My Enquiry
            </button>
            <p className="text-xs text-center" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
              We respond within 24 hours ·{' '}
              <a href="https://wa.me/919560459999?text=Hi%2C%20I'd%20like%20a%20catering%20quote"
                target="_blank" rel="noopener noreferrer" style={{ color: '#C8860A', borderBottom: '1px solid #C8860A' }}>
                WhatsApp us for urgent enquiries
              </a>
            </p>
          </form>
        </div>
      </section>
    </>
  )
}
