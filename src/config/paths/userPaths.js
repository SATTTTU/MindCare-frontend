export const userPaths = {
  root: {
    path: "/user",
    getHref: () => "/",
  },

  register: {
    path: "register",
    getHref: (redirectTo) =>
      `/user/register${
        redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
      }`,
  },
};
