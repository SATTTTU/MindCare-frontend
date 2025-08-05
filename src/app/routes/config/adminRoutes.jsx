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
            path: paths.admin.dashboard.path,
            lazy: async () => {
              const { AdminDashboard } = await import("../../../modules/admin/dashboard/component/adminDashboard");
              return {
                Component: AdminDashboard,
              };
            },
          },
           {
            path: paths.admin.users.path,
            lazy: async () => {
              const { DisplayUserRoute } = await import("../../../modules/admin/users/components/users");
              return {
                Component: DisplayUserRoute,
              };
            },
          },
           {
            path: paths.admin.blogs.path,
            lazy: async () => {
              const { BlogManagement } = await import("../../../modules/admin/blogs/components/BlogManagement");
              return {
                Component: BlogManagement,
              };
            },
          },
           {
            path: paths.admin.therapists.path,
            lazy: async () => {
              const { TherapistRoute } = await import("../../routes/admin/therapists/therapists");
              return {
                Component: TherapistRoute,
              };
            },
          },
        ],
      },
    ],
  },
];
