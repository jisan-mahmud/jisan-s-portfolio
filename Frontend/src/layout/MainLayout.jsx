import Header from '../Components/header/Header'
import CodeAnimation from '../Components/CodeAnimation'
import React from 'react'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <CodeAnimation />
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
