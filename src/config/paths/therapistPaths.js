// src/config/paths.js -> therapistPaths
export const therapistPaths = {
  root: {
    path: "",
    getHref: () => "/therapist",
  },
  // This is the single entry point for the entire registration flow
  onboarding: {
    path: "register-as-therapist",
    getHref: () => "therapist/register-as-therapist",
  },
  // You can add a path for the final review page
  applicationReview: {
    path: "application-review",
    getHref: () => "/therapist/application-review",
  },
  // REMOVED: be_therapist path is no longer needed
};