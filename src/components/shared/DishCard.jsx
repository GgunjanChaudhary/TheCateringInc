export default function DishCard({ name, description, image, tag }) {
  return (
    <div className="bg-cream border border-stone-sand hover:shadow-[0_8px_40px_rgba(240,180,20,0.12)] transition-shadow duration-500 group overflow-hidden">
      <div className="overflow-hidden h-48 relative">
        <img
          src={image || `https://source.unsplash.com/400x300/?indian,food,${encodeURIComponent(name)}`}
          alt={`${name} — Indian catering dish by The Catering Inc.`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          // TODO: replace with real dish photos from /public/images/food/
        />
        {tag && (
          <span className="absolute top-3 left-3 bg-gold text-richblack text-xs font-bold tracking-widest uppercase px-2 py-1">
            {tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <h4 className="text-richblack text-xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          {name}
        </h4>
        <p className="text-taupe text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
