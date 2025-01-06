import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, Menu, X } from 'lucide-react';
import NavLink from './NavLink';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-black/95 shadow-lg backdrop-blur-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Calendar className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">EventHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <SearchBar />
            <div className="flex items-center gap-4">
              <NavLink to="/events">Browse Events</NavLink>
              <NavLink to="/organizer">Organize Events</NavLink>
              <ThemeToggle />
            </div>
            <UserMenu />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${
        isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
      }`}>
        <div className="px-4 py-3 space-y-3">
          <SearchBar />
          <NavLink to="/events">Browse Events</NavLink>
          <NavLink to="/organizer">Organize Events</NavLink>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};
export default Navbar; 