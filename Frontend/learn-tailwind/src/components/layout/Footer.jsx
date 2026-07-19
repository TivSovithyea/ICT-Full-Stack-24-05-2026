import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-200 text-gray-700 mt-6">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2025 My Shop</p>
            <ul className="flex space-x-4 mt-2 md:mt-0">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/terms">Terms</a></li>
            <li><a href="/contact">Contact</a></li>
            </ul>
        </div>
    </footer>

  )
}

export default Footer