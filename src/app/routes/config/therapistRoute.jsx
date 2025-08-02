// src/routes/therapistRoutes.js
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const therapistRoutes = [
  {
    path: paths.therapists.root.path,
    element: <ProtectedRoute allowedRoles={['User', 'Admin']}> {/* User role should be able to apply */}
      <Outlet />
    </ProtectedRoute>,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
           {
            // The single route that handles the entire multi-step registration
            path: paths.therapists.onboarding.path,
            lazy: async () => {
              const { DoctorRegistrationPage } = await import("../../routes/therapists/registrationPage");
              return { Component: DoctorRegistrationPage };
            },
          },
          // REMOVED: The direct route to MultiStepForm is gone.
          // {
          //   // Add a route for the success page
          //   path: paths.therapists.applicationReview.path,
          //   lazy: async () => {
          //     const { ApplicationReviewPage } = await import("../../../modules/therapist/components/ApplicationReviewPage"); // Example component
          //     return { Component: ApplicationReviewPage };
          //   }
          // }
        ],
      },
    ],
  },
];