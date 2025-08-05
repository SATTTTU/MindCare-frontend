// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { saveUserData, getToken, clearAuthData } from '@/lib/api-client'; // Import your specific functions

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state by reading from localStorage
  // The 'user' state holds the rich object needed for navigation
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });
  
  // The 'token' state is initialized using your custom getToken function
  const [token, setToken] = useState(getToken);
  const navigate = useNavigate();

  // Logout uses your custom clearAuthData function
  const logout = useCallback(() => {
    clearAuthData(); // Your function to clear all tokens
    localStorage.removeItem('userData'); // Also clear our rich user object
    setUser(null);
    setToken(null);
    navigate('/login');
  }, [navigate]);

  // This effect runs on load to validate the existing token
  useEffect(() => {
    if (token) {
      try {
        if (jwtDecode(token).exp * 1000 < Date.now()) {
          throw new Error("Token has expired");
        }
      } catch (error) {
        console.error("Session validation failed:", error);
        logout();
      }
    }
  }, [token, logout]);

  /**
   * THE DEFINITIVE LOGIN FUNCTION
   * It uses both your `saveUserData` and also saves the full object for itself.
   */
  const login = (result) => {
    const userPayload = result.user;
    const tokenPayload = result.token;

    // 1. Use your existing system to save the token under the correct role-based key
    saveUserData(userPayload.role, tokenPayload);

    // 2. ALSO save the full user object for our context's state and refresh persistence
    localStorage.setItem('userData', JSON.stringify(userPayload));

    // 3. Update React state, which triggers re-renders
    setUser(userPayload);
    setToken(tokenPayload);
    
    // 4. Perform smart navigation based on the full user object
    const { role, doctorInfo } = userPayload;

    if (role.toLowerCase() === 'admin') {
      navigate('/admin-dashboard');
      return;
    }
    
    if (doctorInfo) {
      switch (doctorInfo.applicationStatus.toLowerCase()) {
        case 'approved': navigate('/doctor-dashboard'); break;
        case 'rejected': navigate('/application-rejected'); break;
        case 'pending': navigate('/application-review'); break;
        default: navigate('/register-as-therapist'); break;
      }
    } else {
      // User who has not yet applied to be a doctor
      navigate('/register-as-therapist');
    }
  };

  // The value provided by the context
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