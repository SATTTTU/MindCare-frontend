// src/main.jsx (Corrected)

import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./app/provider"; // Your global provider (e.g., for theme, query client)
import { createAppRouter } from "./app/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Create the router instance
const router = createAppRouter();

// Get the root element
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render the app. The RouterProvider is the single entry point for your routed app.
root.render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);