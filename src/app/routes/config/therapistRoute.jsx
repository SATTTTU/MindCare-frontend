import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const therapistRoutes = [
  {
    path: paths.therapists.root.path,
    element: <ProtectedRoute allowedRoles={['Doctor']}>  {/* or 'Therapist' based on your role */}
      <Outlet />
    </ProtectedRoute>,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
          {
            path: paths.therapists.be_therapist.path,
            lazy: async () => {
              const { MultiStepForm } = await import("../../../modules/therapist/components/MultiStepForm");
              return {
                Component: MultiStepForm,
              };
            },
          },
        ],
      },
    ],
  },
];
