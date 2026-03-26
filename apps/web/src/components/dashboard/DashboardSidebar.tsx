'use client'

interface SidebarTab<T = string> {
  id: T
  label: string
  icon: string
}

interface DashboardSidebarProps<T = string> {
  tabs: SidebarTab<T>[]
  activeTab: T
  onTabChange: (tabId: T) => void
}

export default function DashboardSidebar<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
}: DashboardSidebarProps<T>) {
  return (
    <div className="w-72 glass-card shadow-floating h-fit sticky top-24 hover-scale">
      <nav className="p-6">
        <ul className="space-y-3">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => onTabChange(tab.id)}
                className={`group w-full flex items-center gap-4 px-5 py-4 text-left rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-white/90 backdrop-blur-md ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-brand-500/20 to-purple-500/20 text-brand-700 border-2 border-brand-200/50 shadow-lg shadow-brand-500/10 -translate-y-1 scale-[1.02]'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  activeTab === tab.id ? 'bg-gradient-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/25' : 'bg-gray-100/50'
                }`}>
                  <span className={`text-xl transition-transform duration-300 ${activeTab === tab.id ? 'scale-110 drop-shadow-lg' : ''}`}>
                    {tab.icon}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-lg block">{tab.label}</span>
                  <div className={`h-1 w-12 rounded-full mt-1 transition-all duration-300 ${
                    activeTab === tab.id ? 'bg-gradient-to-r from-brand-500 to-brand-600 scale-x-100' : 'bg-gray-200 scale-x-0'
                  } origin-left`}></div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
