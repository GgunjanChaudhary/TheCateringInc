import { Helmet } from 'react-helmet-async'
import { Check, Star, Phone, MessageCircle, Clock, FileText, Tag, RotateCcw } from 'lucide-react'
import { useState } from 'react'

const services = [
  {
    title: 'Office Lunches & Daily Catering',
    description:
      'Recurring daily lunches, monthly team meals and office pantry management. Hot, fresh and punctually delivered — every single day. Dietary labels on every tray.',
  },
  {
    title: 'Product Launches & Press Events',
    description:
      'High-table service, curated canape menus, barista-style beverage counters and immaculate presentation for events where your brand impression is everything.',
  },
  {
    title: 'Annual Days & Award Nights',
    description:
      'Gala dinners, cocktail receptions, seated banquets for leadership and large employee gatherings — service standard equal to a 5-star banquet hall.',
  },
  {
    title: 'Team Events & Offsites',
    description:
      'Energising team lunches, offsite retreats, outdoor team days. We handle location logistics, field kitchen setup, and full service wherever your team is.',
  },
]

const keyFeatures = [
  {
    icon: Clock,
    title: 'On-Time Delivery, Guaranteed',
    body: 'We know a corporate schedule waits for no one. Delivery windows are strict and our logistics team plans every route meticulously. Your lunch break starts on time.',
  },
  {
    icon: Tag,
    title: 'Dietary Labels on All Dishes',
    body: 'Every dish is clearly labelled — Vegetarian, Non-Vegetarian, Jain, Contains Nuts, Contains Dairy. Inclusive catering for diverse teams, without the guesswork.',
  },
  {
    icon: FileText,
    title: 'Invoice & GST Billing Support',
    body: 'Structured billing with full GST invoicing, company-name invoices, and detailed line-item breakdowns. Seamless for your finance and procurement teams.',
  },
  {
    icon: RotateCcw,
    title: 'Repeat Booking Discounts',
    body: 'Regular corporate clients receive preferential pricing, priority scheduling and a dedicated account manager. The more you work with us, the better the value.',
  },
]

const clients = [
  'PepsiCo',
  'IKEA',
  'Adani Group',
  'JLL',
  'Genpact',
  'Skill India',
  'Union Bank of India',
  'Ministry of Panchayati Raj',
]

const testimonials = [
  {
    name: 'Prateek Sharma',
    role: 'Head of Administration, JLL India',
    quote:
      "We've been working with The Catering Inc. for our Gurgaon office events for over two years. The food quality is consistently excellent and the team is extremely professional. They handled our 500-person annual day without a single hiccup.",
    rating: 5,
  },
  {
    name: 'Meenakshi Verma',
    role: 'Senior HR Manager, Genpact',
    quote:
      "Chef Gautam's team understood our dietary diversity from day one — we have employees with Jain, vegan and gluten-free requirements. Every event has been seamlessly managed. Highly recommended.",
    rating: 5,
  },
]

export default function CorporateCatering() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    eventType: '',
    headcount: '',
    eventDate: '',
    deliveryAddress: '',
    notes: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // TODO: connect to EmailJS or Formspree for actual email delivery
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Corporate enquiry submitted:', formData)
  }

  return (
    <>
      <Helmet>
        <title>Corporate Catering in Gurgaon | The Catering Inc.</title>
        <meta
          name="description"
          content="Professional corporate catering in Gurgaon by Chef Gautam Chaudhry. Office lunches, product launches, annual days — on-time, GST-billed, dietary-labelled. Trusted by PepsiCo, IKEA, Adani."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(160deg, #1A1200 0%, #3D2E1A 45%, #1A1200 100%)' }}
        />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 75% 40%, #F0B414 0%, transparent 50%), radial-gradient(circle at 25% 70%, #C8860A 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
          >
            The Catering Inc. — Corporate
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
            Catering That Reflects the Standard of Your Organisation
          </h1>
          <p
            className="mb-4 italic"
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
              color: '#F0B414',
            }}
          >
            "Professional precision. Culinary excellence. Every engagement."
          </p>
          <p
            className="mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '1.05rem' }}
          >
            From daily office lunches to high-profile product launches, we deliver with the discipline
            and quality your corporate reputation demands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919560459999"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              <Phone size={16} />
              Speak to Our Corporate Team
            </a>
            <a
              href="#corporate-enquiry"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase border transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', borderColor: '#F0B414', color: '#F0B414' }}
            >
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              What We Cater
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Corporate Events We Specialise In
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc, i) => (
              <div
                key={svc.title}
                className="flex gap-5 p-7 border"
                style={{ borderColor: '#D4C5A9', background: '#FFFDF7' }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center text-sm font-bold"
                  style={{ background: '#F0B414', color: '#1A1200', fontFamily: 'var(--font-body)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3
                    className="mb-2 text-lg"
                    style={{ fontFamily: 'var(--font-display)', color: '#1A1200', fontWeight: 600 }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="leading-relaxed text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                  >
                    {svc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Built for Business
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              What Makes Us the Right Corporate Partner
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-7 border"
                style={{ borderColor: '#3D2E1A', background: '#3D2E1A' }}
              >
                <feat.icon size={28} color="#F0B414" className="mb-5" />
                <h3
                  className="mb-3 text-base"
                  style={{ fontFamily: 'var(--font-display)', color: '#FDF8EE', fontWeight: 600 }}
                >
                  {feat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
                >
                  {feat.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Clients */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Trusted By
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Organisations That Trust Us
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto text-sm"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              From Fortune 500 companies to government ministries — our corporate client list speaks
              to the standard we maintain.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {clients.map((client) => (
              <span
                key={client}
                className="px-5 py-2.5 text-sm font-bold tracking-wide border"
                style={{
                  fontFamily: 'var(--font-body)',
                  borderColor: '#F0B414',
                  color: '#1A1200',
                  background: '#FFFDF7',
                }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4" style={{ background: '#FFFDF7' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Client Voices
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              What Our Corporate Clients Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 border"
                style={{ borderColor: '#D4C5A9', background: '#FDF8EE' }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#F0B414" color="#F0B414" />
                  ))}
                </div>
                <p
                  className="mb-6 leading-relaxed italic"
                  style={{ fontFamily: 'var(--font-accent)', color: '#3D2E1A', fontSize: '1.05rem' }}
                >
                  "{t.quote}"
                </p>
                <div>
                  <p
                    className="font-bold text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: '#1A1200' }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="corporate-enquiry" className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Get a Proposal
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Corporate Catering Enquiry
            </h2>
            <p
              className="mt-4 text-sm leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9' }}
            >
              Fill in your requirements and our corporate team will send a tailored proposal within
              24 hours.
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
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
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
                  Your Name
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  placeholder="Contact person name"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
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
                    background: '#FDF8EE',
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
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="official@company.com"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
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
                  Event Type
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
                    borderColor: '#D4C5A9',
                    color: '#1A1200',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <option value="">Select event type</option>
                  <option value="office-lunch">Office Lunch / Daily Catering</option>
                  <option value="product-launch">Product Launch / Press Event</option>
                  <option value="annual-day">Annual Day / Award Night</option>
                  <option value="team-event">Team Event / Offsite</option>
                  <option value="conference">Conference / Seminar</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  Headcount
                </label>
                <input
                  type="number"
                  name="headcount"
                  value={formData.headcount}
                  onChange={handleChange}
                  placeholder="Number of attendees"
                  className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                  style={{
                    background: '#FDF8EE',
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
                Event Date
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FDF8EE',
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
                Delivery / Venue Address
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                rows={2}
                placeholder="Full address including city and pin code"
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FDF8EE',
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
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                placeholder="Dietary requirements, cuisine preferences, service style..."
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200 resize-none"
                style={{
                  background: '#FDF8EE',
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
              Send My Corporate Enquiry
            </button>
          </form>

          <p
            className="mt-6 text-center text-xs"
            style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
          >
            Prefer direct contact?{' '}
            <a href="tel:+919560459999" className="underline" style={{ color: '#F0B414' }}>
              +91 9560459999
            </a>{' '}
            |{' '}
            <a
              href="https://wa.me/919560459999"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#F0B414' }}
            >
              WhatsApp
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
