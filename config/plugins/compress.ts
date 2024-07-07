import ViteCompression from "vite-plugin-compression";

export default function setupCompression(viteEnv: ImportMetaEnv) {
  const { VITE_COMPRESS_TYPE } = viteEnv;

  return ViteCompression({ algorithm: VITE_COMPRESS_TYPE });
}
