export const adminPaths = {
  root: {
    path: "/admin",
    getHref: () => "/",
  },

  login: {
    path: "/admin/login",
    getHref: (redirectTo) =>
      `/admin/login${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
