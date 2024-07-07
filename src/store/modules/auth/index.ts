import { unref, nextTick } from "vue";
import { defineStore } from "pinia";
import { clearAuthStorage, getToken, getUserInfo } from "./helpers";
import { useRouteStore } from "@/store";
import { useRouterPush } from "@/composables";
import { router } from "@/router";
import { localStg } from "@/utils";
import { fetchLogin, fetchUserInfo } from "@/service";

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore("auth-store", {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    isLogin(state) {
      return state.token;
    },
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }

      nextTick(() => {
        resetRouteStore();
      });
    },
    /**
     * 处理登录后成功或失败的逻辑
     * @param backendToken - 返回的token
     */
    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const route = useRouteStore();
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
        await route.initAuthRoute();

        toLoginRedirect();

        if (route.isInitAuthRoute) {
          window.$notification?.success({
            title: "登录成功",
            content: "欢迎回到 Ai Chat 云平台",
            duration: 3000,
          });
        }

        return;
      }

      this.resetAuthStore();
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      let successFlag = false;

      const { token, refreshToken } = backendToken;
      localStg.set("token", token);
      localStg.set("refreshToken", refreshToken);

      // 获取用户信息
      const { data } = await fetchUserInfo();
      if (data) {
        localStg.set("userInfo", data);
        this.userInfo = data;
        this.token = token;

        successFlag = true;
      }

      return successFlag;
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;
      const { data } = await fetchLogin(userName, password);
      if (data) {
        await this.handleActionAfterLogin(data);
      }

      this.loginLoading = false;
    },
  },
});
