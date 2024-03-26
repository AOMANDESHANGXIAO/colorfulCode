<!-- 这是代码编辑框组件 -->
<template>
  <!-- 配置文件标题导航栏目 -->
  <!-- 文件导航 -->
  <div class="editorCode" v-if="codeStore.isShowingFiles.length !== 0 && codeStore.activeFileID !== null">
    <!-- 文件导航部分 -->
    <div class="fileNav">
      <div
        :class="{ actived: item.id === codeStore.activeFileID }"
        class="item"
        v-for="item in codeStore.isShowingFiles"
        :key="item.id"
        @click="makeActive(item.id)"
      >
        <!-- 图标：文件名以及关闭按钮 -->
        <pythonIcon :size="'12'"></pythonIcon>
        <span class="content">{{ item.name }}</span>
        <el-icon @click="closeFile($event, item.id)">X</el-icon>
      </div>
    </div>
    <!-- 对应的代码编辑器 -->
    <div class="codemirrorList">
      <codemirror
        v-for="item in codeStore.isShowingFiles"
        :key="item.id"
        v-show="item.id === codeStore.activeFileID"
        v-model="item.code"
        :style="CoderStyle"
        :autofocus="true"
        :tabSize="2"
        :extensions="extensions"
      ></codemirror>
    </div>
    <!-- 运行代码按钮 -->
    <el-tooltip effect="light" content="运行代码" placement="left">
      <div ref="runBox" class="run">
        <startIcon v-show="!isRunning" @click="handleRunCode"></startIcon>
        <!-- 中止图标 -->
        <runningIcon v-show="isRunning"></runningIcon>
      </div>
    </el-tooltip>
    <!-- 代码输入框 -->
    <editorOutput :outputList="outputList" @clearOutPut="handleClear"></editorOutput>
  </div>
  <!-- 没有打开文件显示 -->
  <div class="emptyBox" v-else>
    <p>Let's coding!新建或者打开一个文件。</p>
  </div>
</template>

<script setup>
// 配置代码编辑器选项
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
// import { ayuLight } from 'thememirror'
import editorOutput from '@/components/editor/editorOutput.vue'
// ElementUI
import { ElMessage } from 'element-plus'
// 自定义图标
import startIcon from '@/components/icon/startIcon.vue'
import runningIcon from '@/components/icon/runningIcon.vue'
import { ref } from 'vue'
// 导入codeStore
import { useCodeStore } from '@/stores/index.js'
import { handleSumbitCode } from '@/api/code.js'
// 1. 配置codemirror模块
// 行内式样式优先级最高，替换默认样式
// 响应式数据便于用户设置编辑器
const CoderStyle = ref({
  height: '100%',
  width: '100%',
  'font-size': '18px',
  outline: 'none'
})
// const code = ref('')
// 配置项，语言是python 主题是oneDark
const extensions = [python(), oneDark]
// const extensions = [python(), ayuLight]

// 2. 获取渲染文件模块
const codeStore = useCodeStore()
// active控制渲染哪一个Python文件代码
// const active = ref(0)
// 提供一个方法更改active
const makeActive = (id) => {
  codeStore.setActiveIndexById(id)
}
// 3. 提供一个方法可以删除该文件标识
const closeFile = (event, id) => {
  event.stopPropagation()

  // 处理关闭空间时应该展示那个id文件的问题
  codeStore.handleClosedFileById(id)

  codeStore.notShowThisFile(id)
}
// 4. 代码提交模块
const isRunning = ref(false)
const runBox = ref(null)
// 代码运行的结果保存于本组件，并向下传递给outPut组件
// 使用列表来保存
const outputList = ref([])

// 用户提交后的五秒内不能按下按钮，防止用户一直点击运行
const disableRunButton = ref(false)

// =============start============
//=============代码运行模块======
// 1. 获取用户的代码并且清除注释部分
const getUserCode = () => {
  return codeStore.getCodes()
    .replace(/#[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '') // JavaScript 中的多行注释处理
    .replace(/"""[\s\S]*?"""/g, '') // Python 中的三引号多行字符串注释处理
    .replace(/'''[\s\S]*?'''/g, ''); // Python 中的三引号多行字符串注释处理
}
// 2. 设置代码运行状态
const setRunningStatus = () => {
  isRunning.value = true
  disableRunButton.value = true
  runBox.value.style.cursor = 'not-allowed'
}
// 3. 提交给客户端运行
// 3.1 存储代码运行结果的方法
const saveOutPut = (result) => {
  // 3.1.1 处理存储的格式
  // 这是outPutMessage组件使用的数据格式
  const showRes = {
    outPut: result.outPut,
    isRight: result.isRight,
    time: new Date().toLocaleTimeString()
  }
  outputList.value.push(showRes)
}
// 3.1 处理代码运行结果的方法
const handleStdOutPut =  (res) => {
  ElMessage({
    message: '代码运行成功!',
    type: 'success'
  })
  const { data } = res
  // 将结果进行保存
  saveOutPut(data)
}
const handleStdError =  (res) => {
  ElMessage({
    message: '代码运行错误!',
    type: 'error'
  })
  const { data } = res
  saveOutPut(data)
  // console.log(error)
  // 将错误信息保存
  codeStore.recordError(data.outPut)
}
// 3.2 设置运行代码冷却事件
const setCannotRunTime = () => {
  // 运行结束
  isRunning.value = false
  // 开始倒计时
  setTimeout(() => {
    disableRunButton.value = false
    runBox.value.style.cursor = 'pointer'
  }, 5000)
}
// 发送请求并且获取运行结果
const sendCode = async (userCode) => {
  // 1. 准备提交数据
  const data = {
    code: userCode,
    sumbitTime: Date.now()
  }
  await handleSumbitCode(data).then(res => handleResult(res)).catch(error => console.error(error))
  setCannotRunTime()
  // try {
  //   // 使用try/catch捕获可能的错误
  //   const res = await handleSumbitCode(data)
  //   return res
  // } catch (error) {
  //   // 在这里处理或记录错误，并确保后续状态更新正确
  //   console.error('运行代码时发生错误:', error)
  //   setCannotRunTime()
  //   codeStore.recordError(error.message || '代码运行时出错')
  //   ElMessage({
  //     message: '代码运行错误!',
  //     type: 'error'
  //   })
  // }
}
// 处理返回的代码方法
const handleResult = (res) => {
  // 2.1 不论错误与否都应将结果存入渲染列表中
  // saveOutPut(res)
  // 2.2 处理代码运行正确和运行错误的情况
  // 如果代码正确
  if (res.isRight) {
    handleStdOutPut()
  }else {
    handleStdError(res)
  }
  // 不论正确与否都要设置运行代码的冷却时间
  setCannotRunTime()
}
const handleRunCode = async () => {
  if (disableRunButton.value) return
  // 1. 设置代码运行状态，防止重复点击
  setRunningStatus()
  // 2. 获取用户的代码
  const userCode = getUserCode()
  // 3. 提交给服务器运行并且处理结果
  await sendCode(userCode)
//   const res = await sendCode(userCode)
//   const { data } = res
//   console.log('get Res=', data)
//   // 4. 处理运行结果
//   handleResult(data)
// }
}

// 提供清理输入框的功能
const handleClear = () => {
  outputList.value = []
}
</script>

<style lang="less" scoped>
// 导航栏高度
@fileNavHeight: 30px;
.editorCode {
  width: 100%;
  position: relative;
  .fileNav {
    width: 100%;
    height: @fileNavHeight;
    // background-color: pink;
    .item {
      height: @fileNavHeight;
      font-size: @font-size-small;
      padding-left: 10px;
      padding-right: 10px;
      display: inline-flex;
      align-items: center;
      background-color: @font-color;
      // border-bottom: 2px solid white;
      color: white;
      margin-right: 2px;
      cursor: pointer;
      border-radius: 0px 0px 0 0;
      gap: 3px;
      &:hover {
        background-color: @theme-color;
      }
      .content {
        margin-right: 12px;
        font-weight: 300;
      }
    }
  }
}
// 被选中的文件
.editorCode .fileNav .actived {
  background-color: @theme-color;
}
.run {
  position: absolute;
  top: 10%;
  left: 88%;
  transform: scale(0.2);
  background-color: #fff;
  border-radius: 50px;
  cursor: pointer;
  // &:hover {
  //   animation: bounceUp 0.4s ease-in-out forwards;
  // }

  // 定义动画关键帧
  // 盒子弹跳功能
  // @keyframes bounceUp {
  //   0% {
  //     transform: translateY(0) scale(0.2);
  //   }
  //   50% {
  //     transform: translateY(-20px) scale(0.2); // 调整这个值以控制跳跃的高度
  //   }
  //   100% {
  //     transform: translateY(0) scale(0.2);
  //   }
  // }
}
.codemirrorList {
  height: calc(100% - 50px);
}
// 空盒子样式
.emptyBox {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: @font-color;
  width: 100%;
  height: 100%;
  color: white;
  font-size: @font-size-big;
  font-weight: 300;
  // text-align: center;
  // padding-top: 50%;
}
</style>
