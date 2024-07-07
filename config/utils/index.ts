import path from "path";

/**
 * 获取项目工作区根路径
 * @description 末尾不带斜杠\
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * 获取项目src路径
 * @param srcName - src目录名称
 * @description 末尾不带斜杠
 */
export function getSrcPath(srcName: string = "src") {
  return path.resolve(getRootPath(), srcName);
}
