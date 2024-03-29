import { createStore } from 'vuex'

export default createStore({
  state: {
    mode: 'light',      //模式: light(浅色)、dark(深色)
    width: 0,           //宽
    height: 0,          //高
    statusHeight: 0,    //状态栏
    scan: null,         //摄像头
    /* 用户 */
    isLogin: '',        //登录状态
    uInfo: {},          //用户信息
    system: {},         //系统信息
    geolocation: {},    //定位
    socket: null,       //Socket
    /* 菜单 */
    menus: [],          //全部菜单
    menuAction: [],     //动作菜单
    menuTitle: [],      //菜单名称
    /* 消息 */
    msg: {show: false, key:'', seaList:[], gid:'', fid:'', title:'', content:'', num: 0, list:[]},
  },
  getters: {
    /* 动作菜单 */
    actionShow: (state) => (action: string) => {
      let res: boolean = false;
      state.menuAction.map(v=>{
        if((v['action'] as any)==action) res=true;
      });
      return res;
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
})
