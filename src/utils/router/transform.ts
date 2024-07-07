import type { RouteRecordRaw } from "vue-router";
import { getLayoutComponent, getViewComponent } from "./component";

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * 将权限路由转换成vue路由
 * @param routes - 权限路由
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

/**
 * 将单个权限路由转换成vue路由
 * @param item - 单个权限路由
 */
export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  /** 动态path */
  if (hasDynamicPath(item))
    Object.assign(itemRoute, { path: item.meta.dynamicPath });

  /** 路由组件 */
  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent("basic");
      },
      blank() {
        itemRoute.component = getLayoutComponent("blank");
      },
      multi() {
        if (hasChildren(item)) {
          Object.assign(itemRoute, {
            meta: { ...itemRoute.meta, multi: true },
          });
          delete itemRoute.component;
        } else window.console.error("多级路由缺少子路由: ", item);
      },
      self() {
        itemRoute.component = getViewComponent(
          item.name as AuthRoute.LastDegreeRouteKey
        );
      },
      chat() {
        itemRoute.component = getViewComponent("chat");
      },
    };

    try {
      if (item.component) action[item.component]();
      else window.console.error("路由组件解析失败", item);
    } catch {
      window.console.error("路由组件解析失败", item);
    }
  }

  if (isSingleRoute(item)) {
    if (hasChildren(item)) {
      window.console.error("单独路由不能有子路由", item);
    }

    if (item.name === "not-found") {
      itemRoute.children = [
        {
          path: "",
          name: item.name,
          component: getViewComponent("not-found"),
        },
      ];
    } else {
      const parentPath =
        `${itemRoute.path}-parent` as AuthRouteUtils.SingleRouteParentPath;

      const layout =
        item.meta.singleLayout === "basic"
          ? getLayoutComponent("basic")
          : getLayoutComponent("blank");

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      };

      return [parentRoute];
    }
  }

  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat();

    const redirectPath = (children.find((v) => !v.meta?.multi)?.path ||
      "/") as AuthRoute.RoutePath;

    if (redirectPath === "/")
      window.console.error("该多级路由没有有效的子路径", item);

    if (item.component === "multi") {
      // 针对多级 (>2) 路由的处理
      resultRoute.push(...children);
      delete itemRoute.children;
    } else itemRoute.children = children;

    itemRoute.redirect = redirectPath;
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

/** 将路由名称转换为路由路径 */
export function transformRouteNameToRoutePath(
  name: Exclude<AuthRoute.AllRouteKey, "not-found">
): AuthRoute.RoutePath {
  const rootPath: AuthRoute.RootRoutePath = "/";
  if (name === "root") return rootPath;

  const keySplitMark = "_";
  const pathSplitMark = "/";
  const path = name.split(keySplitMark).join(pathSplitMark);

  return `${pathSplitMark}${path}` as AuthRoute.RoutePath;
}

/** 将路由路径转换为路由名称 */
export function transformRoutePathToRouteName(path: AuthRoute.RoutePath) {
  if (path === "/") return "root";

  const pathSplitMark = "/";
  const keySplitMark = "_";

  const name = path
    .split(pathSplitMark)
    .join(keySplitMark) as AuthRoute.AllRouteKey;

  return name;
}

function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath);
}

function hasComponent(item: AuthRoute.Route) {
  return Boolean(item.component);
}

function hasChildren(item: AuthRoute.Route) {
  return Boolean(item.children && item.children.length);
}

function isSingleRoute(item: AuthRoute.Route) {
  return Boolean(item.meta.singleLayout);
}
