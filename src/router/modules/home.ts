const homeRoute: AuthRoute.Route = {
  name: "home",
  path: "/home",
  component: "self",
  meta: {
    title: "首页",
    singleLayout: "basic",
    requiresAuth: true,
    permissions: ["user", "admin", "super"],
    icon: "healthicons:desktop-app",
  },
};

export default homeRoute;
