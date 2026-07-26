import React from 'react';

const MenuIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export default function AdminHeader({ setIsMobileOpen, isDesktopCollapsed, setIsDesktopCollapsed }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30 shadow-sm sticky top-0">
      <div className="flex items-center">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 -ml-2 mr-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Open sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button>

        {/* Desktop collapse button */}
        <button
          className="hidden lg:flex p-2 -ml-2 mr-4 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => setIsDesktopCollapsed(!isDesktopCollapsed)}
          aria-label="Toggle sidebar"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}