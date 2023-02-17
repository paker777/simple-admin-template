import Layout from '@/layout'

export default {
  name: 'Employees',
  // 外层路由地址
  path: '/employees',
  meta: {
    title: '员工管理',
    icon: 'table'
  },
  // 默认显示布局组件, 有菜单等结构
  component: Layout,
  children: [
    // 嵌套在布局的二级路由
    {
      name: 'EmployeesIndex',
      // path 没有设定就是默认显示在父路由中
      path: 'employees-index',
      // 中间主要内容的嵌套
      component: () => import('@/views/employees/index.vue'),
      // 设定 meta 决定在菜单中如何显示 (花裤衩封装的功能)
      meta: {
        title: '员工管理页',
        icon: 'table'
      }
    },
    {
      name: 'EmployeesDetail',
      // path 没有设定就是默认显示在父路由中
      path: 'employees-detail',
      // 中间主要内容的嵌套
      component: () => import('@/views/employees/detail.vue'),
      meta: {
        title: '员工详情',
        icon: 'table'
      }
      // hidden: true
      // 设定 meta 决定在菜单中如何显示 (花裤衩封装的功能)
    }
  ]
}
