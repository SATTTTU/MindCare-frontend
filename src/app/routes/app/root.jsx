import { Outlet } from "react-router-dom";

// ErrorBoundary Component
export const AppRootErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error("Error Boundary Caught:", error);
    return (
      <div
        style={{
          padding: "2rem",
          margin: "2rem auto",
          maxWidth: "500px",
          background: "#fff0f0",
          border: "1px solid #ffcccc",
          borderRadius: "12px",
          color: "#b91c1c",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        }}
      >
        Something went wrong. Please try again later.
      </div>
    );
  }
};

export const AuthRoot = () => {
  return (
    <AppRootErrorBoundary>
        <Outlet />
    </AppRootErrorBoundary>
  );
};



export const AdminRoot = () => {
  return (
    <AppRootErrorBoundary>
      <Outlet />
    </AppRootErrorBoundary>
  );
};

export const UserRoot = () => {
  return (
    <AppRootErrorBoundary>
      <Outlet />
    </AppRootErrorBoundary>
  );
};
export const TherapistRoot = () => {
  return (
    <AppRootErrorBoundary>
      <Outlet />
    </AppRootErrorBoundary>
  );
};