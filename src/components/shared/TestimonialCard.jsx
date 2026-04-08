import { Star } from 'lucide-react'

export default function TestimonialCard({ name, event, guests, rating = 5, review, month }) {
  return (
    <div className="bg-cream border border-stone-sand p-8 hover:shadow-[0_8px_40px_rgba(240,180,20,0.12)] transition-shadow duration-500 flex flex-col gap-4">
      {/* Stars */}
      <div className="flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={14} strokeWidth={1} className="fill-gold text-gold" />
        ))}
      </div>
      {/* Quote */}
      <p className="text-walnut text-base leading-relaxed italic" style={{ fontFamily: 'var(--font-accent)' }}>
        "{review}"
      </p>
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-stone-sand" />
        <span className="text-gold text-base" style={{ fontFamily: 'var(--font-display)' }}>✦</span>
        <div className="flex-1 h-px bg-stone-sand" />
      </div>
      {/* Client Info */}
      <div>
        <p className="text-richblack font-bold text-sm" style={{ fontFamily: 'var(--font-body)' }}>{name}</p>
        <p className="text-taupe text-xs mt-0.5">{event}{guests ? ` · ${guests} guests` : ''}</p>
        {month && <p className="text-taupe text-xs">{month}</p>}
      </div>
    </div>
  )
}
