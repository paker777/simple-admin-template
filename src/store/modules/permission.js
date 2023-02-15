import { asyncRoutes, constantRoutes } from '@/router'

const state = {
  // 因为路由已经根据权限进行切割, 不能再用默认的
  // 路由配置进行菜单显示, 希望在 vuex 当中拼接需要的路由配置
  // 真正的菜单应该是 静态路由 + 筛选后的动态路由
  routes: []
}
const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}

const actions = {
  filterRoutes(store, menus) {
    // 这个函数负责过滤路由, 需要传入当前用户的权限列表 menus
    const routes = asyncRoutes.filter(route => menus.includes(route.name))
    // const routes = asyncRoutes.filter((route) => true)
    // 调用 mutations 拼接菜单路由配置
    store.commit('setRoutes', routes)
    // 返回数据, 进行 url 访问的恢复
    return routes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
