// 这里按照 vue 插件机制, 创建一个自动注册组件的插件
import Pagination from '@/components/Pagination'
export default {
  install(Vue) {
    Vue.component('Pagination', Pagination) // 分页器
  }
}
