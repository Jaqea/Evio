import { defineConfig, loadEnv } from "vite";
import {
  createAliasConfig,
  createProxyConfig,
  setupVitePlugin,
} from "./config";
import { getServiceConfig } from "./.env.config";

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd(), "") as unknown as ImportMetaEnv;

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === "Y";
  const serviceConfig = getServiceConfig(viteEnv);

  return {
    base: viteEnv.VITE_BASE_URL,
    define: {},
    resolve: {
      alias: createAliasConfig(),
    },
    plugins: setupVitePlugin(viteEnv),
    css: {},
    optimizeDeps: {},
    server: {
      host: "0.0.0.0",
      port: 3200,
      open: true,
      proxy: createProxyConfig(isOpenProxy, serviceConfig),
      // 解决请求路径不在vite的允许范围内
      fs: {
        strict: false,
      },
    },
    build: {
      /** 禁用 gzip 压缩大小报告 */
      reportCompressedSize: false,
      /** 构建后创建独立的 source map 文件 */
      sourcemap: true,
      commonjsOptions: {
        ignoreTryCatch: true,
      },
    },
  };
});
