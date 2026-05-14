import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, X } from 'lucide-react';
import Logo from '../Logo';

export default function DashboardSidebar({ 
  isMobileMenuOpen, setIsMobileMenuOpen, 
  navItems, activeTab, setActiveTab, 
  setIsProfilePanelOpen, handleLogout 
}) {
  return (
    <>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-[#fdfcf6] border-r-2 border-black/10 z-[110] transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="text-2xl font-black uppercase italic tracking-tighter text-black">FitTrack</span>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-black">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveTab(item.label);
                  if (item.label === 'Profile') setIsProfilePanelOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all
                  ${activeTab === item.label 
                    ? 'bg-black text-white shadow-xl shadow-black/10 translate-x-2' 
                    : 'text-gray-400 hover:bg-black/5 hover:text-black hover:translate-x-1'}
                `}
              >
                <item.icon size={20} className={activeTab === item.label ? 'text-red-600' : ''} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="pt-8 mt-8 border-t-2 border-black/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
