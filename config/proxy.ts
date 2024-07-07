import type { ProxyOptions } from "vite";

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param serviceEnvConfig - 服务端环境配置
 */
export function createProxyConfig(
  isOpenProxy: boolean,
  serviceEnvConfig: ServiceEnvConfigWithProxyPattern
) {
  if (!isOpenProxy) return undefined;

  const proxyConfig: Record<string, string | ProxyOptions> = {
    [serviceEnvConfig.proxyPattern]: {
      target: serviceEnvConfig.url,
      changeOrigin: true,
      rewrite: (path) =>
        path.replace(new RegExp(`^${serviceEnvConfig.proxyPattern}`), ""),
    },
  };

  return proxyConfig;
}
