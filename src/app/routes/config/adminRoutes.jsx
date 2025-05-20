import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary } from "./AppRootErrorBoundary"; // Adjust import as needed
import { paths } from "./paths"; // Your defined path config
import { AuthRoot } from "../app/root";

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
              const { RegisterPage } = await import("../register");
              return {
                Component: RegisterPage,
              };
            },
          },
        ],
      },
    ],
  },
];
