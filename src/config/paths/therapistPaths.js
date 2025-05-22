export const therapistPaths = {
  root: {
    path: "/therapist",
    getHref: () => "/therapist",
  },

  register: {
    path: "therapist/register",
    getHref: (redirectTo) =>
      `therapist/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
