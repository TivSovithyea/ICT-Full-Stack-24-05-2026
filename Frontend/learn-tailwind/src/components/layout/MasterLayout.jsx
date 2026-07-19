import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

function MasterLayout() {
  return (
    <div className="app-container min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 p-6"><Outlet /></main>
        <Footer />
    </div>

  )
}

export default MasterLayout