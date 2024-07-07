import { transformObjectToOption } from "./_shared";

export const loginModuleLabels: Record<UnionKey.LoginModule, string> = {
  "pwd-login": "密码登录",
  "code-login": "验证码登录",
  register: "注册",
  "reset-pwd": "重置密码",
  "bind-wechat": "绑定微信",
};

export const userRoleLabels: Record<Auth.ThirdPartyLoginType, string> = {
  github: "Github登录",
  google: "Google谷歌登录",
};

export const userRoleOptions = transformObjectToOption(userRoleLabels);
