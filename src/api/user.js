// 封装登录和注册接口
import request from '@/utils/request.js'

// 登录接口
export const userLogin = async (userInfo) => {
  return await request.post('/api/login', userInfo)
}

// 注册接口
export const userRegister = async (userRegisterInfo) => {
  return await request.post('/api/register', userRegisterInfo)
}
