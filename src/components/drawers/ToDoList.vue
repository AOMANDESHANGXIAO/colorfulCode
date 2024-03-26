<template>
  <div class="todoList">
    <!-- 这是学生在上课时必须完成的主任务 -->
    <!--    <todoMainTask></todoMainTask>-->
    <h1 class="header">总任务</h1>
    <h3 v-if="!isEdit" @dblclick="handleStartEdit" style="margin-bottom: 20px">
      {{ todoListStore.mainTask }}
    </h3>
    <el-input
      v-else
      v-model="todoListStore.mainTask"
      autofocus
      @blur="handleEndEdit"
      @keyup.enter="handleEndEdit"
      placeholder="粘贴你的总任务到此处..."
      type="textarea"
      style="margin-bottom: 20px"
    ></el-input>
    <h1 class="header">任务列表</h1>
    <div></div>
    <div id="app">
      <el-input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="将总任务拆分为小任务吧!按下回车添加"
        style="margin-bottom: 20px"
      />
      <div v-for="(todo, index) in todos" :key="todo.id" class="item">
        <span>{{ index + 1 }}. {{ todo.text }}</span>
        <div>
          <el-button @click="toggleTodo(index)" type="success">完成</el-button>
          <el-button @click="removeTodo(index)" type="danger">删除</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoListStore } from '@/stores/todoList.js'

const todoListStore = useTodoListStore()
const isEdit = ref(false)
const handleStartEdit = () => {
  isEdit.value = true
}
const handleEndEdit = () => {
  isEdit.value = false
}
// 定义状态变量
const todos = todoListStore.subTask

// 新增待办项
const newTodo = ref('')

function addTodo() {
  if (!newTodo.value.trim()) return
  todos.push({ id: Date.now(), text: newTodo.value, done: false })
  newTodo.value = ''
}

// 切换待办项的状态
function toggleTodo(index) {
  todos[index].done = !todos[index].done
}

// 删除待办项
function removeTodo(index) {
  todos.splice(index, 1)
}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  text-align: center;
  margin-bottom: 20px;
  background-color: @theme-color;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  color: white;
  border-radius: 5px;
}

.item {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  background-color: @theme-color;
  color: white;
  align-items: center;
  border-radius: 5px;
  padding: 0 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;
}
</style>
