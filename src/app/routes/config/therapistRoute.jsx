import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";

export const therapistRoutes = [
  {
    path: paths.therapists.root.path,
    element: <Outlet />,
    ErrorBoundary: AppRootErrorBoundary,
    children: [
      {
        element: <AuthRoot />,
        children: [
                  {
                    path: paths.therapists.be_therapist.path,
                    lazy: async () => {
                      const { MultiStepForm } = await import("../../../modules/therapist/components/MultiStepForm");                      return {
                        Component: MultiStepForm,
                      };
                    },
                  },
                ],
        
      },
    ],
  },
];
