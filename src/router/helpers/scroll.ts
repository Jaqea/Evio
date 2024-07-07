import type { RouterScrollBehavior } from "vue-router";
import { useAppStore } from "@/store";

export const scrollBehavior: RouterScrollBehavior = (to, from) => {
  return new Promise((resolve) => {
    const app = useAppStore();

    if (to.hash) {
      const el = document.querySelector(to.hash);
      if (el) {
        resolve({
          el,
          behavior: "smooth",
        });
      }
    }

    const { scrollEl, scrollLeft, scrollTop } = app.getScrollConfig();

    setTimeout(() => {
      if (scrollEl) {
        resolve({
          left: 0,
          top: 0,
          behavior: "smooth",
        });
      }
    }, 400);
  });
};
