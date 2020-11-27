import RenderAuthorize from "../authorized";
import { IAuthorizedType } from "../authorized/Authorized";

// storage path标识
const path = "auth";

// 权限实例
let CustomAuthorized: IAuthorizedType;

/**
 * 获取当前用户所有权限
 * @returns {AuthKey[]}
 */
export function getAuthority(): string[] {
  const localAuth = window.localStorage.getItem(path);
  const getResult: string[] = localAuth ? JSON.parse(localAuth) : [];
  return getResult;
}

// 当前权限
const CURRENT = getAuthority();
// 权限实例，通过组件的render方法渲染
CustomAuthorized = RenderAuthorize(CURRENT);
const { check } = CustomAuthorized;

/**
 * 重新渲染权限的实例（当用户的权限变化时）
 * @param {CurrentAuthorityType[]} fillValue 如果需要同步，可手动将权限传进来
 */
export const reloadAuthorized = (fillValue = CURRENT) => {
  CustomAuthorized = RenderAuthorize(fillValue || CURRENT);
};

/**
 * 设置当前用户权限
 * @param {string[]} authority
 * @param {boolean} noReload // 设置权限时不重载权限实例
 */
export function setAuthority(authority: string[], noReload = false): void {
  const saveResult: string = JSON.stringify(authority);
  window.localStorage.setItem(path, saveResult);
  // 记入缓存时更新权限实例
  if (!noReload) {
    reloadAuthorized(authority);
  }
}

/**
 * 删除当前用户权限
 */
export function removeAuthority(): void {
  window.localStorage.removeItem(path);
}

/**
 * 提供一个纯函数来判断是否命中权限
 * @param {CurrentAuthorityType[]} authority 当前操作权限
 * @returns {Boolean} bool判断命中
 */
const hasPermission = (
  authority: string | string[] | undefined,
  allowCheck?: boolean
): boolean => check(authority, true, false, allowCheck) as boolean;
CustomAuthorized.hasPermission = hasPermission;

/**
 * 提供一个纯函数来判断是否命中每一个权限
 * @param {CurrentAuthorityType[]} authority 当前操作权限
 * @returns {Boolean} bool判断命中
 */
const hasEveryPermission = (
  authority: string | string[] | undefined,
  allowCheck?: boolean
): boolean => {
  // undefined || string || allowCheck = false
  if (
    !allowCheck ||
    !authority ||
    Object.prototype.toString.call(authority) === "[object String]"
  ) {
    return hasPermission(authority, allowCheck);
  }
  // array loop
  return (authority as string[]).every((auth) => hasPermission(auth));
};
CustomAuthorized.hasEveryPermission = hasEveryPermission;

export default CustomAuthorized;
