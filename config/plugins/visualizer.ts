import type { PluginOption } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default function setupVisualizer() {
  return visualizer({
    gzipSize: true,
    brotliSize: true,
    open: true,
  }) as unknown as PluginOption;
}
