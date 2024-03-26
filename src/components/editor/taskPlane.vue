<template>
  <div class="draggable" @mousedown="dragStart" @mousemove="drag" @mouseup="dragEnd">
    <div class="header">
      😊任务板😊
      <div class="btn">
        <button @click="minimize">最小化</button>
        <button @click="restore">还原</button>
      </div>
    </div>
    <textarea
      v-model="codeStore.codeTask"
      placeholder="粘贴你的任务在这里以供CodeSprite使用..."
      :style="{ height: isMinimized ? '0px' : '300px' }"
    ></textarea>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCodeStore } from '@/stores'
let dragging = ref(false)
let position = ref({ x: 0, y: 0 })
let isMinimized = ref(false)
const dragStart = (event) => {
  dragging.value = true
  position.value = {
    x: event.clientX - event.currentTarget.offsetLeft,
    y: event.clientY - event.currentTarget.offsetTop
  }
}
onMounted(() => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  position.value = {
    x: width - 300,
    y: height - 200
  }
})
const drag = (event) => {
  if (!dragging.value) return
  event.currentTarget.style.left = `${event.clientX - position.value.x}px`
  event.currentTarget.style.top = `${event.clientY - position.value.y}px`
}

const dragEnd = () => {
  dragging.value = false
}
const minimize = () => {
  isMinimized.value = true
}

const restore = () => {
  isMinimized.value = false
}

// 绑定用户正在编写的代码
const codeStore = useCodeStore()
</script>

<style scoped lang="less">
.draggable {
  position: fixed;
  top: 0;
  left: 0;
  cursor: move;
  z-index:1000;
  .header {
    position: relative;
    height: 30px;
    width: 100%;
    background-color: @theme-color;
    border-radius: 10px 10px 0 0;
    color: white;
    line-height: 30px;
    text-align: center;
    .btn {
      position: absolute;
      top: 0;
      right: 0;
      margin-right: 20px;
    }
    button {
      color: white;
      background-color: @theme-color;
      border: none;
      margin-right: 3px;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
textarea {
  width: 300px;
  height: 300px;
  display: block;
  background-color: black;
  transition: all .5s;
  padding: 20px;
  color: white;
  border: 3px solid @theme-color;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: @font-size-normal;
  &:focus {
    outline: none;
  }
}
</style>
