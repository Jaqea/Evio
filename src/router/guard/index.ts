import { createPermissionGuard } from "./permission";
import type { Router } from "vue-router";

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    window.$loadingBar?.start();
    await createPermissionGuard(to, from, next);
  });

  router.afterEach(() => {
    window.$loadingBar?.finish();
  });
}
