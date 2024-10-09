import { createStore } from 'vuex'

export default createStore({
  state: {
    lang: '',            // 语言
    langs: {},           // 语言包
    isLogin: false,      // 登录状态
    isUinfo: false,      // 修改信息
    isPasswd: false,     // 修改密码
    token: '',           // 用户Token
    uinfo: {},           // 用户信息
    menusAction: [],     // 动作菜单
    socket: null,        // Socket
    msg: {gid:'', fid:'', num: 0, list: []},     // Msg
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
