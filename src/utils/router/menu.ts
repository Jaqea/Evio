import { useIconRender } from "@/composables/icon";

/**
 * 将权限路由转换为菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(
  routes: AuthRoute.Route[]
): App.GlobalMenuOption[] {
  const globalMenus: App.GlobalMenuOption[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    const routeName = name as string;
    let menuChildren: App.GlobalMenuOption[] | undefined;
    if (route.children && route.children.length)
      menuChildren = transformAuthRouteToMenu(route.children);

    const menuItem: App.GlobalMenuOption = addPartialProps({
      menu: {
        key: routeName,
        label: meta.title,
        routeName,
        routePath: path,
      },
      icon: meta.icon,
      localIcon: meta.localIcon,
      children: menuChildren,
    });
    if (!hideInMenu(route)) globalMenus.push(menuItem);
  });

  return globalMenus;
}

/**
 * 获取当前路由所在菜单数据的paths
 * @param activeKey - 当前路由key
 * @param menus - 菜单数据
 */
export function getActiveKeyPathsOfMenus(
  activeKey: string,
  menus: App.GlobalMenuOption[]
) {
  const keys = menus
    .map((menu) => getActiveKeyPathsOfMenu(activeKey, menu))
    .flat(1);

  return keys;
}

function getActiveKeyPathsOfMenu(
  activeKey: string,
  menu: App.GlobalMenuOption
) {
  const keys: string[] = [];
  if (activeKey.startsWith(menu.routeName)) {
    keys.push(menu.routeName);
  }
  if (menu.children) {
    keys.push(
      ...menu.children
        .map((item) =>
          getActiveKeyPathsOfMenu(activeKey, item as App.GlobalMenuOption)
        )
        .flat(1)
    );
  }

  return keys;
}

/**
 * 给菜单添加可选属性
 */
function addPartialProps(config: {
  menu: App.GlobalMenuOption;
  icon?: string;
  localIcon?: string;
  children?: App.GlobalMenuOption[];
}) {
  const { iconRender } = useIconRender();

  const menuItem = { ...config.menu };

  const { icon, localIcon, children } = config;

  if (icon) Object.assign(menuItem, { icon: iconRender({ icon }) });

  if (localIcon) Object.assign(menuItem, { icon: iconRender({ localIcon }) });

  if (children) Object.assign(menuItem, { children });

  return menuItem;
}

/** 路由不转换菜单 */
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}
