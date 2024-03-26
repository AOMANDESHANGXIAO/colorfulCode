import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGptMessageStore = defineStore('gptMessage', () => {
  // 1. messageList element => isTeacher:Boolean, message: String
  const messagesList = ref([
    { isTeacher: true, message: '你好同学，我是编程小精灵，乐意帮助你解决编程中的问题!' }
  ])

  // 添加
  const pushNewMessage = (isTeacher, message) => {
    messagesList.value.push({ isTeacher, message })
  }
  // 清空
  const clearMessages = () => {
    messagesList.value = []
  }
  // 删除最后一个
  const deleteLastOne = () => {
    if (messagesList.value.length >= 1) {
      messagesList.value.length -= 1
    }
  }
  return {
    messagesList,
    pushNewMessage,
    clearMessages,
    deleteLastOne
  }
})
