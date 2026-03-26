'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import GeneralTab from '@/components/dashboard/GeneralTab'
import CoursesTab from '@/components/dashboard/CoursesTab'
import SettingsTab from '@/components/dashboard/SettingsTab'
import CertificatesTab from '@/components/dashboard/CertificatesTab'
import WishlistTab from '@/components/dashboard/WishlistTab'
import GlassCard from '@/components/dashboard/GlassCard'

type Tab = 'general' | 'courses' | 'certificates' | 'wishlist' | 'settings'

const sidebarTabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'general', label: 'Overview', icon: '📊' },
  { id: 'courses', label: 'My Courses', icon: '📚' },
  { id: 'certificates', label: 'Certificates', icon: '🏆' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
]

export default function DashboardPage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('general')

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="text-center text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/auth/signin')
    return null
  }

  return (
    <>
      {/* Hero Header */}
      <header className="gradient-hero sticky top-0 z-50 shadow-2xl">
        <div className="container-custom">
          <div className="flex items-center justify-between py-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Welcome back {user?.username || user?.name || 'User'}! 👋
              </h1>
              <p className="text-xl text-gray-600 max-w-md">
                Continue your AI learning journey with personalized insights
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="glass-button flex items-center gap-3 p-3 -ml-2 hover:shadow-xl">
                <div className="relative">
                  <img
                    src={user?.profile_image_url || '/logo3.png'}
                    alt="Profile"
                    className="w-12 h-12 rounded-2xl object-cover border-4 border-white/50 shadow-lg ring-2 ring-brand-200/50"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-4 border-white rounded-full ring-2 ring-green-400/30"></div>
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-semibold text-gray-900 capitalize">{user?.username || user?.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-[200px]">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={() => router.push('/')}
                className="btn-primary text-sm px-6 py-3 bg-gradient-to-r from-brand-600 via-brand-500 to-purple-600 hover:from-brand-700 hover:via-brand-600 hover:to-purple-700 shadow-2xl hover:shadow-3xl"
              >
                ← Home
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="gradient-hero min-h-screen">
        <div className="container-custom py-12 lg:py-20">
          <div className="flex gap-10 lg:gap-12">
            {/* Sidebar */}
            <DashboardSidebar
              tabs={sidebarTabs}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <GlassCard className="overflow-hidden">
                <div className="p-2 md:p-8">
                  {activeTab === 'general' && <GeneralTab />}
                  {activeTab === 'courses' && <CoursesTab />}
                  {activeTab === 'certificates' && <CertificatesTab />}
                  {activeTab === 'wishlist' && <WishlistTab />}
                  {activeTab === 'settings' && <SettingsTab />}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
