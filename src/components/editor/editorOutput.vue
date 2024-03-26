<!-- 这是代码输出框组件 -->
<template>
  <div class="editorOutput" ref="outputBox" v-resize>
    <el-row class="title">
      <el-col :span="1" class="textOut">Output</el-col>
      <el-col :span="1" :offset="21" class="rightIcon">
        <el-icon class="item">
          <el-tooltip class="box-item" effect="dark" content="清空" placement="bottom">
            <Delete @click="clearOutPutEvent"/>
          </el-tooltip>
        </el-icon>
        <el-icon class="item">
          <el-tooltip class="box-item" effect="dark" content="最小化" placement="left">
            <!-- <Close @click="handleClose"/> -->
            <el-icon @click="handleMin"><ArrowDown /></el-icon>
          </el-tooltip>
        </el-icon>
      </el-col>
    </el-row>
    <div class="Output">
      <outPutMessage
        v-for="(item, index) in props.outputList"
        :key="index"
        :item="item"
      ></outPutMessage>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
defineOptions({
  name: 'editorOutput',
  directives: {
    // 可以被拉伸的指令
    resize(el) {
      // 获取盒子和头部元素
      const box = el
      const header = el.firstElementChild
      // 定义变量
      let isDown = false // 是否按下鼠标
      let startY = 0 // 鼠标按下时的垂直坐标
      let endY = 0 // 鼠标松开时的垂直坐标
      let height = 0 // 盒子的初始高度
      // 监听头部元素的 mousedown 事件
      header.addEventListener('mousedown', (e) => {
        // 阻止默认行为
        e.preventDefault()
        // 设置 isDown 为 true
        isDown = true
        // 获取鼠标按下时的坐标
        startY = e.clientY
        // 获取盒子的初始高度
        height = box.offsetHeight
        header.style.cursor = 'grabbing'
      })
      // 监听 document 的 mousemove 事件
      document.addEventListener('mousemove', (e) => {
        // 如果 isDown 为 true，说明正在拖动
        if (isDown) {
          // 获取鼠标移动后的坐标
          box.style.transition = 'none'
          endY = e.clientY
          // 计算鼠标移动的距离
          let deltaY = startY - endY
          // 设置盒子的 height 属性，实现盒子的拉伸
          box.style.height = height + deltaY + 'px'
        }
      })
      // 监听 document 的 mouseup 事件
      document.addEventListener('mouseup', () => {
        // 设置 isDown 为 false
        isDown = false
        // header.style.cursor = "ns-resize";
      })
    }
  }
})
const props = defineProps({
  outputList: Array
})
// 清理输入框事件
const emit = defineEmits(['clearOutPut'])
// 可拉伸抽屉效果
const outputBox = ref(null)
// 提供一个最小化的方法
const handleMin = () => {
  outputBox.value.style.height = '130px'
  outputBox.value.style.transition = 'all .5s'
}
// 清空输入框效果
const clearOutPutEvent = () => {
  // console.log('该删除了!')
  emit('clearOutPut')
}
</script>

<style lang="less" scoped>
@mainColor: #ba2f7b;

.editorOutput {
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: white;
  min-height: 130px;
  max-height: 500px;
  height: 300px;
  // transition: all 0.5s;
  overflow-y: auto;
  .title {
    height: 30px;
    background-color: @mainColor;
    color: white;
    // position: absolute;
    // top: 0;
    // width: 100%;
  }
  .textOut {
    box-sizing: content-box;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    padding: 0 20px;
    font-weight: 300;
    background-color: white;
    color: @mainColor;
    border-bottom: 1px solid @mainColor;
  }
  .rightIcon {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    // 无奈添加，解决按钮不贴边显示的问题
    transform: translateX(9px);
    .item {
      cursor: pointer;
      width: 30px;
      height: 30px;
      margin-left: 10px;
      &:hover {
        background-color: white;
        color: @mainColor;
      }
    }
  }
  .Output {
    padding: 20px;
    font-size: 16px;
    color: @font-color;
  }
}
.close {
  bottom: 30px;
  // transform: translateY(270px);
}
</style>
