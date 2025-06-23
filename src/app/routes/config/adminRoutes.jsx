import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const adminRoutes = [
  {
    path: paths.admin.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <ProtectedRoute allowedRoles={  ['Admin']} />,
        children: [
          {
            path: paths.admin.login.path,
            lazy: async () => {
              const { AdminLogin } = await import("../../../modules/admin/auth/components/login");
              return {
                Component: AdminLogin,
              };
            },
          },
        ],
      },
    ],
  },
];
