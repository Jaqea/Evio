import { defineStore } from "pinia";
import { initThemeSettings } from "./helpers";
import { darkTheme } from "naive-ui";

export const useThemeStore = defineStore("theme-store", {
  state: (): StoreState.Theme => initThemeSettings(false),
  getters: {
    naiveTheme(state) {
      return state.darkMode ? darkTheme : undefined;
    },
  },
  actions: {
    changeNaiveTheme() {
      this.darkMode = !this.darkMode;
    },
  },
});
