<template>
  <div class="assistant">
    <!-- 标题 -->
    <div class="title">🧚‍♀️🧚‍♀️编程精灵🧚‍♀️🧚‍♀️</div>
    <!-- AI头像 -->
    <div class="live2d">
      <!--       <liveImg></liveImg>-->
      <img :src="spriteImg" alt="" />
    </div>
    <!-- 分隔符 -->
    <el-divider content-position="center">
      <template #default>
        <p class="name">CodeSprite</p>
      </template>
    </el-divider>
    <!-- 消息列表 -->
    <div class="messageBox">
      <div class="messageList">
        <!-- 默认消息提示 -->
        <div v-for="(item, index) in gptStore.chatMessagesList" :key="index">
          <messageBox :message="item.message" :is-teacher="item.isTeacher"></messageBox>
        </div>
      </div>
    </div>
    <div class="buttonList">
      <!-- 里面放功能按钮 -->
      <button class="item" @click="handleCodeError">代码纠错</button>
      <button class="item" @click="generateCodeScaffold">支架生成</button>
      <button class="item" @click="optimizeCode">代码优化</button>
      <button class="item" @click="generateNewTask">相似练习</button>
      <div class="rest" v-if="isResting">休息中!请稍后...({{ time }})</div>
    </div>
  </div>
</template>

<script setup>
import { useCodeStore, useGptStore } from '@/stores'
import { getGptResponse } from '@/api/gpt'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import spriteImg from '@/assets/sprite.gif'
import MessageBox from '@/components/navItems/messageBox.vue'
// const loading = ref(false)
const codeStore = useCodeStore()
const gptStore = useGptStore()
const generateMessage = (content) => {
  return {
    messages: [
      {
        role: 'user',
        content: content
      }
    ]
  }
}
const saveMessage = (content) => {
  gptStore.chatMessagesList.push(content)
}
const wrongTips = () => {
  gptStore.changeMessage({
    message: '抱歉，编程精灵出错了!😵‍💫😵‍💫',
    isTeacher: true
  })
}
// 代码纠错处理函数
// 1. 判断用户代码框是否有错误方法
const isReallyWrong = () => {
  const errorInfo = codeStore.getErrorInfo()
  if (!errorInfo) {
    ElMessage({
      message: '当前代码似乎并未出过错!.',
      type: 'warning'
    })
    saveMessage({
      message: '你的代码似乎并没有出错哦!',
      isTeacher: true
    })
    // loading.value = false
    return false
  }
  return true
}
// 2. 判断用户的代码区域是否不为空
const isCodeExist = () => {
  const userCode = codeStore.getCodes()
  // 如果没有代码，那么提示用户输入代码
  if (!userCode) {
    ElMessage({
      message: '请先输入代码!',
      type: 'warning'
    })
    saveMessage({
      message: '请同学先输入代码!',
      isTeacher: true
    })
    return false
  }
  return true
}
const handleCodeError = async () => {
  if (isResting.value) return
  saveMessage({
    message: '请帮我处理代码中的错误!',
    isTeacher: false
  })
  // 如果用户没有写代码，直接退出
  if (!isCodeExist()) return
  // 如果用户代码中没有错误，直接退出
  if (!isReallyWrong()) return
  // 生成Prompts
  const prompts =
    '注意:请使用markdown格式返回数据!你好!我是一个中学生,正在练习编程。我的代码中似乎有一些错误,请你帮助我纠正错误。要求: (1)讲解通俗易懂,避免大量专业名词的使用。(2)限定五十字的回复内容。'
  const code_content = codeStore.getCodes()
  // 如果有错误提示的话
  let content =
    prompts +
    `这是我正在编辑的代码:'''${code_content}'''` +
    `这是错误消息的提示:'''${codeStore.getErrorInfo()}'''`
  // 根据当前编辑的文件id查找对应的错误
  rest()
  // 准备插入对话的数据
  saveMessage({
    message: '编程精灵思考中...',
    isTeacher: true
  })
  // 发送请求
  try {
    const messages = generateMessage(content)
    const res = await getGptResponse(messages)
    // 将GPT生成的消息进行
    const {
      data: { result }
    } = res
    gptStore.changeMessage({
      message: result,
      isTeacher: true
    })
  } catch (err) {
    wrongTips()
  }
}

// 代码支架生成函数
// 1. 判断用户是否有编程任务
const isTaskExist = () => {
  // 获取用户的编程任务
  const codeTask = codeStore.codeTask
  // console.log(codeTask)
  // 如果没有编程任务，那么提示用户输入编程任务
  if (!codeTask) {
    ElMessage({
      message: '请先输入编程任务!',
      type: 'warning'
    })
    saveMessage({
      message: '请先输入编程任务',
      isTeacher: true
    })
    return false
  }
  return true
}
const generateCodeScaffold = async () => {
  if (isResting.value) return
  saveMessage({
    message: '请帮我生成编程支架!',
    isTeacher: false
  })
  // 判断用户是否存在编程任务
  if (!isTaskExist()) return
  rest()
  // 准备插入对话的数据
  saveMessage({
    message: '编程精灵思考中...',
    isTeacher: true
  })
  const codeTask = codeStore.codeTask
  console.log(codeTask)
  try {
    const messages = generateMessage(
      `我是一名中学生,正在使用Python编程。这是我需要完成的编程任务:'''${codeTask}'''。请你以代码注释的形式帮我生成编程思路支架，注意:不要直接写代码!请你不要将代码部分包含在回复中。`
    )
    // console.log('messages', messages)
    const res = await getGptResponse(messages)
    // console.log(res)
    const {
      data: { result }
    } = res
    // console.log('result=', result)
    gptStore.changeMessage({
      message: result,
      isTeacher: true
    })
  } catch (err) {
    wrongTips()
  }
}

// 代码优化函数
// 代码优化函数
const optimizeCode = async () => {
  if (isResting.value) return
  if (!isCodeExist()) return
  saveMessage({
    message: '请帮我优化代码!',
    isTeacher: false
  })
  rest()
  // 准备插入对话的数据
  saveMessage({
    message: '编程精灵思考中...',
    isTeacher: true
  })
  try {
    const messages = generateMessage(
      `这是我需要优化的代码:'''${useCodeStore().getCodes()}'''。请你帮我优化它!`
    )
    const res = await getGptResponse(messages)
    // 将GPT生成的消息进行
    const {
      data: { result }
    } = res
    gptStore.changeMessage({
      message: result,
      isTeacher: true
    })
    // newChat.sprite = result
  } catch (err) {
    wrongTips()
  }
}

// 相似练习
// 生成新题目的函数
const generateNewTask = async () => {
  if (isResting.value) return
  if (!isCodeExist()) return
  rest()
  // loading.value = true
  // 准备插入对话的数据
  saveMessage({
    message: '请帮我生成一个新的类似任务！',
    isTeacher: false
  })
  try {
    const currentTask = codeStore.codeTask
    const messages = generateMessage(
      `这是我当前的任务:'''${currentTask}'''。请你帮我生成一个新的类似任务!`
    )
    const res = await getGptResponse(messages)
    // 将GPT生成的消息进行
    const {
      data: { result }
    } = res
    gptStore.changeMessage({
      message: result,
      isTeacher: true
    })
  } catch (err) {
    wrongTips()
  }
}
// 休息中函数
const isResting = ref(false)
const time = ref(10)
const rest = () => {
  isResting.value = true
  let timer = setInterval(() => {
    time.value--
    if (time.value === 0) {
      clearInterval(timer)
      time.value = 10
      isResting.value = false
    }
  }, 1000)
}
</script>

<style lang="less" scoped>
.assistant {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @font-color;
  border-right: 6px solid @theme-color;
  border-top: 6px solid @theme-color;
  overflow-y: hiddden;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100%;
    font-size: @font-size-normal;
    color: white;
    background-color: @theme-color;
  }
  .live2d {
    position: relative;
    width: 100px;
    height: 100px;
    background-color: @theme-color;
    margin: auto;
    margin-top: 20px;
    border-radius: 50px;
    overflow: hidden;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0px;
      //left: -100px;
    }
  }
  .messageBox {
    padding: 0 10px;
    width: 100%;
    height: 575px;
    // overflow-x: hidden;
    .messageList {
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    height: 100%;
    // background-color: pink;
    overflow: auto;
  }
  }

  .myInput {
    position: absolute;
    width: 90%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  .buttonList {
    position: absolute;
    width: 100%;
    bottom: 0;
    margin-top: 10px;
    border-top: 1px solid white;
    display: flex;
    // flex-wrap: wrap;
    padding: 10px;
    gap: 5%;
    justify-content: space-around;
    .item {
      margin-bottom: 5px;
      font-size: @font-size-normal;
      padding: 8px 14px;
      border-radius: 20px;
      cursor: pointer;
      color: white;
      background-color: @theme-color;
      &:hover {
        background-color: lighten(@theme-color, 10%);
      }
    }
    .rest {
      position: absolute;
      background-color: @theme-color;
      width: 100%;
      height: 200px;
      color: white;
      text-align: center;
      line-height: 200px;
      font-size: 24px;
    }
  }
}
// 调整live2d人物位置的地方
// 调整头像位置
:deep(#canvas_view) {
  position: absolute;
  top: -99px;
  left: -302px;
}
:deep(.el-divider__text) {
  background-color: @theme-color;
  padding: 5px 15px;
  border: 1px solid @theme-color;
  border-radius: 7px;
  // margin-left: 50px;
  // padding: 0;
}
:deep(.el-textarea__inner) {
  border-radius: 8px;
  &:focus {
    border: none;
  }
}
.name {
  // background-color: @theme-color;
  color: white;
}
</style>
