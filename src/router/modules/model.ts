const modelRoute: AuthRoute.Route = {
  name: "model",
  path: "/model",
  component: "self",
  meta: {
    title: "新建聊天",
    singleLayout: "basic",
    permissions: ["user", "admin", "super"],
    hide: true,
  },
};

export default modelRoute;
