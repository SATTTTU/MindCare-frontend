export const therapistPaths = {
  root: {
    path: "",
    getHref: () => "/therapist",
  },

  be_therapist: {
    path: "become-therapist",
    getHref: (redirectTo) =>
      `therapist/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
