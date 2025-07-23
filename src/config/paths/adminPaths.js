
export const adminPaths = {
  root: {
    path: "/",
    getHref: () => "/",
  },

  dashboard: {
    path: "/admin-dashboard",
    getHref: (redirectTo) =>
      `/admin-dashboard${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
