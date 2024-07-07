export * from "./api";

/**
 * 获取用户路由数据
 */
export async function fetchUserRoutes() {
  const route = [
    {
      name: "multi-chat_id-01",
      path: "/multi-chat/id_01",
      component: "chat",
      meta: {
        title: "chat_title",
        icon: "humbleicons:chat",
      },
    },
    {
      name: "multi-chat_id-02",
      path: "/multi-chat/id_02",
      component: "chat",
      meta: {
        title: "chat_title",
        icon: "humbleicons:chat",
      },
    },
  ];

  return route;
}
