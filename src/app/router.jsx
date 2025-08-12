
import { createBrowserRouter } from "react-router-dom";



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
      element: <RootLayout/>,
      children: [
        {
          element: <AuthLayout />,
          children: [

            ...publicRoutes,

            ...userRoutes,
            ...adminRoutes,
            ...therapistRoutes,

            ...notFoundRoute,
          ],
        },
      ],
    },
  ]);