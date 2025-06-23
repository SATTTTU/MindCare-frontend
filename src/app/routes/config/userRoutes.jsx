// src/app/router/routes/userRoutes.js (Corrected - for protected user routes)

import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const userRoutes = [
  {
    // The ProtectedRoute now wraps all routes that require a user to be logged in.
    // We allow both 'User' and 'Admin' to access these common user routes.
    element: <ProtectedRoute allowedRoles={['User', 'Admin']} />,
    children: [
      {
        path: paths.user.homepage.path, // e.g., '/dashboard'
        lazy: async () => {
          const { HomePageRoute } = await import(
            "../../routes/user/homepage/homepage"
          );
          return { Component: HomePageRoute };
        },
      },
      {
        path: paths.user.journel.path, // e.g., '/journal'
        lazy: async () => {
          const { JournalComponent } = await import(
            "../../../modules/user/journel/components/inputJournel"
          );
          return { Component: JournalComponent };
        },
      },
      // ... other protected user routes
    ],
  },
];