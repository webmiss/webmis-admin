/* 本地硬盘 */
export default class Storage {

  /* 保存 */
  public static setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  /* 获取 */
  public static getItem(key: string): string|null {
    return window.localStorage.getItem(key);
  }

  /* 删除 */
  public static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  /* Session 保存 */
  public static setSessionItem(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  }

  /* Session 获取 */
  public static getSessionItem(key: string): string|null {
    return window.sessionStorage.getItem(key);
  }

  /* Session 删除 */
  public static removeSessionItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

}