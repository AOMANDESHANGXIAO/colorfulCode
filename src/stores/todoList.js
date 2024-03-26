import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoListStore = defineStore('todoList', () => {
  const mainTask = ref('暂时没有任务...双击编辑')
  const subTask = ref([])
  return {
    mainTask,
    subTask
  }
})
