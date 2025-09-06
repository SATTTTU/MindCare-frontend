// src/app/router/routes/userRoutes.js (Corrected - for protected user routes)

import { paths } from "@/config/paths";
import ProtectedRoute from "./protectedRoutes";

export const userRoutes = [
  {
    // The ProtectedRoute now wraps all routes that require a user to be logged in.
    // We allow both 'User' and 'Admin' to access these common user routes.
    element: <ProtectedRoute allowedRoles={['User', 'Admin',]} />,
    children: [
      {
        path: paths.user.dashboard.path, 
        lazy: async () => {
          const { UserDashboard } = await import(
            "../../../modules/user/dashboard/components/dashboard"
          );
          return { Component: UserDashboard };
        },
      },
     
      {
        path: paths.user.journel.path, // e.g., '/journal'
        lazy: async () => {
          const { JournelRoute } = await import(
            "../../routes/user/journel/journel"
          );
          return { Component: JournelRoute };
        },
      },
      {
        path: paths.user.mood.path, // e.g., '/journal'
        lazy: async () => {
          const { MoodTracker } = await import(
            "../../../modules/user/mood-tracking/components/mood-tracking"
          );
          return { Component: MoodTracker };
        },
      },
      {
        path: paths.user.blogs.path, // e.g., '/journal'
        lazy: async () => {
          const { BlogCards } = await import(
            "../../../modules/user/blogs/components/BlogCards"
          );
          return { Component: BlogCards };
        },
      },
      {
        path: paths.user.therapists.path, // e.g., '/journal'
        lazy: async () => {
          const { DoctorsPage } = await import(
            "../../../modules/user/therapists/component/alldoctors"
          );
          return { Component: DoctorsPage };
        },
      },
      {
        path: paths.user.therapistProfile.path, // e.g., '/journal'
        lazy: async () => {
          const { DoctorProfile } = await import(
            "../../../modules/user/therapists/component/doctorProfile"
          );
          return { Component: DoctorProfile };
        },
      },

     
    ],
  },
];