// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user_type, setUserType] = useState(() => localStorage.getItem('user_type') || 'user');
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    setToken(null);
    setUser(null);
    setUserType('user'); // Reset to default
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp * 1000;
        
        if (tokenExp < Date.now()) {
          throw new Error("Token expired");
        }

        // Update user from token while preserving user_type
        setUser(prevUser => ({
          ...prevUser,
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        }));
      } catch (error) {
        console.error("Invalid or expired token:", error);
        logout();
      }
    }
  }, [token, logout]);

  const login = (authData) => {
    const decoded = jwtDecode(authData.token);
    const role = decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    // Save token and user_type to storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user_type', role);
    
    // Update state
    setToken(authData.token);
    setUserType(role);
    setUser({
      id: decoded.userId,
      email: decoded.email,
      role: role,
    });

    // Navigation based on user_type (active user type)
    switch (role.toLowerCase()) {
      case 'admin':
        navigate('/admin-dashboard');
        break;
      case 'doctor':
        navigate('/doctor-dashboard');
        console.log("Navigating to doctor dashboard");
        break;
      default:
        navigate('/doctor-dashboard');
    }
  };

  // Function to update user type (for role switching)
  const updateUserType = (newType) => {
    localStorage.setItem('user_type', newType);
    setUserType(newType);
  };

  const value = { user, token, user_type, login, logout, updateUserType };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};