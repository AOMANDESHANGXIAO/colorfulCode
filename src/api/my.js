// 获取用户的基本信息及其他数据模块
import request from '@/utils/request'



// 1. 获取基本信息，昵称、username，其他的不要
export const getUserInfo = async () => {
  // 获取token
  return await request.get('/my/info')
}

// 2. 获取notebook信息
export const getNoteBook = async () => {
  return await request.get('/my/notebook')
}