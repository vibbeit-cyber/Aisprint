<<<<<<< HEAD
'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  change?: string
  icon: ReactNode
  gradient?: string
}

export default function StatCard({ title, value, change, icon, gradient = 'from-brand-500 to-brand-600' }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`w-16 h-16 mx-auto mb-6 rounded-3xl flex items-center justify-center shadow-floating bg-gradient-to-br ${gradient}`}>
        {icon}
      </div>
      <div className="space-y-2">
        <div className="stat-number">{value}</div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {change && (
          <p className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
            {change} from last week
          </p>
        )}
      </div>
    </div>
  )
}

=======
export default function StatCard({ title, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
    </div>
  )
}
>>>>>>> 5e572c643d79bced6a11623b9a5869b7c25d704f
