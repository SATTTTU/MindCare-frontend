// src/app/router/index.js (Corrected and restructured)

import { createBrowserRouter } from "react-router-dom";

// Layouts


// Route configurations
import { RootLayout } from "@/components/layout/RootLayout";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { publicRoutes } from "./routes/config/publicRoutes";
import { userRoutes } from "./routes/config/userRoutes";
import { adminRoutes } from "./routes/config/adminRoutes";
import { therapistRoutes } from "./routes/config/therapistRoute";
import { notFoundRoute } from "./routes/config/notFoundRoute";

export const createAppRouter = () =>
  createBrowserRouter([
    {
      // Level 1: The Root Layout for the entire app (e.g., with global nav/footer)
      element: <RootLayout/>,
      children: [
        {
          // Level 2: The Auth Layout. It provides AuthContext to all nested routes.
          element: <AuthLayout />,
          children: [
            // --- Group routes by protection status ---

            // 1. Public routes that anyone can access (login, register, privacy, etc.)
            ...publicRoutes,

            // 2. Protected routes for specific roles
            ...userRoutes,
            ...adminRoutes,
            ...therapistRoutes,

            // 3. The catch-all 404 route MUST be the last one in this list.
            ...notFoundRoute,
          ],
        },
      ],
    },
  ]);