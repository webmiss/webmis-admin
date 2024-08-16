import { createStore } from 'vuex'

export default createStore({
  state: {
    isLogin: false,        // 登录状态
    isPasswd: false,       // 是否默认密码
    token: '',             // 用户Token
    uinfo: {},             // 用户信息
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
