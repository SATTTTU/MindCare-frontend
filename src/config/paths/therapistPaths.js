export const therapistPaths = {
  root: {
    path: "",
    getHref: () => "/therapist",
  },
   onboarding: {
    path: "register-as-therapist",
    getHref: (redirectTo) =>
      `register-as-therapist${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  be_therapist: {
    path: "become-therapist",
    getHref: (redirectTo) =>
      `therapist/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
