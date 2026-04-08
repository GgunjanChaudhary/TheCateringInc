import { Helmet } from 'react-helmet-async'
import { Tent, Users, Zap, Thermometer, Truck, ShieldCheck, Phone } from 'lucide-react'
import { useState } from 'react'

const eventTypes = [
  {
    title: 'Community Feasts',
    description:
      'Neighbourhood celebrations, society gatherings, cultural festivals and community lunches. We understand the communal energy of a shared meal at scale — and we deliver it every time.',
  },
  {
    title: 'Political & Government Events',
    description:
      'Mass gatherings, government functions, public address events. We have the operational capacity and the discretion your event demands. Experienced with government clients including the Ministry of Panchayati Raj.',
  },
  {
    title: 'Temple & Religious Functions',
    description:
      'Langar, bhandara, temple anniversaries, religious melas and pilgrimage gatherings. Pure vegetarian or sattvic preparation, served with the reverence the occasion deserves.',
  },
  {
    title: 'College & Institution Events',
    description:
      'Convocations, freshers, college fests, institutional annual days. High-energy menus for younger crowds, with fast service to keep the energy moving.',
  },
  {
    title: 'Corporate Mass Events',
    description:
      'National sales conferences, pan-India town halls, multi-city product rollouts. We coordinate logistics at scale with the professionalism your leadership team expects.',
  },
  {
    title: 'Outdoor Weddings & Mela-style Receptions',
    description:
      'Grand outdoor wedding receptions, baraat lunches, open-air mela-format celebrations. Full field kitchen, live counters, tent service — managed end to end.',
  },
]

const logistics = [
  {
    icon: Tent,
    title: 'Field Kitchen Setup',
    body: 'We erect a fully functional, hygienically managed kitchen at any outdoor location. No dependency on venue infrastructure — we bring everything.',
  },
  {
    icon: Zap,
    title: 'Generator Backup',
    body: 'Uninterrupted cooking and service, regardless of power conditions at the venue. Our generator fleet ensures no delay, no outage, no compromise.',
  },
  {
    icon: Thermometer,
    title: 'Cold Chain Logistics',
    body: 'Refrigerated transport for all perishables. Our cold chain system ensures that ingredients reach the site at the correct temperature, every time.',
  },
  {
    icon: Truck,
    title: 'Full Equipment Transport',
    body: 'Chafing dishes, serving counters, crockery, utensils, gas cylinders, linen — all transported in our dedicated fleet. Nothing left to chance.',
  },
  {
    icon: Users,
    title: 'Scaled Staffing',
    body: 'Experienced large-event teams trained for high-volume service. We scale staffing precisely to your guest count and event duration.',
  },
  {
    icon: ShieldCheck,
    title: 'Hygiene & Safety',
    body: 'Our 5-star Equinox Labs certified protocols travel with us to every outdoor event. Bulk does not mean compromised safety.',
  },
]

const capacityFacts = [
  { value: '4,500+', label: 'Maximum proven guest capacity in a single event' },
  { value: '500+', label: 'Large-scale events managed to date' },
  { value: '50+', label: 'Outdoor locations served across India' },
  { value: '140+', label: 'Food safety parameters maintained even at scale' },
]

export default function BulkOutdoor() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: '',
    eventDate: '',
    guests: '',
    location: '',
    powerAvailable: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // TODO: connect to EmailJS or Formspree for actual email delivery
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Bulk outdoor enquiry submitted:', formData)
  }

  return (
    <>
      <Helmet>
        <title>Bulk & Outdoor Catering in Gurgaon | The Catering Inc.</title>
        <meta
          name="description"
          content="Bulk and outdoor catering for 500 to 4500+ guests. Community feasts, political events, temple functions, outdoor gatherings. Field kitchen, generator backup. Chef Gautam Chaudhry — +91 9560459999."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(150deg, #1A1200 0%, #3D2E1A 50%, #1A1200 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, #C8860A 0%, transparent 55%), radial-gradient(circle at 75% 40%, #F0B414 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-5">
            <Tent size={40} color="#F0B414" />
          </div>
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
          >
            The Catering Inc. — Bulk & Outdoor
          </p>
          <h1
            className="mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              fontWeight: 600,
              color: '#FDF8EE',
              letterSpacing: '-0.02em',
            }}
          >
            Scale Without Compromise
          </h1>
          <p
            className="mb-4 italic"
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: '#F0B414',
            }}
          >
            "Whether it's 500 or 5,000 — quality is non-negotiable."
          </p>
          <p
            className="mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '1.05rem' }}
          >
            Proven at 4,500+ guests. Full field kitchen, generator backup, cold chain logistics —
            we manage every aspect of large-scale outdoor catering from planning to cleanup.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919560459999"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              <Phone size={16} />
              Discuss Your Event
            </a>
            <a
              href="#bulk-quote"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase border transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', borderColor: '#F0B414', color: '#F0B414' }}
            >
              Request a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Capacity Facts */}
      <section className="py-16 px-4" style={{ background: '#F0B414' }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {capacityFacts.map((fact) => (
              <div key={fact.label} className="text-center">
                <p
                  className="mb-1 font-bold"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 4vw, 3rem)',
                    color: '#1A1200',
                  }}
                >
                  {fact.value}
                </p>
                <p
                  className="text-xs leading-snug"
                  style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}
                >
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              We Cater To
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Events We Excel At
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((ev, i) => (
              <div
                key={ev.title}
                className="p-7 border"
                style={{ borderColor: '#D4C5A9', background: '#FFFDF7' }}
              >
                <div
                  className="w-8 h-0.5 mb-4"
                  style={{ background: '#F0B414' }}
                />
                <h3
                  className="mb-3 text-lg"
                  style={{ fontFamily: 'var(--font-display)', color: '#1A1200', fontWeight: 600 }}
                >
                  {ev.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  {ev.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              End-to-End Management
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Our Outdoor Logistics Infrastructure
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-sm"
              style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
            >
              We don't just cook — we plan, transport, set up and manage the entire operation. You
              focus on your event. We handle the rest.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {logistics.map((item) => (
              <div
                key={item.title}
                className="p-7 border"
                style={{ borderColor: '#3D2E1A', background: '#3D2E1A' }}
              >
                <item.icon size={28} color="#F0B414" className="mb-4" />
                <h3
                  className="mb-3 text-base"
                  style={{ fontFamily: 'var(--font-display)', color: '#FDF8EE', fontWeight: 600 }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="bulk-quote" className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Let's Plan Your Event
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Bulk Catering Enquiry
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Share your event details and we'll get back with a full logistics and pricing proposal.
            </p>
          </div>

          {/* TODO: connect to EmailJS or Formspree for actual email delivery */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FFFDF7',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select event type</option>
                  <option value="community">Community Feast</option>
                  <option value="political">Political / Government Event</option>
                  <option value="temple">Temple / Religious Function</option>
                  <option value="college">College / Institution Event</option>
                  <option value="corporate-mass">Corporate Mass Event</option>
                  <option value="outdoor-wedding">Outdoor Wedding / Reception</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Expected Guest Count
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="e.g. 2000"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Power Available at Venue?
                </label>
                <select
                  name="powerAvailable"
                  value={formData.powerAvailable}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FFFDF7',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select</option>
                  <option value="yes">Yes — stable power available</option>
                  <option value="partial">Partial — needs generator backup</option>
                  <option value="no">No — fully off-grid location</option>
                  <option value="unsure">Not sure</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Event Location
              </label>
              <textarea
                name="location"
                value={formData.location}
                onChange={handleChange}
                rows={2}
                placeholder="City, venue name, or GPS location details"
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FFFDF7',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Menu style, dietary requirements, service duration, any special logistics..."
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FFFDF7',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              Send My Bulk Catering Enquiry
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
