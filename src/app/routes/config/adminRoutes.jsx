import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";

export const adminRoutes = [
  {
    path: paths.admin.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: paths.user.register.path,
            lazy: async () => {
              const { RegisterRoute } = await import("../../routes/user/auth/register");
              return {
                Component: RegisterRoute,
              };
            },
          },
        ],
      },
    ],
  },
];
