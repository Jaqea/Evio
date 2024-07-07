import type { RouteComponent } from "vue-router";

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  "403": () => import("./_builtin/403/index.vue"),
  "404": () => import("./_builtin/404/index.vue"),
  "500": () => import("./_builtin/500/index.vue"),
  login: () => import("./_builtin/login/index.vue"),
  "not-found": () => import("./_builtin/not-found/index.vue"),
  model: () => import("./model/index.vue"),
  chat: () => import("./multi-chat/chat/index.vue"),
  home: () => import("./home/index.vue"),
};
