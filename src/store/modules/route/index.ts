import { defineStore } from "pinia";
import {
  filterAuthRoutesByUserPermission,
  getConstantRouteNames,
  sortRoutes,
  transformAuthRouteToMenu,
  transformAuthRouteToVueRoutes,
  transformRoutePathToRouteName,
} from "@/utils";
import { router, constantRoutes, moduleRoutes as staticRoutes } from "@/router";
import { useAuthStore } from "../auth";
import { useAppStore } from "../app";
import { fetchHistoryConversations, fetchUserRoutes } from "@/service";

interface RouteState {
  /** 路由首页name */
  routeHomeName: AuthRoute.AllRouteKey;
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 静态菜单 */
  staticMenus: App.GlobalMenuOption[];
  /** 动态菜单 */
  dynamicMenus: App.GlobalMenuOption[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore("route-store", {
  state: (): RouteState => ({
    routeHomeName: transformRoutePathToRouteName(
      import.meta.env.VITE_ROUTE_HOME_PATH as AuthRoute.RoutePath
    ),
    isInitAuthRoute: false,
    staticMenus: [],
    dynamicMenus: [],
    cacheRoutes: [],
  }),
  actions: {
    /** 重置路由store */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },

    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes();
      routes.forEach((route) => {
        const name = (route.name || "root") as AuthRoute.AllRouteKey;
        if (!this.isConstantRoute(name)) router.removeRoute(name);
      });
    },

    /** 清空动态路由菜单 */
    clearDynamicMenus() {
      this.dynamicMenus = [];
    },

    /**
     * 是否是固定路由
     * @param name - 路由名称
     */
    isConstantRoute(name: AuthRoute.AllRouteKey) {
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name);
    },

    /**
     * 是否是有效的固定路由
     * @param name - 路由名称
     */
    isValidConstantRoute(name: AuthRoute.AllRouteKey) {
      const NOT_FOUND_NAME: AuthRoute.NotFoundRouteKey = "not-found";
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      return constantRouteNames.includes(name) && name !== NOT_FOUND_NAME;
    },

    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoute(
      routes: AuthRoute.Route[],
      type: "staticMenus" | "dynamicMenus"
    ) {
      if (type === "staticMenus") {
        // 问题：为何会标记无限循环?
        (this.staticMenus as App.GlobalMenuOption[]).push(
          ...transformAuthRouteToMenu(routes)
        );
      } else {
        (this.dynamicMenus as App.GlobalMenuOption[]).push(
          ...transformAuthRouteToMenu(routes)
        );
      }

      const vueRoutes = transformAuthRouteToVueRoutes(routes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
    },

    /** 初始化动态路由 */
    async initDynamicRoute() {
      const { resetAuthStore } = useAuthStore();
      const children = (await fetchHistoryConversations()) as any;

      const multiChatRoute: AuthRoute.Route[] = [
        {
          name: "multi-chat",
          path: "/multi-chat",
          component: "basic",
          children,
          meta: {
            title: "Ai chat",
            icon: "arcticons:ai-chat",
            permissions: ["user", "admin", "super"],
            requiresAuth: true,
          },
        },
      ];

      this.handleAuthRoute(sortRoutes(multiChatRoute), "dynamicMenus");
    },

    /** 初始化静态路由 */
    async initStaticRoute() {
      const auth = useAuthStore();
      const routes = filterAuthRoutesByUserPermission(
        staticRoutes,
        auth.userInfo.userRole
      );
      this.handleAuthRoute(routes, "staticMenus");
    },

    /** 初始化权限路由 */
    async initAuthRoute() {
      await this.initStaticRoute();
      await this.initDynamicRoute();

      this.isInitAuthRoute = true;
    },

    /** 添加某个缓存路由 */
    addCacheRoute(name: AuthRoute.AllRouteKey) {
      const isCached = this.cacheRoutes.indexOf(name) > -1;
      if (!isCached) this.cacheRoutes.push(name);
    },

    /** 从缓存路由中删除某个路由 */
    removeCacheRoute(name: AuthRoute.AllRouteKey) {
      const index = this.cacheRoutes.indexOf(name);
      if (index > -1) this.cacheRoutes.splice(index, 1);
    },

    /** 重新缓存路由 */
    async reCacheRoute(name: AuthRoute.AllRouteKey) {
      const { reloadPage } = useAppStore();

      const isCached = this.cacheRoutes.includes(name);
      if (isCached) this.removeCacheRoute(name);

      await reloadPage();

      if (isCached) this.addCacheRoute(name);
    },
  },
});
