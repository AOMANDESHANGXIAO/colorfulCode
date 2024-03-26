<template>
  <div class="header" @mousedown="handleMouseDown" @mouseup="handleMouseUp">
    <div class="title">代码输出如下</div>
    <div class="functionList">
      <el-tooltip effect="light" placement="top" content="清除输出">
        <div @click.stop="handleClearResults">
          <deleteIcon :size="'20'" class="item"></deleteIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="left" content="最小化/最大化">
        <div @click.stop="limitWidthEvent"><minIcon :size="'20'" class="item"></minIcon></div>
      </el-tooltip>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useCodeStore } from '@/stores/localCode'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { throttle } from 'lodash' //节流
const emit = defineEmits(['changeWidth', 'limitWidth'])
// ==============实现输出框拖拽功能==========start
const startY = ref(0)
// 记录正在变化的Y
const nowY = ref(0)
const isPressed = ref(false)
// 为header绑定鼠标按下事件
const handleMouseDown = (e) => {
  // 记录下当前的鼠标位置
  startY.value = e.pageY
  isPressed.value = true
  // console.log('鼠标按下时的位置', startY.value)
}
const handleMouseUp = () => {
  // 记录下当前的鼠标位置
  isPressed.value = false
  // startY.value = e.pageY
  // 送开始向组件发通知修改
  // console.log('发送事件')
  // console.log('鼠标放开时的位置', nowY.value)
}
const handleMousMove = (e) => {
  if (isPressed.value === false) return
  // startY.value = e.pageY
  nowY.value = e.pageY
  const changeValue = nowY.value - startY.value
  startY.value = nowY.value
  emit('changeWidth', changeValue)
  // console.log('鼠标移动时的坐标', startY.value)
}

onMounted(() => {
  window.addEventListener('mouseup', handleMouseUp)
  window.addEventListener('mousemove', handleMousMove)
})
// ==============实现输出框拖拽功能==========end
const limitWidthEvent = () => {
  emit('limitWidth')
}
// ==============清空输出狂
//====清空输出结果
const userCode= useCodeStore()
const handleClearResults = () => {
  ElMessageBox.confirm(
    '确定要清空所有输出?',
    '确定',
    {
      distinguishCancelAndClose: true,
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      userCode.clearResults()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除'
      })
    })

}
</script>

<style lang="less" scoped>
.header {
  height: 40px;
  width: 100%;
  background-color: @theme-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title {
    color: white;
    // line-height: 30px;
    margin-left: 10px;
  }
  .functionList {
    margin-right: 20px;
    // line-height: 30px;
    display: flex;
    .item {
      margin-left: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
