export const userPaths = {
  root: {
    path: "/",
    getHref: () => "/",
  },

  register: {
    path: "/register",
    getHref: (redirectTo) =>
      `/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
