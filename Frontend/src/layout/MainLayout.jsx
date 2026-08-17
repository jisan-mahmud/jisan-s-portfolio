import Header from '../Components/header/Header'
import CodeAnimation from '../Components/CodeAnimation'
import Footer from '../Components/footer/Footer'
import React from 'react'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div className="relative min-h-screen">
      <CodeAnimation />
      <Header />
      <div className="pt-24">
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}
