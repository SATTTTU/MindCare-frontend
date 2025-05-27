export const userPaths = {
  root: {
    path: "/",
    getHref: () => "/",
  },

  register: {
    path: "register",
    getHref: (redirectTo) =>
      `/user/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  login:{
    path: "login",
    getHref: (redirectTo) =>
      `/user/login${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
  journel:{
    path: "journel",
    getHref: (redirectTo) =>
      `/user/journel${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  }
};
