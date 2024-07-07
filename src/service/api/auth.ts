/**
 * 获取验证码
 * @oaram phone - 手机号码
 * @returns - 返回boolean值是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return {};
}

/**
 * 登录
 * @param userName - 用户名
 * @param password - 密码
 */
export function fetchLogin(userName: string, password: string) {
  return {
    data: {
      token: "1",
      refreshToken: "1",
    },
  };
}

/**
 * 获取用户信息
 */
export function fetchUserInfo(): { data: Auth.UserInfo } {
  return {
    data: {
      userId: "",
      userName: "",
      userRole: "user",
    },
  };
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return {};
}

/**
 * 刷新token
 * @param	refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return {
    data: {
      token: "newToken~",
      refreshToken: "refreshToken~",
    },
  };
}
