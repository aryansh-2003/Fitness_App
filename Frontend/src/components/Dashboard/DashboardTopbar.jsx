import React from 'react';
import { Menu, Bell } from 'lucide-react';
import Logo from '../Logo';

export default function DashboardTopbar({ setIsMobileMenuOpen, setIsProfilePanelOpen, user }) {
  return (
    <div className="lg:hidden fixed top-0 w-full bg-[#fdfcf6]/90 backdrop-blur-md border-b-2 border-black/10 z-30 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsMobileMenuOpen(true)} 
          className="text-black p-1 hover:bg-black/5 rounded-lg transition-colors"
        >
          <Menu size={28} />
        </button>
        <div className="flex items-center gap-2">
          <Logo size={24} />
          <span className="text-xl font-black uppercase italic tracking-tighter text-black">FitTrack</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-black">
          <Bell size={24} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-[#fdfcf6]"></span>
        </button>
        <img
          onClick={() => setIsProfilePanelOpen(true)}
          src={user?.avatar || "https://i.pravatar.cc/150?img=32"}
          alt="User"
          className="w-8 h-8 rounded-full border-2 border-black/10 cursor-pointer hover:scale-105 transition-transform"
        />
      </div>
    </div>
  );
}
