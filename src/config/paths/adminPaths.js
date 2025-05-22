export const adminPaths = {
  root: {
    path: "/admin",
    getHref: () => "/",
  },

  register: {
    path: "/admin/register",
    getHref: (redirectTo) =>
      `/admin/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
