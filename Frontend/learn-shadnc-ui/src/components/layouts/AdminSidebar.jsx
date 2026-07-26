import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ProductsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const LogoutIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

const navItems = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/products', label: 'Products', icon: ProductsIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
];

export default function AdminSidebar({ isMobileOpen, setIsMobileOpen, isDesktopCollapsed }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out
        lg:relative
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        ${/* isDesktopCollapsed ? 'lg:w-20 lg:opacity-100 lg:border-r-0 lg:translate-x-0' : 'lg:w-64 lg:translate-x-0' */ ''}
        ${isDesktopCollapsed ? 'lg:w-0 lg:overflow-hidden lg:opacity-0 lg:border-r-0 lg:-translate-x-full' : 'lg:w-64 lg:translate-x-0'}
        w-64 flex flex-col shadow-sm
      `}
    >
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
        <div className={`flex items-center gap-2 overflow-hidden transition-all duration-300 ${isDesktopCollapsed ? 'w-0 opacity-0 lg:hidden' : 'w-auto opacity-100'}`}>
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
             A
           </div>
           <span className="font-bold text-xl text-gray-800 whitespace-nowrap">
             Admin UI
           </span>
        </div>
        <div className={`flex items-center justify-center ${isDesktopCollapsed ? 'hidden lg:flex w-full' : 'hidden'}`}>
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
             A
           </div>
        </div>

        <button 
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 rounded-md transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileOpen(false)} // Close sidebar on mobile after click
            className={({ isActive }) => `
              flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group
              ${isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            {({ isActive }) => (
              <>
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 flex flex-col gap-2">
        <button 
          className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 text-red-600 hover:bg-red-50 hover:text-red-700 group ${isDesktopCollapsed ? 'lg:justify-center' : ''}`}
        >
          <LogoutIcon className="w-5 h-5 flex-shrink-0 transition-transform group-hover:-translate-x-1" />
          <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isDesktopCollapsed ? 'lg:hidden opacity-0 w-0 overflow-hidden !ml-0' : 'opacity-100 w-auto'}`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}
