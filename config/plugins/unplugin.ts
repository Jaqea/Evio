import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { getSrcPath } from "../utils";

export default function setupUnplugin(viteEnv: ImportMetaEnv) {
  const { VITE_ICON_PREFIX, VITE_ICON_LOCAL_PREFIX } = viteEnv;

  const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/svg-icon`;

  const collectionName = VITE_ICON_LOCAL_PREFIX.replace(
    `${VITE_ICON_PREFIX}-`,
    ""
  );

  return [
    Icons({
      compiler: "vue3",
      customCollections: {
        [collectionName]: FileSystemIconLoader(localIconPath, (svg) =>
          svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
        ),
      },
      scale: 1,
      defaultClass: "inline-block",
    }),
    Components({
      dirs: ["src/components"],
      dts: "src/typings/component.d.ts",
      types: [
        {
          from: "vue-router",
          names: ["RouterLink", "RouterView"],
        },
      ],
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({
          prefix: VITE_ICON_PREFIX,
          customCollections: collectionName,
        }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [localIconPath],
      symbolId: `${VITE_ICON_LOCAL_PREFIX}-[dir]-[name]`,
      inject: "body-last",
      customDomId: "__SVG_ICON_LOCAL__",
    }),
  ];
}
