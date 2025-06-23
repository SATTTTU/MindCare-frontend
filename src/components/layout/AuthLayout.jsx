// src/layouts/AuthLayout.jsx
import { AuthProvider } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
