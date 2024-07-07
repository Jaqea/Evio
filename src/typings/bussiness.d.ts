/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型
   * - super: 超级管理员
   * - admin: 管理员
   * - user: 用户
   */
  type RoleType = "super" | "admin" | "user";

  /**
   * 第三方登录类型
   */
  type ThirdPartyLoginType = "github" | "google";

  /** 用户信息 */
  interface UserInfo {
    /** 用户Id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色 */
    userRole: RoleType;
  }
}
