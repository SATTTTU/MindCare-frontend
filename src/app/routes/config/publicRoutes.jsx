// src/app/router/routes/publicRoutes.js (New file for public-facing routes)

import { paths } from "@/config/paths";

export const publicRoutes = [
  {
    path: paths.user.homepage.path, // e.g., '/dashboard'
    lazy: async () => {
      const { HomePageRoute } = await import(
        "../../routes/user/homepage/homepage"
      );
      return { Component: HomePageRoute };
    },
  },
  // These routes DO NOT have a <ProtectedRoute> wrapper.
  {
    path: paths.user.register.path,
    lazy: async () => {
      const { RegisterForm } = await import(
        "../../../modules/user/auth/components/register"
      );
      return { Component: RegisterForm };
    },
  },
  {
    path: paths.user.login.path,
    lazy: async () => {
      const { LoginForm } = await import(
        "../../../modules/user/auth/components/login"
      );
      return { Component: LoginForm };
    },
  },
  {
    path: paths.user.privacy.path,
    lazy: async () => {
      const { PrivacyPolicy } = await import(
        "../../../modules/user/privacy_terms/privacy"
      );
      return { Component: PrivacyPolicy };
    },
  },
  {
    path: paths.user.terms.path,
    lazy: async () => {
      const { TermsOfService } = await import(
        "../../../modules/user/privacy_terms/terms"
      );
      return { Component: TermsOfService };
    },

  },
  {
    path: paths.therapists.applicationReview.path,
    lazy: async () => {
      const { ApplicationReviewPage } = await import("../../../modules/therapists/therapist/components/reviewPage"); // Example component
      return { Component: ApplicationReviewPage };
    }
  },
];