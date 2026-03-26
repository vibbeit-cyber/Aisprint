'use client'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon?: string
}

export default function StatCard({ title, value, change, icon }: StatCardProps) {
  return (
    <div className="glass-card p-6 text-center hover:shadow-xl transition-shadow border">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
      <h3 className="font-semibold text-gray-700 mb-3">{title}</h3>
      {change && (
        <p className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-orange-600'}`}>
          {change}
        </p>
      )}
    </div>
  )
}

