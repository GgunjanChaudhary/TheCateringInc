import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function EventCard({ icon: Icon, title, description, to }) {
  return (
    <div className="bg-cream border border-stone-sand p-8 hover:shadow-[0_8px_40px_rgba(240,180,20,0.15)] transition-all duration-500 group flex flex-col gap-4">
      {Icon && (
        <div className="w-12 h-12 flex items-center justify-center border border-stone-sand group-hover:border-gold transition-colors duration-300">
          <Icon size={24} strokeWidth={1} className="text-gold" />
        </div>
      )}
      <h3 className="text-richblack text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}>
        {title}
      </h3>
      <p className="text-walnut text-sm leading-relaxed flex-1">{description}</p>
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-amber border-b border-amber pb-0.5 hover:text-gold-dark hover:border-gold-dark transition-colors duration-200 self-start"
      >
        Know More <ArrowRight size={12} strokeWidth={1} />
      </Link>
    </div>
  )
}
