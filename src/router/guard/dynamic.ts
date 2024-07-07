import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { routeName } from "@/router";
import { useRouteStore } from "@/store";
import { localStg } from "@/utils";

/**
 * 动态路由处理
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const route = useRouteStore();
  const isLogin = Boolean(localStg.get("token"));

  if (!route.isInitAuthRoute) {
    // 未登录，则不能初始化权限路由，跳转到登录页面
    if (!isLogin) {
      const toName = to.name as AuthRoute.AllRouteKey;
      if (route.isValidConstantRoute(toName) && !to.meta.requiresAuth) {
        next();
      } else {
        const redirect = to.fullPath;
        next({ name: routeName("login"), query: { redirect } });
      }
      return false;
    }

    await route.initAuthRoute();

    if (to.name === routeName("not-found")) {
      const ROOT_ROUTE_NAME: AuthRoute.AllRouteKey = "root";
      // const path = to.fullPath;
      const path =
        to.redirectedFrom?.name === ROOT_ROUTE_NAME ? "/" : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  if (to.name === routeName("not-found")) {
    console.log(to);
    next({ name: routeName("404"), replace: true });
    return false;
  }

  return true;
}
