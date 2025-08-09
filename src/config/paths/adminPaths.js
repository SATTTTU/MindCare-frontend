
export const adminPaths = {
  root: {
    path: "/",
    getHref: () => "/admin",
  },

  dashboard: {
    path: "admin-dashboard",
    getHref: (redirectTo) =>
      `admin-dashboard${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   users: {
    path: "get-users",
    getHref: (redirectTo) =>
      `get-users${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
    blogs: {
    path: "/admin/blogs",
    getHref: (redirectTo) =>
      `blogs${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   therapists: {
    path: "admin/therapists",
    getHref: (redirectTo) =>
      `therapists${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   therapistProfile: {
    path: "admin/therapists/:id",
    getHref: (redirectTo) =>
      `therapists${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};

