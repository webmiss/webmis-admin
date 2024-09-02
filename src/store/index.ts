import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,      // 登录状态
    isUinfo: false,      // 修改信息
    isPasswd: false,     // 修改密码
    token: '',           // 用户Token
    uinfo: {},           // 用户信息
    menusAction: [],     // 动作菜单
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
