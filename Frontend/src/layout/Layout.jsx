import React from 'react'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
    </div>
  )
}

export default Layout