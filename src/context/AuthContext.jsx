// src/context/AuthContext.js (Correct)
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
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
        setUser({
          id: decoded.userId,
          email: decoded.email,
          role: decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        });
      } catch (error) {
        console.error("Invalid or expired token:", error);
        logout();
      }
    }
  }, [token, logout]);

  const login = (authData) => {
  const decoded = jwtDecode(authData.token);
  localStorage.setItem('token', authData.token);
  setToken(authData.token);
  setUser({
    id: decoded.userId,
    email: decoded.email,
    role: decoded.role || decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
  });

  if (decoded.role === 'Admin') {
    navigate('/admin-dashboard');
  } else {
    navigate('/user-dashboard');
  }
};


  const value = { user, token, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};