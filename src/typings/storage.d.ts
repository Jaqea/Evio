declare namespace StorageInterface {
  /** localStorage的存储数据 */
  interface Local {
    /** 用户token */
    token: string;
    /** 用户刷新token */
    refreshToken: string;
    /** 用户信息 */
    userInfo: Auth.UserInfo;
    /** 多页签路由信息 */
  }

  /** sessionStorage的存储数据 */
  interface Session {
    /** 主题颜色 */
    themeColor: string;
    /** 主题配置 */
    themeSettings: Theme.Setting;
  }
}
