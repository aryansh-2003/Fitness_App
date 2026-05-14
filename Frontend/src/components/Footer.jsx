import React from 'react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-[#fdfcf6] text-black border-t border-black/10 flex flex-col min-h-[400px]">
      <div className="flex-1 max-w-[1400px] w-full mx-auto grid grid-cols-1 md:grid-cols-4">
        {/* Left Column */}
        <div className="flex flex-col justify-between p-8 md:p-16 border-b md:border-b-0 md:border-r border-black/10 border-dashed">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">LOCATION</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              500 Terry Francine St<br />
              San Francisco, CA 94158
            </p>
          </div>
          <div className="mt-12">
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">Accessibility Statement</a>
          </div>
        </div>

        {/* Middle Column */}
        <div className="md:col-span-2 flex flex-col justify-between p-8 md:p-16 border-b md:border-b-0 md:border-r border-black/10 border-dashed relative text-center">
          <div className="md:absolute md:top-16 left-1/2 md:-translate-x-1/2 flex items-center justify-center gap-2 mb-12 md:mb-0 w-full">
             <Logo size={24} />
             <span className="font-black italic uppercase tracking-tighter text-xl">FITTRACK</span>
          </div>
          <div className="flex-1 flex flex-col justify-center mt-0 md:mt-24 mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.05] text-black">
              Unlocking human physical potential through synergy of technique, strength, and mindset
            </h2>
          </div>
          <div>
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">Terms & Conditions</a>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col justify-between p-8 md:p-16">
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-4">CONNECT</h3>
            <p className="text-lg text-gray-600 font-medium leading-relaxed">
              Tel 123-456-7890<br />
              info@fittrack.com
            </p>
          </div>
          <div className="mt-12">
            <a href="#" className="text-sm font-bold text-gray-500 hover:text-red-600 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
