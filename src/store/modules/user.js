// 状态
const state = {
  userInfo: {},
  token: localStorage.getItem('user_token') || ''
}
// 修改状态
const mutations = {
  setToken(state, token) {
    state.token = token
    localStorage.setItem('user_token', token)
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
  removeToken(state) {
    state.token = ''
    localStorage.removeItem('user_token')
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }

}
// 执行异步
const actions = {
  // 退出登录
  logout(store) {
    store.commit('removeToken')
    store.commit('removeUserInfo')
  },
  // 模拟登录
  login(store, form) {
    /*
     *写登录请求获取token
     */
    // 登录成功, 除了触发 token 记录以外, 还要注意记录时间
    // 方便下次发送请求时, 校验时间是否超时
    // localStorage.setItem("timestamp", Date.now());
    const token = '模拟token'
    store.commit('setToken', token)
  },
  // 获取用户信息
  async getUserInfo(store) {
    // 模拟用户信息请求
    // const detail = await getUserDetail(res.userId)
    const res = await new Promise((resolve) => {
      resolve({
        // ...res,
        // ...detail
        // 模拟用户信息
        username: 'admin',
        roles: {
          menus: ['Employees']
        }
      })
    })
    store.commit('setUserInfo', res)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
