// 导航守卫
// 引入
import router from '@/router'
import store from '@/store'

// 导航守卫
router.beforeEach(async(to, from, next) => {
  const token = store.getters.token
  const url = to.path
  const whiteList = ['/login', '/404'] // 白名单
  // 已登录,去登录页
  if (token && url === '/login') {
    next('/')
  }
  // 已登录,去登录页之外的页面
  if (token && url !== '/login') {
    // 读取用户数据筛选路由
    // 在进入每个后台页面之前, 保证有用户数据
    // 确认用户数据是否存在, 如果不存在, 则获取数据
    if (Object.keys(store.state.user.userInfo).length === 0) {
      await store.dispatch('user/getUserInfo')
      // 拿完数据之后, 进入页面之前, 就是触发路由权限筛选的位置
      const routes = await store.dispatch(
        'permission/filterRoutes',
        store.state.user.userInfo.roles.menus
      )
      // 路由自带的追加配置的函数
      router.addRoutes([
        ...routes,
        { path: '*', redirect: '/404', hidden: true }
      ])
      next(to.path)
      return
    }
    next()
  }
  // 未登录,去白名单
  if (!token && whiteList.includes(url)) {
    next()
  }
  // 未登录,去白名单之外的页面
  if (!token && !whiteList.includes(url)) {
    next('/login')
  }
})

