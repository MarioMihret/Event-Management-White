import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Settings, Bell } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth(); // Assuming logout is a function from useAuth hook

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null; // If no user, return nothing

  return (
    <div className="relative" ref={menuRef}>
      {/* User Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
      >
        <div className="relative">
          <User className="w-5 h-5 text-purple-400" />
          {/* Notification dot */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
        </div>
        <span className="text-white">{user.name}</span>
      </button>

      {/* User Menu Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-56 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg py-2 
        transform transition-all duration-200 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        {/* User Info */}
        <div className="px-4 py-2 border-b border-white/10">
          <div className="text-sm text-gray-400">Signed in as</div>
          <div className="text-white font-medium">{user.name}</div>
        </div>

        {/* Menu Items */}
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5">
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>
        <button className="w-full flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-white/5">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        {/* Logout Button */}
        <div className="border-t border-white/10 mt-2 pt-2">
          <button
            onClick={logout} // Assuming logout function exists in your auth hook
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-white/5"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
