import { Outlet } from "react-router-dom";

// ErrorBoundary Component
export const AppRootErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    console.error("Error Boundary Caught:", error);
    return <div>Something went wrong. Please try again later.</div>;
  }
};

// Root Components for Auth, Admin, Cook, and User
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