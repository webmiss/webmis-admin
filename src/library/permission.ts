import { useStore } from "vuex";

/*校验权限 */
export default class Permission {
  /* 动作权限校验 */
  public static isAction(action: string, menus: Array<any>=[]): boolean {
    let list: Array<any> = menus;
    if(list.length==0) {
      const store = useStore();
      list = store.state.menusAction;
    }
    for(let v of list) {
      if(v['action']==action) return true;
    }
    return false;
  }
}
