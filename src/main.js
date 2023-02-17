import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // 全部 css
import '@/icons' // icon
import '@/permission' // 权限控制
import lodash from 'lodash'
// 统一注册全局组件
import Components from '@/components/index'
Vue.use(Components)
Vue.use(ElementUI)

Vue.prototype._ = lodash
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
