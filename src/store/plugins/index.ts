import type { PiniaPluginContext } from "pinia";
import { cloneDeep } from "lodash-es";

/**
 * setup语法的重置状态插件
 * @param context
 * @description 将'用setup语法的状态id'写入到setupSyntaxIds
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = ["setup-store"];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultState = cloneDeep($state);

    context.store.$reset = () => {
      context.store.$patch(defaultState);
    };
  }
}
