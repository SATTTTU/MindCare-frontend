import React, { useState } from 'react';
import { Menu, X, Heart, User, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { clearAuthData } from '@/lib/api-client';

const Header = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const token = localStorage.getItem('user_token');
  const role = localStorage.getItem('user_type');
  const isAuthenticated = !!token;

  const navigation = [
    { name: 'Be a  Therapist', href: '/register-as-therapist' },

  ];

  const handleSignOut = () => {
    // Clear all stored auth data
    clearAuthData(); // your custom function
    localStorage.removeItem('userData');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_type');

    // Reset AuthContext state
    setUser(null);
    setToken(null);

    // Redirect to login page
    navigate('/login', { replace: true });
  };


  const dashboardLink =
    role === 'Doctor'
      ? '/doctor-dashboard'
      : role === 'Admin'
        ? '/admin-dashboard'
        : '/user-dashboard';

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="flex justify-between items-center px-4 sm:px-8 md:px-12 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center no-underline">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-sky-400 flex items-center justify-center mr-2">
              <Heart size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-purple-400 to-sky-400 bg-clip-text text-transparent">
              MindCare
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 font-medium hover:text-purple-400 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-slate-500">
              <Shield size={16} className="mr-1" />
              Your data is private
            </div>

            {!isAuthenticated ? (
              <>
                <Link to="/login">
                  <button className="flex items-center px-4 py-2 border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors duration-200">
                    <User size={16} className="mr-2" />
                    Sign In
                  </button>
                </Link>
                <Link to="/register" className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to={dashboardLink}>
                  <button className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200">
                    Go to Dashboard
                  </button>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            aria-label="Toggle menu"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 md:hidden ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="p-4">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button onClick={() => setDrawerOpen(false)}>
              <X size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <hr className="my-4 border-gray-200" />

          {/* Mobile Action Buttons */}
          <div className="space-y-3">
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={() => setDrawerOpen(false)}>
                  <button className="w-full flex items-center justify-center px-4 py-2 border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors duration-200">
                    <User size={16} className="mr-2" />
                    Sign In
                  </button>
                </Link>
                <button
                  className="w-full px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200"
                  onClick={() => setDrawerOpen(false)}
                >
                  Get Started
                </button>
              </>
            ) : (
              <>
                <Link to={dashboardLink} onClick={() => setDrawerOpen(false)}>
                  <button className="w-full px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition-colors duration-200">
                    Go to Dashboard
                  </button>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setDrawerOpen(false);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Header;
