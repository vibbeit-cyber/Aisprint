'use client'

interface ProgressBarProps {
  value: number
  max?: number
  label?: string
  color?: string
}

export default function ProgressBar({ value, max = 100, label, color = 'brand' }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between text-sm font-medium">
          <span>{label}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="w-full bg-gray-100 rounded-2xl h-4 shadow-inner">
        <div 
          className={`progress-fill ${color === 'green' ? 'from-green-500 to-emerald-600' : ''}`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

