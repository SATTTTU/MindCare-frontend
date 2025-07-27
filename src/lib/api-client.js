import Axios from "axios";

const STORAGE_KEYS = {
  USER_TYPE: "user_type",
  ADMIN_TOKEN: "admin_token",
  COOK_TOKEN: "cook_token", // shared for both cook and doctor
  USER_TOKEN: "user_token",
  ACTIVE_USER: "active_user",
  AUTH_TOKEN: "authToken",
};

// Utility to check doctor-like roles
const isDoctorLikeUser = (role) => ["cook", "doctor"].includes(role);

// Local Storage utility functions
const setItem = (name, value) => {
  try {
    localStorage.setItem(name, value);
    return true;
  } catch (error) {
    console.error(`Error saving ${name} to local storage:`, error);
    return false;
  }
};

const getItem = (name) => {
  try {
    return localStorage.getItem(name);
  } catch (error) {
    console.error(`Error getting item ${name} from local storage:`, error);
    return null;
  }
};

const removeItem = (name) => {
  try {
    localStorage.removeItem(name);
    return true;
  } catch (error) {
    console.error(`Error removing item ${name} from local storage:`, error);
    return false;
  }
};

function getToken() {
  try {
    const userType = getItem(STORAGE_KEYS.USER_TYPE);

    if (!userType) {
      // If no user type is set, try to check if any token exists in local storage
      const adminToken = getItem(STORAGE_KEYS.ADMIN_TOKEN) || getItem(STORAGE_KEYS.AUTH_TOKEN);
      const cookToken = getItem(STORAGE_KEYS.COOK_TOKEN);
      const userToken = getItem(STORAGE_KEYS.USER_TOKEN);

      if (adminToken && adminToken !== "undefined") {
        console.log("Found admin token without user type, setting user type to admin");
        setItem(STORAGE_KEYS.USER_TYPE, "admin");
        setItem(STORAGE_KEYS.ACTIVE_USER, "admin");
        return adminToken;
      }

      if (cookToken && cookToken !== "undefined") {
        console.log("Found cook/doctor token without user type, setting user type to doctor");
        setItem(STORAGE_KEYS.USER_TYPE, "doctor"); // default to doctor
        setItem(STORAGE_KEYS.ACTIVE_USER, "doctor");
        return cookToken;
      }

      if (userToken && userToken !== "undefined") {
        console.log("Found user token without user type, setting user type to user");
        setItem(STORAGE_KEYS.USER_TYPE, "user");
        setItem(STORAGE_KEYS.ACTIVE_USER, "user");
        return userToken;
      }

      return null;
    }

    if (userType === "admin") {
      const token = getItem(STORAGE_KEYS.ADMIN_TOKEN) || getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token || token === "undefined") {
        console.warn("⚠️ Admin token is undefined or invalid");
        return null;
      }
      console.log("Retrieved admin token from local storage");
      return token;

    } else if (isDoctorLikeUser(userType)) {
      const token = getItem(STORAGE_KEYS.COOK_TOKEN) || getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token || token === "undefined") {
        console.warn("⚠️ Doctor token is undefined or invalid");
        return null;
      }
      console.log("Retrieved doctor token from local storage");
      return token;

    } else if (userType === "user") {
      const token = getItem(STORAGE_KEYS.USER_TOKEN) || getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (!token || token === "undefined") {
        console.warn("⚠️ User token is undefined or invalid");
        return null;
      }
      console.log("Retrieved user token from local storage");
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

function saveUserData(userType, token) {
  try {
    if (!userType || !token) {
      console.warn("⚠️ Missing user type or token for saving to local storage");
      return false;
    }

    console.log(`Saving ${userType} data to local storage`);

    // Set the user type and active user
    setItem(STORAGE_KEYS.USER_TYPE, userType);
    setItem(STORAGE_KEYS.ACTIVE_USER, userType);

    if (userType === "admin") {
      setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
    } else if (userType === "user") {
      setItem(STORAGE_KEYS.USER_TOKEN, token);
    } else if (isDoctorLikeUser(userType)) {
      setItem(STORAGE_KEYS.COOK_TOKEN, token); // share cook_token for both
    } else {
      throw new Error(`Invalid user type: ${userType}`);
    }

    console.log(`✅ ${userType} data saved successfully to local storage`);
    return true;
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
}

function authRequestInterceptor(config) {
  try {
    const token = getToken();
    console.log("Auth Interceptor: Checking for token...", { token });

    config.headers = config.headers || {};
    config.headers.Accept = "application/json";

    if (!(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (token) {
      console.log("Auth Interceptor: Token found. Setting Authorization header.");
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("Auth Interceptor: No token found. Request will be sent without Authorization header.");
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
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.error("❌ API Error:", message);

    if (error.response && error.response.status === 401) {
      console.log("401 Unauthorized response detected, clearing auth data");
      clearAuthData();
    }

    return Promise.reject(error);
  }
);

function clearAuthData() {
  try {
    removeItem(STORAGE_KEYS.USER_TYPE);
    removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    removeItem(STORAGE_KEYS.COOK_TOKEN);
    removeItem(STORAGE_KEYS.USER_TOKEN);
    removeItem(STORAGE_KEYS.ACTIVE_USER);
    removeItem(STORAGE_KEYS.AUTH_TOKEN);

    console.log("🔒 All auth data cleared from local storage");
  } catch (error) {
    console.error("Error clearing auth data:", error);
    throw error;
  }
}

function getCurrentUserType() {
  return getItem(STORAGE_KEYS.ACTIVE_USER) || null;
}

function getAllAuthItems() {
  return {
    userType: getItem(STORAGE_KEYS.USER_TYPE),
    activeUser: getItem(STORAGE_KEYS.ACTIVE_USER),
    adminToken: getItem(STORAGE_KEYS.ADMIN_TOKEN),
    cookToken: getItem(STORAGE_KEYS.COOK_TOKEN),
    userToken: getItem(STORAGE_KEYS.USER_TOKEN),
    authToken: getItem(STORAGE_KEYS.AUTH_TOKEN),
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
  getAllAuthItems,
  isAuthenticated,
  setItem,
  getItem,
  removeItem
};
