import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 *  注意:子菜单只在子路由出现时。并且长度>= 1
 *
 * hidden: true                   如果设置为true，项目将不会显示在侧边栏(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当项目有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 *
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             name:'router-name'用于<keep-alive>(必须设置!!)
 * meta : {
    roles: ['admin','editor']    ['admin'，'editor']控制页面角色(可以设置多个角色)
    title: 'title'               显示在侧边栏和面包屑中的名称(推荐设置)
    icon: 'svg-name'/'el-icon-x' 图标显示在侧栏中
    breadcrumb: false            如果设置为false，项目将隐藏在Breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置了路径，侧边栏将突出显示您设置的路径
  }
 */
// 路由模块化
import employeesRouter from '@/router/modules/employees'

/**
*没有权限要求的基本页面
*所有角色都可以访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }

  // 404页面必须放在末尾 !!!
  // { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [
  employeesRouter
]

const createRouter = () => new Router({
  // mode: 'history', // 需要服务支持
  // base: 'admin',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
