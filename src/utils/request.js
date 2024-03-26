// 封装响应拦截器和请求拦截器
import axios from 'axios'
// 发送请求时给一个消息提示
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import router from '@/router/index.js'
// axios实例
const instance = axios.create({
  // 配置基本信息
  // 基地址配置
  baseURL: 'http://101.37.254.116:8889',
  // 开发环境配置
  // baseURL: 'http://localhost:8889',
  // 超时配置
  timeout: 30000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = useUserStore().token
    token ? (config.headers.Authorization = token) : null
    return config
  },
  function (config) {
    // 在发送请求之前做些什么
    // ElMessage({
    //   message: '正在发送请求...',
    //   type: 'info'
    // })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
// 约定，状态码不为两百的消息，都意味着通讯失败
// 每次收到的消息模板为
// {   status: XXX,
//     message: XXX,
//     data: {
//        xx1:xxx,
//        xx2:xxx,
//     }
// }
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    const res = response.data
    // 1. 如果收到401状态码那么就将用户的界面遣返回登录界面
    if (res.status === 401) {
      // 跳转到登录界面
      ElMessage({
        message: '登录过期，请重新登录',
        type: 'error'
      })
      useUserStore().clearUserToken('')
      useUserStore().setUserInfo({})
      // 跳转到登录界面
      router.push('/login')
      console.log('执行了?')
      return Promise.reject(res.message)
      // 清除token
      // 清除用户信息
      // 清除用户权限
    }
    // 对响应数据做点什么

    if (res.status !== 200) {
      // 抛出一个错误的提示
      ElMessage({
        message: res.message,
        type: 'error'
      })
      return Promise.reject(res.message)
    }
    ElMessage({
      message: res.message,
      type: 'success'
    })
    return res
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({
      message: '未知错误',
      type: 'error'
    })
    return Promise.reject(error)
  }
)
// 导出实例
export default instance
