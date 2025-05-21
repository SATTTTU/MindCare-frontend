import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";

export const userRoutes = [
  {
    path: paths.user.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
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
];
