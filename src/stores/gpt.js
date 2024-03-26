// 这里存放gpt的回复
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useGptStore = defineStore('gpt', () => {
  // 提供一个列表存放数据
  const chatMessagesList = ref([
    {
      message:
        '你好，同学！我是编程精灵🧚‍♀️,能够帮助解决你在编程中遇到的问题, 请编写代码后点击下方⬇️的按钮与我互动吧!',
      isTeacher: true
    }
  ])
  // 提供一个方法插入对话
  const pushChat = (newChat) => {
    // 传递格式 newChat => { sprite:XXXXX, student: XXXX }
    chatMessagesList.value.push(newChat)
  }
  // 替换当前的数据
  const changeMessage = (newMessage) => {
    const newestIndex = chatMessagesList.value.length - 1
    chatMessagesList.value[newestIndex] = newMessage
  }
  return {
    chatMessagesList,
    pushChat,
    changeMessage
  }
})
