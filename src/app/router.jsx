import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { userRoutes } from "./routes/config/userRoutes";
import { adminRoutes } from "./routes/config/adminRoutes";
import { therapistRoutes } from "./routes/config/therapistRoute";
import { notFoundRoute } from "./routes/config/notFoundRoute";
import { Loader } from "@/components/ui/Loader";


const createAppRouter = () => {
  return createBrowserRouter([
    ...adminRoutes,
    ...userRoutes,
    ...therapistRoutes,
    ...notFoundRoute,
  ]);
};

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []); 

  return (
    <RouterProvider router={router} fallbackElement={<Loader/>} />
  );
};
