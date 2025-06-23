// src/app/layouts/RootLayout.jsx (Previously App.jsx, now a proper layout)

import { Outlet } from "react-router-dom";
// import GlobalNavbar from "@/components/ui/GlobalNavbar"; // Example
// import GlobalFooter from "@/components/ui/GlobalFooter"; // Example

export const RootLayout = () => {
  return (
    <div className="app-container">
      {/* <GlobalNavbar /> */}
      <main>
        {/* All your nested routes will be rendered here */}
        <Outlet />
      </main>
      {/* <GlobalFooter /> */}
    </div>
  );
};