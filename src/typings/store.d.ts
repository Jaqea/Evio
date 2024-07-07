declare namespace StoreState {
  interface Theme {
    darkMode: boolean;
    naiveThemeOverrides: Theme.Setting;
    sider: Theme.Sider;
  }
  interface App {
    /** 滚动元素id */
    scrollElId: string;
    /** 重载页面(控制页面显示) */
    reloadFlag: boolean;
    /**
     * 侧边栏折叠状态
     * true - 折叠
     * false - 不折叠
     */
    siderCollapse: boolean;
    /** 主体内容全屏 */
    contentFull: boolean;
  }
}
