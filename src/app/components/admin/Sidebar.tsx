'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTachometerAlt,
  FaList,
  FaTag,
  FaLayerGroup,
  FaBox,
  FaQuestionCircle,
  FaEnvelope,
  FaNewspaper,
  FaBars,
  FaTimes,
  FaChevronRight,
} from 'react-icons/fa';

const menuItems = [
  { href: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard', color: 'from-blue-500 to-cyan-500' },
  { href: '/dashboard/navbar-category', icon: FaList, label: 'Navbar Category', color: 'from-purple-500 to-pink-500' },
  { href: '/dashboard/category', icon: FaTag, label: 'Category', color: 'from-orange-500 to-red-500' },
  { href: '/dashboard/sub-category', icon: FaLayerGroup, label: 'Sub Category', color: 'from-green-500 to-emerald-500' },
  { href: '/dashboard/products', icon: FaBox, label: 'Products', color: 'from-blue-500 to-indigo-500' },
  { href: '/dashboard/product-enquiry', icon: FaQuestionCircle, label: 'Product Enquiry', color: 'from-yellow-500 to-orange-500' },
  { href: '/dashboard/contact-enquiry', icon: FaEnvelope, label: 'Contact Enquiry', color: 'from-pink-500 to-rose-500' },
  { href: '/dashboard/newsletter-enquiry', icon: FaNewspaper, label: 'Newsletter', color: 'from-teal-500 to-cyan-500' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-72 h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 flex flex-col shadow-2xl`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDM0djItaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6bTAtNHYyaDJ2LTJoLTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        {/* Logo Section */}
        <div className="relative z-10 p-6 border-b border-slate-800/50">
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <span className="text-white font-black text-xl">D</span>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Dahuva</h1>
              <p className="text-xs text-slate-400 font-medium">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="relative z-10 flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-4 mb-4">
            Main Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                  active
                    ? 'bg-gradient-to-r ' + item.color + ' text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {/* Active Indicator */}
                {active && (
                  <div className="absolute left-0 w-1.5 h-8 bg-white rounded-r-full"></div>
                )}
                
                {/* Icon with Background */}
                <div className={`relative ${active ? 'bg-white/20' : 'bg-slate-800/50 group-hover:bg-slate-800'} p-2.5 rounded-lg transition-all duration-300`}>
                  <Icon
                    className={`w-4 h-4 transition-transform duration-300 ${
                      active ? 'scale-110' : 'group-hover:scale-110'
                    }`}
                  />
                </div>
                
                <span className="font-semibold text-sm flex-1">{item.label}</span>
                
                {/* Arrow Indicator */}
                <FaChevronRight 
                  className={`w-3 h-3 transition-all duration-300 ${
                    active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                />
                
                {/* Hover Glow Effect */}
                {!active && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Info with Gradient */}
        <div className="relative z-10 p-4 border-t border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm">
          <div className="p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <p className="text-xs text-slate-400 font-medium">System Online</p>
            </div>
            <p className="text-xs text-slate-500">
              v1.0.0 • © 2024 Dahuva Dubai
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-30 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
      `}</style>
    </>
  );
}
