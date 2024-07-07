import { defineStore } from "pinia";
import { nextTick } from "vue";

export const useAppStore = defineStore("app-store", {
  state: (): StoreState.App => ({
    /** 滚动元素id */
    scrollElId: "__SCROLL_EL_ID__",
    /** 重载页面 */
    reloadFlag: true,
    /** 侧边栏隐藏 */
    siderCollapse: false,
    /** 主体内容全屏 */
    contentFull: false,
  }),
  actions: {
    /**
     * 获取滚动配置
     */
    getScrollConfig() {
      const scrollEl = document.querySelector(`#${this.scrollElId}`);

      const { scrollLeft = 0, scrollTop = 0 } = scrollEl || {};

      return {
        scrollEl,
        scrollLeft,
        scrollTop,
      };
    },
    /**
     * 重载页面
     * @param duration - 重载延迟时间(ms)
     */
    async reloadPage(duration = 0) {
      this.reloadFlag = false;
      await nextTick();
      if (duration) {
        setTimeout(() => {
          this.reloadFlag = true;
        }, duration);
      } else this.reloadFlag = true;
      setTimeout(() => {
        document.documentElement.scrollTo({ left: 0, top: 0 });
      }, 100);
    },
    /** 展开/折叠侧边栏折 */
    toggleSiderCollapse() {
      this.siderCollapse = !this.siderCollapse;
    },
    /** 设置主体内容全屏 */
    setContentFull(full: boolean) {
      this.contentFull = full;
    },
  },
});
