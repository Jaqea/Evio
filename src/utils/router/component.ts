import type { RouteComponent } from "vue-router";
import { BasicLayout, BlankLayout } from "@/layouts";
import { views } from "@/views";

type Lazy<T> = () => Promise<T>;

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<
  UnionKey.LayoutComponentType,
  Lazy<ModuleComponent>
>;

/**
 * 获取布局的vue文件(懒加载)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: UnionKey.LayoutComponentType) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  };

  return layoutComponent[layoutType];
}

/**
 * 获取页面导入的vue文件
 * @param routeKey - 路由key
 */
export function getViewComponent(rootKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[rootKey]) throw new Error(`路由“${rootKey}”没有对应的组件文件`);

  return views[rootKey];
}

/** 给页面组件设置名称 */
// function setViewComponentName(component: RouteComponent | Lazy<ModuleComponent>,name:string) {

// }
