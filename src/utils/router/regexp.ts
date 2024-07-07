/** 获取登录页面模块的动态路由正则 */
export function getLoginModuleRegExp() {
  const modules: UnionKey.LoginModule[] = [
    "bind-wechat",
    "code-login",
    "pwd-login",
    "register",
    "reset-pwd",
  ];

  return modules.join("|");
}
