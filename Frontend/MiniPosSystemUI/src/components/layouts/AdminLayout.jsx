import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toast"


export default function AdminLayout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-gray-900 overflow-hidden">
      {/* Sidebar Component */}
      <AdminSidebar 
        isMobileOpen={isMobileOpen} 
        setIsMobileOpen={setIsMobileOpen}
        isDesktopCollapsed={isDesktopCollapsed}
      />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white/50 relative">
        <AdminHeader 
          setIsMobileOpen={setIsMobileOpen}
          isDesktopCollapsed={isDesktopCollapsed}
          setIsDesktopCollapsed={setIsDesktopCollapsed}
        />
        
        {/* Main scrollable content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="mx-auto max-w-8xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[500px]"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
         <Toaster />
      </div>
    </div>
  );
}