import Axios from "axios";

const COOKIE_KEYS = {
  USER_TYPE: "user_type",
  ADMIN_TOKEN: "admin_token",
  COOK_TOKEN: "doctor_token",
  USER_TOKEN: "user_token",
  ACTIVE_USER: "active_user",
  AUTH_TOKEN: "authToken",
};

// Cookie utility functions
const setCookie = (name, value, options = {}) => {
  try {
    const {
      expires = null,
      maxAge = null,
      path = "/",
      domain = null,
      secure = false,
      sameSite = "lax",
      httpOnly = false
    } = options;

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`;
    }
    
    if (maxAge !== null) {
      cookieString += `; max-age=${maxAge}`;
    }
    
    if (path) {
      cookieString += `; path=${path}`;
    }
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    
    if (secure) {
      cookieString += `; secure`;
    }
    
    if (httpOnly) {
      cookieString += `; httponly`;
    }
    
    cookieString += `; samesite=${sameSite}`;

    document.cookie = cookieString;
    
    // Verify cookie was set
    const savedValue = getCookie(name);
    if (savedValue !== value) {
      throw new Error(`Failed to save ${name} to cookies`);
    }
    return true;
  } catch (error) {
    console.error(`Error saving ${name} to cookies:`, error);
    return false;
  }
};

const getCookie = (name) => {
  try {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
      }
    }
    return null;
  } catch (error) {
    console.error(`Error getting cookie ${name}:`, error);
    return null;
  }
};

const removeCookie = (name, options = {}) => {
  try {
    const { path = "/", domain = null } = options;
    
    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    
    if (path) {
      cookieString += `; path=${path}`;
    }
    
    if (domain) {
      cookieString += `; domain=${domain}`;
    }
    
    document.cookie = cookieString;
    return true;
  } catch (error) {
    console.error(`Error removing cookie ${name}:`, error);
    return false;
  }
};

const safeSetCookie = (key, value, options = {}) => {
  // Set default options for security
  const defaultOptions = {
    maxAge: 86400 * 7, // 7 days
    secure: window.location.protocol === 'https:',
    sameSite: 'strict',
    ...options
  };
  
  return setCookie(key, value, defaultOptions);
};

const safeRemoveCookie = (key, options = {}) => {
  const defaultOptions = {
    path: "/",
    ...options
  };
  
  return removeCookie(key, defaultOptions);
};

function getToken() {
  try {
    const userType = getCookie(COOKIE_KEYS.USER_TYPE);

    if (!userType) {
      // If no user type is set, try to check if any token exists in cookies
      const adminToken = getCookie(COOKIE_KEYS.ADMIN_TOKEN) || getCookie(COOKIE_KEYS.AUTH_TOKEN);
      const cookToken = getCookie(COOKIE_KEYS.COOK_TOKEN);
      const userToken = getCookie(COOKIE_KEYS.USER_TOKEN);

      if (adminToken && adminToken !== "undefined") {
        console.log("Found admin token without user type, setting user type to admin");
        safeSetCookie(COOKIE_KEYS.USER_TYPE, "admin");
        safeSetCookie(COOKIE_KEYS.ACTIVE_USER, "admin");
        return adminToken;
      }

      if (cookToken && cookToken !== "undefined") {
        console.log("Found cook token without user type, setting user type to cook");
        safeSetCookie(COOKIE_KEYS.USER_TYPE, "cook");
        safeSetCookie(COOKIE_KEYS.ACTIVE_USER, "cook");
        return cookToken;
      }
      
      if (userToken && userToken !== "undefined") {
        console.log("Found user token without user type, setting user type to user");
        safeSetCookie(COOKIE_KEYS.USER_TYPE, "user");
        safeSetCookie(COOKIE_KEYS.ACTIVE_USER, "user");
        return userToken;
      }
      
      return null;
    }

    if (userType === "admin") {
      const token = getCookie(COOKIE_KEYS.ADMIN_TOKEN) || getCookie(COOKIE_KEYS.AUTH_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ Admin token is undefined or invalid");
        return null;
      }

      console.log("Retrieved admin token from cookies");
      return token;
    } else if (userType === "cook") {
      const token = getCookie(COOKIE_KEYS.COOK_TOKEN) || getCookie(COOKIE_KEYS.AUTH_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ Cook token is undefined or invalid");
        return null;
      }

      console.log("Retrieved cook token from cookies");
      return token;
    } else if (userType === "user") {
      const token = getCookie(COOKIE_KEYS.USER_TOKEN) || getCookie(COOKIE_KEYS.AUTH_TOKEN);

      if (!token || token === "undefined") {
        console.warn("⚠️ User token is undefined or invalid");
        return null;
      }

      console.log("Retrieved user token from cookies");
      return token;
    } else {
      console.warn(`⚠️ Unrecognized user type: ${userType}. No token available.`);
      return null;
    }
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}

function saveUserData(userType, token, options = {}) {
  try {
    if (!userType || !token) {
      console.warn("⚠️ Missing user type or token for saving to cookies");
      return false;
    }

    console.log(`Saving ${userType} data to cookies`);

    // Set the user type and active user
    safeSetCookie(COOKIE_KEYS.USER_TYPE, userType, options);
    safeSetCookie(COOKIE_KEYS.ACTIVE_USER, userType, options);

    // Store the token for the specific user type
    if (userType === "admin") {
      safeSetCookie(COOKIE_KEYS.ADMIN_TOKEN, token, options);
    } else if (userType === "cook") {
      safeSetCookie(COOKIE_KEYS.COOK_TOKEN, token, options);
    } else if (userType === "user") {
      safeSetCookie(COOKIE_KEYS.USER_TOKEN, token, options);
    } else {
      throw new Error(`Invalid user type: ${userType}`);
    }

    console.log(`✅ ${userType} data saved successfully to cookies`);
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

function authRequestInterceptor(config) {
  try {
    const token = getToken();

    config.headers = config.headers || {};
    config.headers.Accept = "application/json";

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (error) {
    console.error("Error in request interceptor:", error);
    return config;
  }
}

const API_URL = import.meta.env.VITE_APP_API_URL;
if (!API_URL) {
  console.error("❌ API URL is not defined in the .env file");
}

// Create Axios instance
export const api = Axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

console.log("🌍 API Base URL:", API_URL);

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("❌ API Error:", message);

    // Handle unauthorized errors (401) by clearing auth data
    if (error.response && error.response.status === 401) {
      console.log("401 Unauthorized response detected, clearing auth data");
      clearAuthData();
    }

    return Promise.reject(error);
  }
);

function clearAuthData(options = {}) {
  try {
    safeRemoveCookie(COOKIE_KEYS.USER_TYPE, options);
    safeRemoveCookie(COOKIE_KEYS.ADMIN_TOKEN, options);
    safeRemoveCookie(COOKIE_KEYS.COOK_TOKEN, options);
    safeRemoveCookie(COOKIE_KEYS.USER_TOKEN, options);
    safeRemoveCookie(COOKIE_KEYS.ACTIVE_USER, options);
    safeRemoveCookie(COOKIE_KEYS.AUTH_TOKEN, options);

    console.log("🔒 All auth data cleared from cookies");
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
}

// Helper function to get current user type
function getCurrentUserType() {
  return getCookie(COOKIE_KEYS.ACTIVE_USER) || null;
}

// Additional utility functions for cookie management
function getAllAuthCookies() {
  return {
    userType: getCookie(COOKIE_KEYS.USER_TYPE),
    activeUser: getCookie(COOKIE_KEYS.ACTIVE_USER),
    adminToken: getCookie(COOKIE_KEYS.ADMIN_TOKEN),
    cookToken: getCookie(COOKIE_KEYS.COOK_TOKEN),
    userToken: getCookie(COOKIE_KEYS.USER_TOKEN),
    authToken: getCookie(COOKIE_KEYS.AUTH_TOKEN),
  };
}

function isAuthenticated() {
  const token = getToken();
  const userType = getCurrentUserType();
  return !!(token && userType);
}

export { 
  saveUserData, 
  getToken, 
  clearAuthData, 
  getCurrentUserType,
  getAllAuthCookies,
  isAuthenticated,
  setCookie,
  getCookie,
  removeCookie
};