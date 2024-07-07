import { naiveThemeOverrides } from "@/settings";
import { sessionStg } from "@/utils";

/** 初始化主题配置 */
export function initThemeSettings(darkMode = false): StoreState.Theme {
  const isProd = import.meta.env.PROD;
  // 生产环境才缓存主题配置，本地开发实时调整配置
  const storageSettings = sessionStg.get("themeSettings");

  if (isProd && storageSettings) return storageSettings;

  const setting: StoreState.Theme = {
    darkMode,
    naiveThemeOverrides,
    sider: {
      width: 250,
      collapsedWidth: 64,
    },
  };

  return setting;
}
