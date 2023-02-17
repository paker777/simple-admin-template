// 引入 axios 库
import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

// 创建 axios 实例
const service = axios.create({
  // process.env 是脚手架工具获取环境变量的属性
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// token过期时间处理函数
const checkTimeout = () => {
  const timeout = 1000 * 60 * 60 * 2
  const now = Date.now()
  const loginTime = localStorage.getItem('timestamp')
  return now - loginTime > timeout
}

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    if (checkTimeout()) {
      // 清理数据, 跳转登录页, 阻止当前请求
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('登录已超时'))
    }

    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 成功返回数据
    if (res.data.success) {
      // 请求成功数据也没问题, 返回最终的结果
      return res.data.data
    } else {
      // 提示用户
      Message.error(res.data.message)
      // 阻止当前请求
      return Promise.reject(new Error(res.data.message))
    }
  },
  (err) => {
    // 网络请求完全失败, 如写错 url, 或者断网, 或者服务器崩溃
    if (err.response && err.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    }
    Message.error(err.message)
    return Promise.reject(err)
  }
)

// 导出实例
export default service
