// src/app/layouts/RootLayout.jsx

import { Outlet } from "react-router-dom";
// import GlobalNavbar from "@/components/ui/GlobalNavbar"; // Example of a global component
// import GlobalFooter from "@/components/ui/GlobalFooter"; // Another example

/**
 * The RootLayout is the top-level component for the entire application.
 * It provides a consistent structure (like a header and footer) that wraps all other pages.
 * The <Outlet /> component is a placeholder where React Router will render the currently active child route.
 */
export const RootLayout = () => {
  return (
    <div className="app-container">
      {/* Example: A navigation bar that appears on every page */}
      {/* <GlobalNavbar /> */}

      <main className="main-content">
        {/*
          All your other routes (like AuthLayout, login pages, dashboards, etc.) 
          will be rendered here inside this <main> tag.
        */}
        <Outlet />
      </main>

      {/* Example: A footer that appears on every page */}
      {/* <GlobalFooter /> */}
    </div>
  );
};