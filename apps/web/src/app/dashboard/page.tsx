'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import CoursesTab from "@/components/dashboard/CoursesTab"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <CoursesTab />
      </main>
    </div>
  )
}



