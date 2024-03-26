<!-- 这是live2d的封装组件 -->
<template>
  <div>
    <canvas id="canvas_view"></canvas>
  </div>
</template>

<script setup>
import { init } from '@/utils/live2d.js'
// import '@/utils/live2d.min.js'
// import '@/utils/live2dcubismcore.min.js'
import { onMounted } from 'vue'

onMounted(() => {
  init()
})
</script>

<style lang="less" scoped>
#canvas_view {
  width: 100%;
  height: 100%;
  z-index: 1000;
  // position: fixed;
  transform: scale(0.8) ;
  // top: 0;
  // background-color: red;
}
</style>
