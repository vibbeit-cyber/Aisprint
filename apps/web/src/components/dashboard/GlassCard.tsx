'use client'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div className={`glass-card ${hover ? 'hover-scale hover:shadow-3xl hover:-translate-y-1 transition-all duration-500' : ''} ${className}`}>
      {children}
    </div>
  )
}

