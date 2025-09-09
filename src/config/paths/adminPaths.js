
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
    path: "get-blogs",
    getHref: (redirectTo) =>
      `get-blogs${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   therapists: {
    path: "get-therapists",
    getHref: (redirectTo) =>
      `therapists${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   therapistProfile: {
    path: "get-therapists/:id",
    getHref: (redirectTo) =>
      `get-therapists${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};

