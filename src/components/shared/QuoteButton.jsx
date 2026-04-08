import { Link } from 'react-router-dom'

export default function QuoteButton({ label = 'Get a Free Quote', variant = 'primary', className = '' }) {
  const base = 'inline-flex items-center justify-center px-8 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2'
  const variants = {
    primary: 'bg-gold text-richblack border-2 border-gold hover:bg-gold-dark hover:border-gold-dark',
    secondary: 'bg-transparent text-gold border-2 border-gold hover:bg-gold hover:text-richblack',
    ghost: 'bg-transparent text-cream border border-cream/40 hover:border-cream hover:text-white',
  }

  return (
    <Link to="/get-quote" className={`${base} ${variants[variant]} ${className}`}>
      {label}
    </Link>
  )
}
