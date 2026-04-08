import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Heart, Briefcase, PartyPopper, Sparkles, Tent, ArrowRight } from 'lucide-react'
import { services } from '../data/services'
import QuoteButton from '../components/shared/QuoteButton'

const iconMap = { Heart, Briefcase, PartyPopper, Sparkles, Tent }

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Catering Services | Weddings, Corporate, Events | The Catering Inc.</title>
        <meta name="description" content="The Catering Inc. offers premium catering for weddings, corporate events, birthdays, Indian occasions and bulk outdoor gatherings in Gurgaon and across India." />
      </Helmet>

      {/* Page Hero */}
      <section className="py-20 bg-canvas text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-gold text-xs font-bold tracking-widest uppercase mb-4" style={{ fontFamily: 'var(--font-body)' }}>What We Do</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 600, color: '#FDF8EE', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Catering for Every Occasion
          </h1>
          <p className="mt-6 text-stone-sand text-lg leading-relaxed" style={{ fontFamily: 'var(--font-body)' }}>
            From intimate ceremonies to grand celebrations — Chef Gautam's team brings two decades of mastery to every event.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-page">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Heart
            return (
              <div key={service.id} className="bg-cream border border-stone-sand p-8 md:p-10 hover:shadow-[0_8px_40px_rgba(240,180,20,0.12)] transition-shadow duration-500">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0 flex items-start">
                    <div className="w-14 h-14 border border-stone-sand flex items-center justify-center">
                      <Icon size={28} strokeWidth={1} style={{ color: '#F0B414' }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ fontFamily: 'var(--font-body)', color: '#B5621E' }}>{service.tagline}</p>
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: '#1A1200', marginBottom: '0.75rem' }}>
                      {service.title}
                    </h2>
                    <p className="text-sm leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>{service.description}</p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {service.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm" style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}>
                          <span style={{ color: '#F0B414', flexShrink: 0, marginTop: '2px' }}>✦</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={service.to}
                      className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase border-b pb-0.5 transition-colors duration-200"
                      style={{ fontFamily: 'var(--font-body)', color: '#C8860A', borderColor: '#C8860A' }}
                    >
                      Learn More <ArrowRight size={12} strokeWidth={1} />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ background: 'linear-gradient(135deg, #1A1200 0%, #3D2E1A 100%)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 600, color: '#FDF8EE', marginBottom: '1rem' }}>
            Not sure which service fits your event?
          </h2>
          <p className="mb-8 text-base" style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}>
            Reach out and we will help you find the right approach for your occasion.
          </p>
          <QuoteButton label="Get a Free Quote" variant="primary" />
        </div>
      </section>
    </>
  )
}
