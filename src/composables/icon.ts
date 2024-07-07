import { h } from "vue";
import SvgIcon from "@/components/custom/svg-icon.vue";

/**
 * 图标渲染
 * - 用于vue的render函数
 */
export const useIconRender = () => {
  interface IconConfig {
    /** Iconify 图标名称 */
    icon?: string;
    /** 本地 svg 图标文件名 */
    localIcon?: string;
    /** 图标颜色 */
    color?: string;
    /** 图标大小 */
    fontSize?: number;
  }

  interface IconStyle {
    color?: string;
    fontSize?: string;
  }

  /**
   * 图标渲染
   * @param config
   * @property icon
   * @property localIcon
   * @property color
   * @property fontSize
   */
  const iconRender = (config: IconConfig) => {
    const { icon, localIcon, color, fontSize } = config;

    const style: IconStyle = {};

    if (color) {
      style.color = color;
    }

    if (fontSize) style.fontSize = `${fontSize}px`;

    if (!icon && !localIcon)
      throw Error("未传递图标名称，请确保给icon或localIcon传递有效值!");

    return () => h(SvgIcon, { icon, localIcon, style });
  };

  return { iconRender };
};
