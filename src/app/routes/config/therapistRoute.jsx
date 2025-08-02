import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const therapistRoutes = [
  {
    path: paths.therapists.root.path,
    element: <ProtectedRoute allowedRoles={['Doctor','User','Admin']}>  {/* or 'Therapist' based on your role */}

      <Outlet />
    </ProtectedRoute>,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
           {
            path: paths.therapists.onboarding.path,
            lazy: async () => {
              const { DoctorForm } = await import("../../../modules/therapist/components/onboarding");
              return {
                Component: DoctorForm,
              };
            },
          },
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
