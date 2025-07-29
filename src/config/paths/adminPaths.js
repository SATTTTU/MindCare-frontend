
export const adminPaths = {
  root: {
    path: "/admin",
    getHref: () => "/admin",
  },

  dashboard: {
    path: "/admin-dashboard",
    getHref: (redirectTo) =>
      `/admin-dashboard${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   users: {
    path: "/get-users",
    getHref: (redirectTo) =>
      `/get-users${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
    blogs: {
    path: "/admin/blogs",
    getHref: (redirectTo) =>
      `/admin/blogs${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};

