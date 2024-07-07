declare namespace PageRoute {
  /** 根路由 */
  type RootRouteKey = "root";

  /** 未找到路由 */
  type NotFoundRouteKey = "not-found";

  /** 页面路由 */
  type RouteKey =
    | "403"
    | "404"
    | "500"
    | "login"
    | "not-found"
    | "model"
    | "multi-chat"
    | "chat"
    | "home";

  /** 最后一级路由(有对应的页面文件) */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    "403" | "404" | "500" | "not-found" | "login" | "home" | "model" | "chat"
  >;
}
