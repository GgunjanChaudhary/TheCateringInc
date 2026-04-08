import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Check, Star, Phone, MessageCircle } from 'lucide-react'
import { useState } from 'react'

const included = [
  'Dedicated wedding event manager assigned to you from booking to service',
  'Live counter setups — Chaat, Kebab, Carving Station, Dessert Counter',
  'Full serving staff in formal uniform throughout the event',
  'Crockery, chafing dishes, serving equipment and linen provided',
  'Complimentary menu tasting session for the couple prior to the event',
  'Decoration coordination with your florist and venue team',
  'Separate Jain, vegetarian and non-vegetarian sections maintained',
  'Hygienic field kitchen setup at your venue if required',
  'Post-event cleanup and equipment removal included',
]

const sampleStarters = [
  'Murgh Malai Tikka', 'Seekh Kebab', 'Paneer Tikka', 'Dahi Ke Kebab',
  'Fish Amritsari', 'Vegetable Shammi', 'Achari Mushroom Tikka', 'Tandoori Jhinga',
]

const sampleMains = [
  'Butter Chicken', 'Dal Makhani', 'Shahi Paneer', 'Rogan Josh',
  'Palak Corn', 'Mutton Dum Biryani', 'Vegetable Biryani', 'Laccha Paratha',
]

const sampleDesserts = [
  'Gulab Jamun', 'Rasgulla', 'Shahi Tukda', 'Kulfi Falooda',
  'Gajar Ka Halwa', 'Phirni', 'Malpua', 'Kesar Pista Ice Cream',
]

const pastEvents = [
  {
    id: 1,
    src: '/images/IMG_20201209_184627.jpg',
    caption: 'Grand Reception — 800 Guests, Gurgaon',
  },
  {
    id: 2,
    src: '/images/IMG_20201209_200651.jpg',
    caption: 'Destination Wedding — Rajasthan',
  },
  {
    id: 3,
    src: '/images/IMG_20201209_200904.jpg',
    caption: 'Intimate Ceremony — 120 Guests, Delhi',
  },
  {
    id: 4,
    src: '/images/IMG_20201212_185651.jpg',
    caption: 'Multi-Day Wedding Festivities — Noida',
  },
]

const testimonials = [
  {
    name: 'Priya & Arjun Malhotra',
    event: 'Wedding Reception — March 2024',
    quote:
      "Chef Gautam's team turned our reception into an absolute dream. Every guest came back for seconds, and the live kebab counter was the highlight of the evening. Seamless, professional, and genuinely delicious.",
    rating: 5,
  },
  {
    name: 'Sneha & Rahul Kapoor',
    event: 'Wedding + Sangeet — December 2023',
    quote:
      'We had over 600 guests across two events and the catering was flawless both nights. The staff was incredibly courteous, the food arrived fresh and hot, and Chef Gautam personally checked in before service. Truly 5-star.',
    rating: 5,
  },
]

export default function WeddingCatering() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    weddingDate: '',
    venue: '',
    guests: '',
    cuisine: '',
    budget: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // TODO: connect to EmailJS or Formspree for actual email delivery
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Wedding enquiry submitted:', formData)
  }

  return (
    <>
      <Helmet>
        <title>Wedding Catering in Gurgaon | The Catering Inc.</title>
        <meta
          name="description"
          content="Premium wedding catering in Gurgaon by Chef Gautam Chaudhry. Grand receptions to intimate ceremonies — live counters, full staffing, customised menus. Call +91 9560459999."
        />
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #1A1200 0%, #3D2E1A 40%, #1A1200 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 60%, #F0B414 0%, transparent 55%), radial-gradient(circle at 80% 30%, #C8860A 0%, transparent 55%)',
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
          >
            The Catering Inc. — Weddings
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
            Where Every Course Tells Your Love Story
          </h1>
          <p
            className="mb-4 italic"
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
              color: '#F0B414',
            }}
          >
            "A wedding remembered for a lifetime deserves food worthy of that memory."
          </p>
          <p
            className="mb-10 max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '1.05rem' }}
          >
            From intimate 50-guest ceremonies to grand 2000-guest receptions, Chef Gautam Chaudhry
            brings the mastery of The Oberoi and Radisson to your most special day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919560459999"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{
                fontFamily: 'var(--font-body)',
                background: '#F0B414',
                color: '#1A1200',
              }}
            >
              <Phone size={16} />
              Call to Discuss
            </a>
            <a
              href="#wedding-quote"
              className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase border transition-all duration-300 min-h-[52px]"
              style={{
                fontFamily: 'var(--font-body)',
                borderColor: '#F0B414',
                color: '#F0B414',
              }}
            >
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Our Promise to You
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Why Families Trust Us With Their Weddings
            </h2>
            <p
              className="mt-4 max-w-2xl mx-auto leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', fontSize: '1.05rem' }}
            >
              A wedding is not just an event. It is the convergence of two families, two cultures,
              and decades of love. We approach every wedding with that gravity.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '20+ Years of Wedding Experience',
                body: "Chef Gautam has orchestrated catering at some of India's most prestigious celebrations. His team understands the nuances — from the mehendi morning chai to the grand reception buffet.",
              },
              {
                title: 'Michelin-Recognized Culinary Standard',
                body: 'Trained in kitchens recognised by the Michelin Guide and awarded Top 10 Chefs by Hotelier India, Chef Gautam brings world-class technique to every wedding spread.',
              },
              {
                title: '5-Star Certified Kitchen',
                body: 'Our 3,000 sq ft Gurgaon facility holds a 5-star rating from Equinox Labs, tested across 140 food safety parameters. Every dish begins in a hygienic, certified environment.',
              },
              {
                title: 'Economic Times Award Winner',
                body: "Chef Gautam's entrepreneurial excellence was recognised by the Economic Times — Most Promising Entrepreneur of the Year. That same drive for excellence is in every plate.",
              },
              {
                title: 'Full End-to-End Management',
                body: 'From your first tasting to the last serving, one dedicated event manager handles all coordination — with your venue, your decorator, your timeline. You relax.',
              },
              {
                title: 'Flexible for Every Wedding Style',
                body: 'North Indian classics, South Indian traditions, Jain-compliant menus, continental options — we customise entirely around your families and guests.',
              },
            ].map((item) => (
              <div
                key={item.title}
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
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Complete Service
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Everything Included, Nothing Overlooked
            </h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-4">
                <div
                  className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: '#F0B414' }}
                >
                  <Check size={12} color="#1A1200" strokeWidth={3} />
                </div>
                <span
                  className="leading-relaxed"
                  style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '0.95rem' }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a
              href="https://wa.me/919560459999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 font-bold text-xs tracking-widest uppercase transition-all duration-300 min-h-[52px]"
              style={{ fontFamily: 'var(--font-body)', background: '#F0B414', color: '#1A1200' }}
            >
              <MessageCircle size={16} />
              WhatsApp Us About Your Wedding
            </a>
          </div>
        </div>
      </section>

      {/* Sample Wedding Menu */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              A Taste of the Experience
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Sample Wedding Menu
            </h2>
            <p
              className="mt-4 max-w-xl mx-auto"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45', fontSize: '0.95rem' }}
            >
              Every menu is fully customised. This is simply a glimpse of the culinary world we bring
              to your celebration.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { heading: 'Starters & Live Counters', items: sampleStarters },
              { heading: 'Mains & Breads', items: sampleMains },
              { heading: 'Desserts', items: sampleDesserts },
            ].map((section) => (
              <div
                key={section.heading}
                className="p-8 border"
                style={{ borderColor: '#D4C5A9', background: '#FFFDF7' }}
              >
                <div
                  className="w-8 h-0.5 mb-3"
                  style={{ background: '#F0B414' }}
                />
                <h3
                  className="mb-5 text-xl"
                  style={{ fontFamily: 'var(--font-display)', color: '#1A1200', fontWeight: 600 }}
                >
                  {section.heading}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((dish) => (
                    <li
                      key={dish}
                      className="flex items-center gap-2 text-sm"
                      style={{ fontFamily: 'var(--font-body)', color: '#3D2E1A' }}
                    >
                      <span
                        className="w-1 h-1 rounded-full flex-shrink-0"
                        style={{ background: '#F0B414' }}
                      />
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p
            className="mt-8 text-center text-xs"
            style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
          >
            This is a sample only. Your menu will be built around your preferences, dietary needs,
            and occasion. Book a tasting to explore the full catalogue.
          </p>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="py-20 px-4" style={{ background: '#FFFDF7' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Our Work
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Weddings We've Had the Honour of Serving
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastEvents.map((ev) => (
              <div key={ev.id} className="overflow-hidden group">
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={ev.src}
                    alt={ev.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* TODO: replace Unsplash placeholder with real event photo */}
                  <div
                    className="absolute inset-0 flex items-end p-4"
                    style={{ background: 'linear-gradient(to top, rgba(26,18,0,0.75) 0%, transparent 60%)' }}
                  >
                    <p
                      className="text-xs font-bold tracking-wide"
                      style={{ fontFamily: 'var(--font-body)', color: '#FDF8EE' }}
                    >
                      {ev.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Couple Testimonials */}
      <section className="py-20 px-4" style={{ background: '#FDF8EE' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
            >
              Couples We've Served
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#1A1200',
              }}
            >
              Words From the Couples
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="p-8 border"
                style={{ borderColor: '#D4C5A9', background: '#FFFDF7' }}
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="#F0B414"
                      color="#F0B414"
                    />
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
                    {t.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Quote Form */}
      <section id="wedding-quote" className="py-20 px-4" style={{ background: '#1A1200' }}>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ fontFamily: 'var(--font-body)', color: '#F0B414' }}
            >
              Start the Conversation
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 600,
                color: '#FDF8EE',
              }}
            >
              Request Your Wedding Quote
            </h2>
            <p
              className="mt-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: '#D4C5A9', fontSize: '0.95rem' }}
            >
              Tell us about your wedding and we'll get back to you within 24 hours with a personalised
              proposal.
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
                  placeholder="Bride / Groom name"
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
                  background: '#FDF8EE',
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
                  Wedding Date
                </label>
                <input
                  type="date"
                  name="weddingDate"
                  value={formData.weddingDate}
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
                  Number of Guests
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  placeholder="Approx. guest count"
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
                Venue / Location
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                placeholder="Venue name or city"
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
                Preferred Cuisine Style
              </label>
              <select
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FDF8EE',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select cuisine style</option>
                <option value="north-indian">North Indian</option>
                <option value="south-indian">South Indian</option>
                <option value="continental">Continental</option>
                <option value="mughlai">Mughlai</option>
                <option value="mixed">Mixed / Multi-Cuisine</option>
                <option value="jain">Jain-Compliant</option>
                <option value="other">Other — I'll explain below</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Budget Per Plate (approx.)
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 border focus:outline-none transition-colors duration-200"
                style={{
                  background: '#FDF8EE',
                  borderColor: '#D4C5A9',
                  color: '#1A1200',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <option value="">Select approximate budget per plate</option>
                <option value="below-800">Below ₹800 per plate</option>
                <option value="800-1200">₹800 – ₹1,200 per plate</option>
                <option value="1200-2000">₹1,200 – ₹2,000 per plate</option>
                <option value="2000-3500">₹2,000 – ₹3,500 per plate</option>
                <option value="above-3500">Above ₹3,500 per plate</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-bold tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
              >
                Anything Else We Should Know?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Special dietary needs, theme details, specific dishes you love..."
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
              Send My Wedding Enquiry
            </button>
          </form>

          <p
            className="mt-6 text-center text-xs"
            style={{ fontFamily: 'var(--font-body)', color: '#6B5A45' }}
          >
            Prefer to talk? Call us at{' '}
            <a
              href="tel:+919560459999"
              className="underline"
              style={{ color: '#F0B414' }}
            >
              +91 9560459999
            </a>{' '}
            or{' '}
            <a
              href="https://wa.me/919560459999"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: '#F0B414' }}
            >
              WhatsApp us
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
