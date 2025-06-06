import { lazy } from "react";
import { Outlet } from "react-router-dom";
import { AppRootErrorBoundary, AuthRoot } from "../app/root";
import { paths } from "@/config/paths";

export const userRoutes = [
  {
    path: paths.user.root.path,
    element: <Outlet />,
    // ErrorBoundary: AppRootErrorBoundary,
    children: [
              {
                path: paths.user.register.path,
                lazy: async () => {
                  const { RegisterForm } = await import("../../../modules/user/auth/components/register");
                  return {
                    Component: RegisterForm,
                  };
                },
              },
              {
                path: paths.user.login.path,
                lazy: async () => {
                  const { LoginForm } = await import("../../../modules/user/auth/components/login");
                  return {
                    Component: LoginForm,
                  };
                },
              },
               {
                path: paths.user.journel.path,
                lazy: async () => {
                  const { JournalComponent } = await import("../../../modules/user/journel/components/inputJournel");
                  return {
                    Component: JournalComponent,
                  };
                },
              },
               {
                path: paths.user.homepage.path,
                lazy: async () => {
                  const { HomePageRoute } = await import("../../routes/user/homepage/homepage");
                  return {
                    Component: HomePageRoute,
                  };
                },
              },
               {
                path: paths.user.privacy.path,
                lazy: async () => {
                  const { PrivacyPolicy } = await import("../../../modules/user/privacy_terms/privacy");
                  return {
                    Component: PrivacyPolicy,
                  };
                },
              },
               {
                path: paths.user.terms.path,
                lazy: async () => {
                  const { TermsOfService } = await import("../../../modules/user/privacy_terms/terms");
                  return {
                    Component: TermsOfService,
                  };
                },
              },
            ],
    
  },
];
