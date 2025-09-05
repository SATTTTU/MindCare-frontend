// src/routes/therapistRoutes.js
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const therapistRoutes = [
  {
    path: paths.therapists.root.path,
    element: <ProtectedRoute allowedRoles={['Doctor', 'Admin']}> {/* User role should be able to apply */}
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
              const { DoctorRegistrationPage } = await import("../../routes/therapists/registrationPage");
              return { Component: DoctorRegistrationPage };
            },
          },
          {
            path: paths.therapists.applicationReview.path,
            lazy: async () => {
              const { ApplicationReviewPage } = await import("../../../modules/therapists/therapist/components/reviewPage"); // Example component
              return { Component: ApplicationReviewPage };
            }
          },
          {
            path: paths.therapists.therapistDashboard.path,
            lazy: async () => {
              const { TherapistDashboard } = await import("../../../modules/therapists/dashboard/components/daashboard"); // Example component
              return { Component: TherapistDashboard };
            }
          }
        ],
      },
    ],
  },
];