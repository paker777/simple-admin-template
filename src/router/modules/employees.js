import Layout from '@/layout'

export default {
  name: 'Employees',
  path: '/employees',
  meta: {
    title: '员工管理',
    icon: 'table'
  },
  component: Layout,
  children: [
    {
      name: 'EmployeesIndex',
      path: 'employees-index',
      component: () => import('@/views/employees/index.vue'),
      meta: {
        title: '员工管理页',
        icon: 'table'
      }
    },
    {
      name: 'EmployeesDetail',
      path: 'employees-detail',
      component: () => import('@/views/employees/detail.vue'),
      meta: {
        title: '员工详情',
        icon: 'table'
      }
      // hidden: true
    }
  ]
}
