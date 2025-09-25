import { createStore } from 'vuex';

export default createStore({
  state: {
    lang: '',                             // 语言
    langs: {},                            // 语言包
    isLogin: false,                       // 登录状态
    isUinfo: false,                       // 修改信息
    isPasswd: false,                      // 修改密码
    token: '',                            // 用户Token
    uinfo: {},                            // 用户信息
    menusAction: [],                      // 动作菜单
    socket: null,                         // Socket
    // Msg
    msg: {gid: '', fid: '', title: '', img: '', num: 0, group: [], list: [], readId: 0},
    // 打印
    print: {show: false, sku: []},
    // 货品
    goods: {show: false, sku_id: '', photo: {refresh: false, id:'', ctime:'', wms_co_id:'', list:<any>[]}},
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
