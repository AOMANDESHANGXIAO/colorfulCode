import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCodeStore } from '@/stores'
import { useTodoListStore } from '@/stores/todoList.js'

export const usePromptStore = defineStore('promptsStore', () => {
  // 这里存储表面上显示的prompts
  const showPrompts = ref([
    '你好小精灵!请帮我修正代码中的错误!',
    '你好小精灵!请帮我依据当前的任务生成代码支架!',
    '你好小精灵!请帮我优化我的代码!',
    '你好小精灵!请根据我的当前任务生成相似的练习'
  ])

  const codeStore = useCodeStore()
  // 这是实际上发出去的
  const findErrorPrompt = (selectedId) => {
    return new Promise((resolve, reject) => {
      if (codeStore.findModuleLById(selectedId).code === '') {
        reject(new Error('用户尚未编写代码'))
      } else {
        resolve(
          `回复字数限制为30字。请帮我纠正代码中的错误!这是我的代码!${codeStore.findModuleLById(selectedId).code}`
        )
      }
    })
  }
  const codeSupportPrompt = (selectedId) => {
    return new Promise((resolve, reject) => {
      if (codeStore.findModuleLById(selectedId).description === '') {
        reject(new Error('还没有添加模块描述'))
      } else {
        console.log(
          `回复字数限制为30字。请用Python注释的形式为我生成代码支架!${codeStore.findModuleLById(selectedId).code}`
        )
        resolve(
          `回复字数限制为30字。请用Python注释的方式描述如何使用代码解决这个问题!这是我的问题:${codeStore.findModuleLById(selectedId).description}。回复示范：1. 首先要XXX 2. 然后要XXX。注意不要直接写代码`
        )
      }
    })
  }
  const codeSuggestionPrompt = (selectedId) => {
    return new Promise((resolve, reject) => {
      if (codeStore.findModuleLById(selectedId).code === '') {
        reject(new Error('用户尚未编写代码'))
      } else {
        console.log(
          `回复字数限制为30字。请指出我的代码有哪些需要改进的地方，可以如何优化:${codeStore.findModuleLById(selectedId).code}`
        )
        resolve(
          `回复字数限制为30字。请指出我的代码有哪些需要改进的地方，可以如何优化:${codeStore.findModuleLById(selectedId).description}。回复示范：1. XXX 2. XXX。`
        )
      }
    })
  }
  const todoListStore = useTodoListStore()
  const similarTask = () => {
    return new Promise((resolve, reject) => {
      if (todoListStore.mainTask === '') {
        reject(new Error('你的总任务为空'))
      } else {
        resolve(
          `回复字数限制为30字。请提供一个相似的编程任务给我。原任务:${todoListStore.mainTask}。`
        )
      }
    })
  }
  const generatePrompt = (index, selectedId) => {
    // 这是生成提示词的方法
    if (index === 0) {
      return findErrorPrompt(selectedId)
    } else if (index === 1) {
      return codeSupportPrompt(selectedId)
    } else if (index === 2) {
      return codeSuggestionPrompt(selectedId)
    } else {
      return similarTask()
    }
  }

  return {
    showPrompts,
    generatePrompt
  }
})
