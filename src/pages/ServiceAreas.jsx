import { Helmet } from 'react-helmet-async'
import { MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'

const areas = [
  { city: 'Gurgaon', note: 'Base kitchen & primary service area' },
  { city: 'Delhi', note: 'Full service coverage' },
  { city: 'Noida', note: 'Full service coverage' },
  { city: 'Faridabad', note: 'Full service coverage' },
  { city: 'Ghaziabad', note: 'Full service coverage' },
  { city: 'Greater Noida', note: 'Full service coverage' },
  { city: 'Jaipur', note: 'Available for select events' },
  { city: 'Ahmedabad', note: 'Available for select events' },
  { city: 'Bangalore', note: 'Available for select events' },
  { city: 'Moradabad', note: 'Available for select events' },
  { city: 'Meerut', note: 'Available for select events' },
  { city: 'Sambhal', note: 'Available for select events' },
  { city: 'Chandigarh', note: 'Available for select events' },
  { city: 'Lucknow', note: 'Available for select events' },
  { city: 'Dubai', note: 'International — select events' },
  { city: 'Turkey (Antalya)', note: 'International — select events' },
]

export default function ServiceAreas() {
  return (
    <>
      <Helmet>
        <title>Catering Service Areas | Gurgaon, Delhi NCR & Across India | The Catering Inc.</title>
        <meta name="description" content="The Catering Inc. serves Gurgaon, Delhi, Noida, Faridabad, Jaipur, Bangalore, Ahmedabad and internationally. Contact us if you don't see your city." />
      </Helmet>

      {/* Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Where We Serve</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            Service Areas
          </h1>
          <p className="mt-6 text-stone-sand text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            Based in Gurgaon, we serve events across Delhi NCR, major Indian cities, and select international destinations.
          </p>
        </div>
      </section>

      {/* Area Grid */}
      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>Cities We Cover</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200' }}>
              From Gurgaon to the World
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-16">
            {areas.map((area) => (
              <div
                key={area.city}
                className="flex flex-col items-center justify-center text-center p-5 bg-cream border border-stone-sand hover:border-gold hover:shadow-[0_4px_20px_rgba(240,180,20,0.1)] transition-all duration-300"
              >
                <MapPin size={16} strokeWidth={1} style={{ color: '#F0B414', marginBottom: '0.5rem' }} />
                <p className="text-sm font-bold" style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}>{area.city}</p>
                <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>{area.note}</p>
              </div>
            ))}
          </div>

          {/* Not in your area */}
          <div className="bg-cream border border-stone-sand p-10 text-center">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 500, color: '#1A1200', marginBottom: '1rem' }}>
              Don't see your city?
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-xl mx-auto" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
              We have catered events across India and internationally. If your location isn't listed, reach out — we may still be able to help, especially for larger events where logistics can be arranged.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+919560459999"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase border-2 min-h-[44px] transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)', borderColor: '#F0B414', color: '#F0B414' }}
              >
                <Phone size={14} strokeWidth={1} /> Call Us
              </a>
              <Link
                to="/get-quote"
                className="inline-flex items-center justify-center px-6 py-3 text-xs font-bold tracking-widest uppercase min-h-[44px] transition-all duration-300"
                style={{ fontFamily: 'var(--font-body)', backgroundColor: '#F0B414', color: '#1A1200' }}
              >
                Send an Enquiry
              </Link>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-12">
            <div className="w-full h-72 bg-stone-mist border border-stone-sand flex items-center justify-center">
              <p className="text-xs font-bold tracking-widest uppercase text-center px-4" style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}>
                {/* TODO: embed real Google Maps iframe here */}
                Google Maps — Base Kitchen, Gurgaon<br />
                <span className="font-normal normal-case">// TODO: replace with real Google Maps embed</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
