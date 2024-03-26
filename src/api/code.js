// 处理用户提交代码
import request from '@/utils/request'

export const handleSumbitCode = async (obj) => {
  return await request.post('/code/sumbit', obj)
}