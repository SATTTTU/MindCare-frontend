export const userPaths = {
  root: {
    path: "",
    getHref: () => "/",
  },

  register: {
    path: "register",
    getHref: (redirectTo) =>
      `/user/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  homepage: {
    path: "/",
    getHref: (redirectTo) =>
      `/user/homepage${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  login: {
    path: "login",
    getHref: (redirectTo) =>
      `/user/login${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },

  journel: {
    path: "journel",
    getHref: (redirectTo) =>
      `/user/journel${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  privacy: {
    path: "/register/policy",
    getHref: (redirectTo) =>
      `/user/policy${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  terms: {
    path: "/register/terms",
    getHref: (redirectTo) =>
      `/user/terms${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   dashboard: {
    path: "/user-dashboard",
    getHref: (redirectTo) =>
      `/user-dashboard${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
   mood: {
    path: "/mood-tracking",
    getHref: (redirectTo) =>
      `/mood-tracking${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  blogs:{
    path: "/blogs",
    getHref: (redirectTo) =>
      `/blogs${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  therapists:{
    path: "/therapists",
    getHref: (redirectTo) =>
      `/therapists${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  therapistProfile:{
    path: "/therapists/:id",
    getHref: (redirectTo) =>
      `/therapists/:id${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  }


};
