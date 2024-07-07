declare namespace UnionKey {
  /** http请求头的Content-Type类型 */
  type ContentType =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data";

  /**
   * 布局组件的名称
   * - basic 基础布局
   * - blank 空白布局
   */
  type LayoutComponentType = "basic" | "blank";

  /**
   * 登录模块
   * - pwd-login: 账号登录
   * - code-login: 手机验证码登录
   * - register: 注册
   * - reset-pwd: 重置密码
   * - bind-wechat: 微信绑定
   */
  type LoginModule =
    | "pwd-login"
    | "code-login"
    | "register"
    | "reset-pwd"
    | "bind-wechat";
}
