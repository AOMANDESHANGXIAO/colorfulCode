<!-- 这是编辑器的头部标题模块 -->
<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'editorHeader'
})
const drawer1 = ref(false)
const handleOpenTaskList = () => {
  // 打开任务单代码
  drawer1.value = true
}
const drawer2 = ref(false)
const handleOpenNoteBook = () => {
  drawer2.value = true
}
</script>

<template>
  <div class="header">
    <div>✨✨✨Welcome to Colorful code.✨✨✨</div>
    <div class="task">
      <div class="item">
        <div >代码记录CodeRecord</div>
        <el-tooltip placement="left" content="打开代码笔记" effect="light">
          <div class="item icon" @click="handleOpenNoteBook"><myNoteIcon :size="'30'"></myNoteIcon></div
        ></el-tooltip>
      </div>
      <div class="item">
        <div class="item">任务单TodoList</div>
        <el-tooltip placement="left" content="打开任务单" effect="light">
          <div class="item icon" @click="handleOpenTaskList"><taskIcon :size="'30'"></taskIcon></div
        ></el-tooltip>
      </div>
    </div>
  </div>
  <el-drawer
    v-model="drawer1"
    title="任务清单🥪🍗🍖"
  >
    <ToDoList></ToDoList>
  </el-drawer>
  <el-drawer v-model="drawer2" title="代码记录模块">
    <CodeModule></CodeModule>
  </el-drawer>
</template>

<script setup>
</script>

<style lang="less" scoped>
.header {
  background-color: rgba(40, 44, 52, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  font-size: 33px;
  font-weight: 300;
  // text-align: left;
  padding-left: 30px;
  line-height: 50px;
  color: white;
  .task {
    display: flex;
    // justify-content: center;
    align-items: center;
    gap: 5px;
    margin-right: 15px;
    font-size: 22px;
    .item {
      display: flex;
      align-items: center;
      margin-left: 10px;
    }
    .icon {
      &:hover {
        cursor: pointer;
      }
    }
  }
  // box-shadow: 0px 1px 2px #2b333e;
}
</style>
