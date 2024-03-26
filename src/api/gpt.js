// 这里向服务器发送请求
import request from '@/utils/request'

export const getGptResponse = async (messages) => {
  return await request.post('/gpt/help', messages)
}
