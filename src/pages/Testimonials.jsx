import { Helmet } from 'react-helmet-async'
import TestimonialCard from '../components/shared/TestimonialCard'
import { testimonials } from '../data/testimonials'
import QuoteButton from '../components/shared/QuoteButton'

export default function Testimonials() {
  return (
    <>
      <Helmet>
        <title>Client Reviews & Testimonials | The Catering Inc. Gurgaon</title>
        <meta name="description" content="Read what clients say about The Catering Inc. — weddings, corporate events, Indian occasions and more. Trusted by 1000+ events across India." />
      </Helmet>

      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>Client Stories</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', lineHeight: 1.1 }}>
            What Our Clients Say
          </h1>
          <p className="mt-6 text-stone-sand text-lg" style={{ fontFamily: 'var(--font-body)' }}>
            Over 1,000 events. Thousands of happy guests. Here are a few of their stories.
          </p>
        </div>
      </section>

      <section className="py-20 bg-page">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-center bg-section">
        <div className="max-w-xl mx-auto px-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 600, color: '#1A1200', marginBottom: '1rem' }}>
            Ready to create your story?
          </h2>
          <p className="text-sm mb-8" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
            Join thousands of hosts who trusted us with their most important occasions.
          </p>
          <QuoteButton label="Get a Free Quote" variant="secondary" />
        </div>
      </section>
    </>
  )
}
