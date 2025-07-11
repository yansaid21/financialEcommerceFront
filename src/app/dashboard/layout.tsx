import React from 'react'
import Sidebar from '@/components/organisms/Sidebar' 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex font-sans">
      <Sidebar />
      <main className="flex-1 bg-gray-100 text-gray-900 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
