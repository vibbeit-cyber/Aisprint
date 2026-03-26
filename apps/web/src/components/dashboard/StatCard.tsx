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

