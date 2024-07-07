// 后端接口返回的数据类型

/** 后端返回的用户权限相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
  }

  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}
