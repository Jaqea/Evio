declare namespace AuthRoute {
  type RootRoutePath = "/";

  type NotFoundRoutePath = "/:pathMath(.*)*";

  type RootRouteKey = PageRoute.RootRouteKey;

  type NotFoundRouteKey = PageRoute.NotFoundRouteKey;

  type RouteKey = PageRoute.RouteKey;

  type AllRouteKey = PageRoute.RootRouteKey | PageRoute.RouteKey;

  type LastDegreeRouteKey = PageRoute.LastDegreeRouteKey;

  type RouteComponentType = "basic" | "blank" | "multi" | "self" | "chat";

  type RoutePath<K extends AllRouteKey = AllRouteKey> =
    AuthRouteUtils.GetRoutePath<K>;

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        /** 路由名称(唯一标识) */
        name: K;
        /** 路由路径 */
        path: RoutePath;
        /** 路由重定向 */
        redirect?: RoutePath; // 如果传递泛型参数会计算出某个类型，而不是所有满足的类型，因此会报错
        /**
         * 路由组件
         * - basic - 基础布局，具有公共部分的布局
         * - blank - 空白布局
         * - multi - 多级路由布局
         * - self - 作为子路由，使用自身的布局
         */
        component?: RouteComponentType;
        /** 子路由 */
        children?: Route[];
        /** 路由描述 */
        meta: RouteMeta;
      } & Omit<
        import("vue-router").RouteRecordRaw,
        "name" | "path" | "redirect" | "component" | "children" | "meta"
      >
    : never;

  interface RouteMeta {
    /** 路由标题 */
    title: string;
    /** 需要登录权限 */
    requiresAuth?: boolean;
    /**  哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限) */
    permissions?: Auth.RoleType[];
    /** 路由的动态路径 */
    dynamicPath?: AuthRouteUtils.GetDynamicPath<RoutePath>;
    /** 作为单级路由的父级路由布局组件 */
    singleLayout?: Extract<RouteComponentType, "basic" | "blank">;
    /** 菜单对应图标 */
    icon?: string;
    /** 菜单对应的本地图标 */
    localIcon?: string;
    /** 是否在菜单中隐藏 */
    hide?: boolean;
    /** 是否是多级路由的中间级路由 */
    multi?: boolean;
    /** 路由顺序, 用于菜单的排序 */
    order?: number;
    /** 当前路由需要选中的菜单项 */
    activeMenu?: Routekey;
  }

  /** 导入的路由模块 */
  type RouteModule = Record<string, { default: Route }>;
}

declare namespace AuthRouteUtils {
  /** 路由key层级分割符 */
  type RouteKeySplitMark = "_";
  /** 路由path层级分割符 */
  type RoutePathSplitMark = "/";
  /** 空白字符 */
  type BlankString = "";

  type KeyToPath<K extends string> =
    K extends `${infer _Left}${RouteKeySplitMark}${RouteKeySplitMark}${infer _Right}`
      ? never
      : K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
      ? Left extends BlankString
        ? never
        : Right extends BlankString
        ? never
        : KeyToPath<`${Left}${RoutePathSplitMark}${Right}`>
      : `${RoutePathSplitMark}${K}`;

  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> =
    K extends AuthRoute.AllRouteKey
      ? K extends AuthRoute.RootRouteKey
        ? AuthRoute.RootRoutePath
        : K extends AuthRoute.NotFoundRouteKey
        ? AuthRoute.NotFoundRoutePath
        : KeyToPath<K>
      : never;

  /** 获取一级路由(有子路由的一级路由和没有子路由的路由) */
  type GetFirstDegreeRouteKey<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey
  > = K extends `${infer _Left}${RouteKeySplitMark}${infer _Right}` ? never : K;

  /** 获取有子路由的一级路由 */
  type GetFirstDegreeRouteKeyWithChildren<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey
  > = K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
    ? Left
    : never;

  /** 单级路由的key */
  type SingleRouteKey = Exclude<
    GetFirstDegreeRouteKey,
    | GetFirstDegreeRouteKeyWithChildren
    | AuthRoute.RootRouteKey
    | AuthRoute.NotFoundRouteKey
  >;

  /** 单级路由父级路由key */
  type SingleRouteParentKey = `${SingleRouteKey}-parent`;

  /** 单级路由父级路由path */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>;

  type GetDynamicPath<P extends AuthRoute.RoutePath> =
    | `${P}/:${string}`
    | `${P}/:${string}(${string})`
    | `${P}/:${string}(${string})?`;
}
