import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";
import { useAuthStore } from "@/store";
import { routeName } from "@/router";
import { createDynamicRouteGuard } from "./dynamic";
import { exeStrategyActions, localStg } from "@/utils";

/** 处理路由页面权限 */
export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const permission = await createDynamicRouteGuard(to, from, next);
  if (!permission) return;

  const auth = useAuthStore();
  const isLogin = Boolean(localStg.get("token")) || true;
  const permissions = to.meta.permissions || [];
  const needLogin =
    Boolean(to.meta.requiresAuth) || Boolean(permissions.length);
  const hasPermission =
    !permissions.length || permissions.includes(auth.userInfo.userRole);

  const actions: Common.StrategyAction[] = [
    [
      // 已登录状态访问登录页面，跳转至首页
      isLogin && to.name === routeName("login"),
      () => next({ name: routeName("root") }),
    ],
    [
      // 已登录状态访问需要登录权限的页面，有权限直接访问
      isLogin && needLogin && hasPermission,
      () => next(),
    ],
    [
      // 已登录状态访问需要登录权限的页面，无权限重定向到无权限页面
      isLogin && needLogin && !hasPermission,
      () => {
        next({ name: routeName("403") });
      },
    ],
    [
      // 未登录状态访问需要登录权限的页面，跳转至登录页面
      !isLogin && needLogin,
      () => {
        const redirect = to.fullPath;
        next({ name: routeName("login"), query: { redirect } });
      },
    ],
    [
      // 不需要登录权限的页面，直接访问
      !needLogin,
      () => next(),
    ],
  ];

  exeStrategyActions(actions);
}
