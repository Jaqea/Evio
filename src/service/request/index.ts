import { getServiceConfig } from "~/.env.config";
import { createRequest } from "./request";

const { url, proxyPattern } = getServiceConfig(import.meta.env);

const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === "Y";

export const request = createRequest({
  baseURL: isHttpProxy ? proxyPattern : url,
});
