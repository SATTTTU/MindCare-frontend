import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { paths } from "./paths"; // Your defined path config
import { AppRootErrorBoundary, AuthRoot } from "../app/root";

export const therapistRoutes = [
  {
    path: paths.therapist.root.path,
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
