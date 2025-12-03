'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaSignOutAlt, FaUser, FaBell, FaSearch, FaCog, FaChevronDown } from 'react-icons/fa';

export default function DashboardHeader() {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications, setNotifications] = useState(3);

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      router.push('/admin');
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-950 border-b border-slate-800 shadow-2xl backdrop-blur-xl bg-opacity-90">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500"></div>
      
      <div className="flex items-center justify-between px-8 py-4">
        {/* Left Section - Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative group">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-hover:text-cyan-400 transition-colors w-4 h-4" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-6">
          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all duration-300 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
                  <FaUser size={18} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-slate-950 rounded-full"></div>
              </div>
              
              <div className="text-left hidden md:block">
                <p className="text-sm font-semibold text-white">Admin User</p>
                <p className="text-xs text-slate-400">admin@dahuva.com</p>
              </div>
              
              <FaChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                ></div>
                <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="p-4 bg-gradient-to-br from-slate-900 to-slate-800 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                        <FaUser size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">Admin User</p>
                        <p className="text-xs text-slate-400">admin@dahuva.com</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-lg transition-all duration-200 group font-medium"
                    >
                      <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
