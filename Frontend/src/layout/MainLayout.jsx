import Header from '../Components/header/Header'
import React from 'react'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}
