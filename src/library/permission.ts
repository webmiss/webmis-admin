import { useStore } from "vuex"

/*校验权限 */
export default class Permission {
  /* 动作权限校验 */
  public static isAction(action: string): boolean {
    // 状态
    const store = useStore();
    const list: Array<any> = store.state.menusAction;
    for(let v of list) {
      if(v['action']==action) return true;
    }
    return false;
  }
}
