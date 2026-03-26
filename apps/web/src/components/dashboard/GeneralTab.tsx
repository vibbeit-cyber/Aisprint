'use client'

import StatCard from './StatCard'
import GlassCard from './GlassCard'
import ProgressBar from './ProgressBar'

export default function GeneralTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 text-center">
          <div className="text-3xl mb-2">📚</div>
          <h3 className="font-bold">Courses Enrolled</h3>
          <div className="text-2xl font-bold text-brand-600">2</div>
          <p className="text-sm text-gray-500">+1 this month</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl mb-2">📈</div>
          <h3 className="font-bold">Progress</h3>
          <div className="text-2xl font-bold text-green-600">75%</div>
          <p className="text-sm text-gray-500">on track</p>
        </div>
        <div className="glass-card p-6 text-center">
          <div className="text-3xl mb-2">⏰</div>
          <h3 className="font-bold">Next Session</h3>
          <div className="text-2xl font-bold text-blue-600">Tomorrow 2PM</div>
          <p className="text-sm text-gray-500">1h ago</p>
        </div>
      </div>

      
      <GlassCard>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upcoming Milestone</h3>
          <div className="flex items-center gap-3">
            <ProgressBar value={75} />
            <span>Complete ML Fundamentals Module</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

