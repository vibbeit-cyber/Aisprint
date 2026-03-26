'use client'

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/components/providers/AuthProvider"
import { useRouter } from "next/navigation"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import GeneralTab from "@/components/dashboard/GeneralTab"
import CoursesTab from "@/components/dashboard/CoursesTab"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GeneralTab />
          <CoursesTab />
        </div>
      </main>
    </div>
  )
}


