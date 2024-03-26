<template>
  <div
    class="buttomButton"
    v-loading="loading"
    element-loading-text="Loading..."
    element-loading-background="rgba(122, 122, 122, 0.5)"
  >
    <div class="content">
      <spriteButton :content="'代码纠错'" @click="handleChooseModule"></spriteButton>
      <spriteButton :content="'代码支架'" @click="handleChooseSupport"></spriteButton>
      <spriteButton :content="'代码优化'" @click="handleChooseRefine"></spriteButton>
      <spriteButton :content="'相似练习'" @click="handleChooseSimilar"></spriteButton>
    </div>
  </div>
  <!-- 选择纠错模块 -->
  <el-dialog v-model="isChoosingModule" title="选择纠错" :width="500">
    <h2>选择一个模块让编程精灵帮你纠错吧！</h2>
    <el-select v-model="select" style="width: 240px">
      <el-option v-for="item in List" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <h2>这一模块的代码如下</h2>
    <p
      v-if="select"
      v-html="markdown.render(`\`\`\`python\n${codeStore.findModuleLById(select).code}\n\`\`\``)"
    ></p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isChoosingModule = false">Cancel</el-button>
        <el-button type="primary" @click="handleClose"> Confirm</el-button>
      </div>
    </template>
  </el-dialog>
  <!--  选择代码支架模块-->
  <el-dialog v-model="isChoosingSupport" title="支架生成" :width="500">
    <h2>选择一个模块, 我会根据你的模块描述为你生成代码支架！</h2>
    <el-select v-model="select" style="width: 240px">
      <el-option v-for="item in List" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <h2>您的模块描述如下</h2>
    <p v-if="select">{{ codeStore.findModuleLById(select).description }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isChoosingSupport = false">Cancel</el-button>
        <el-button type="primary" @click="handleCloseSupport"> Confirm</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 代码优化模块-->
  <el-dialog v-model="isChoosingRefine" title="代码优化" :width="500">
    <h2>选择一个模块的代码让编程精灵帮你优化吧！</h2>
    <el-select v-model="select" style="width: 240px">
      <el-option v-for="item in List" :key="item.id" :label="item.name" :value="item.id" />
    </el-select>
    <h2>这一模块的代码如下</h2>
    <p
      v-if="select"
      v-html="markdown.render(`\`\`\`python\n${codeStore.findModuleLById(select).code}\n\`\`\``)"
    ></p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isChoosingRefine = false">Cancel</el-button>
        <el-button type="primary" @click="handleCloseRefine"> Confirm</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 相似练习模块-->
  <el-dialog v-model="isChoosingSimilar" title="相似练习" :width="500">
    <h2>根据你的总任务生成一个相似的练习任务</h2>
    <h2>你的总任务如下</h2>
    <p>{{ todoListStore.mainTask }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isChoosingSimilar = false">Cancel</el-button>
        <el-button type="primary" @click="handleCloseSimilar"> Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useGptMessageStore, usePromptStore } from '@/stores'
import { useCodeStore } from '@/stores/localCode.js'
import { getGptResponse } from '@/api/gpt.js'
import { ElMessage } from 'element-plus'
import MarkdownIt from 'markdown-it'
import markdownItCodeCopy from '@/utils/markdown-it-code-copy.ts'
import MarkdownItHightlightJS from 'markdown-it-highlightjs'
import 'highlight.js/styles/github-dark.css'
import '@/styles/copy.css'
import { useTodoListStore } from '@/stores/todoList.js'

const todoListStore = useTodoListStore()
const markdown = new MarkdownIt().use(MarkdownItHightlightJS).use(markdownItCodeCopy)

const codeStore = useCodeStore()
const List = codeStore.moduleList
console.log(List)
const loading = ref(false)
const select = ref('')
// 设置遮罩层
const setMask = () => {
  loading.value = true
}
const gptStore = useGptMessageStore()
const promptStore = usePromptStore()

const isChoosingModule = ref(false)
const isChoosingSupport = ref(false)
const isChoosingRefine = ref(false)
const isChoosingSimilar = ref(false)
const handleChooseModule = () => {
  // 用户选择给哪一个模块纠错
  isChoosingModule.value = true
  // 生成Prompt
}
const handleClose = () => {
  isChoosingModule.value = false
  handleSendMessage(0, select.value)
}
const handleChooseSupport = () => {
  // 用户选择给哪一个模块支架
  isChoosingSupport.value = true
  // 生成Prompt
}
const handleCloseSupport = () => {
  isChoosingSupport.value = false
  handleSendMessage(1, select.value)
}
const handleChooseRefine = () => {
  // 用户选择给哪一个模块优化
  isChoosingRefine.value = true
  // 生成Prompt
}
const handleCloseRefine = () => {
  isChoosingRefine.value = false
  handleSendMessage(2, select.value)
}
const handleChooseSimilar = () => {
  // 用户选择给哪一个模块相似练习
  isChoosingSimilar.value = true
  // 生成Prompt
}
const handleCloseSimilar = () => {
  isChoosingSimilar.value = false
  handleSendMessage(3)
}

const initMessages = (index) => {
  gptStore.pushNewMessage(false, promptStore.showPrompts[index])
  gptStore.pushNewMessage(true, '编程精灵思考中...')
}
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
const handleSendMessage = async (index, selectedId) => {
  // 设置遮罩
  setMask()
  initMessages(index)
  // 与服务器建立联系
  let prompts = null

  try {
    prompts = await promptStore.generatePrompt(index, selectedId)
  } catch (err) {
    // console.error(err)
    if (err.message === '用户尚未编写代码') {
      ElMessage({
        message: '请先编写代码!',
        type: 'warning'
      })
    }
    if (err.message === '还没有添加模块描述') {
      ElMessage({
        message: '请先添加模块描述!',
        type: 'warning'
      })
    }
    gptStore.deleteLastOne()
    loading.value = false
    return // 当用户未编写代码时，退出函数，不进行后续操作
  }
  console.log(prompts)
  try {
    const res = await getGptResponse(generateMessage(prompts))
    const { data } = res
    gptStore.deleteLastOne()
    gptStore.pushNewMessage(true, data.result)
  } catch (err) {
    gptStore.deleteLastOne()
    gptStore.pushNewMessage(true, 'Opps!编程精灵出错了!')
    console.log(err)
  } finally {
    loading.value = false
  }
}
</script>

<style lang="less" scoped>
.buttomButton {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  border-top: 1px solid white;
  // background-color: pink;
  padding: 10px;
  overflow: hidden;

  .content {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 80px;
    // background-color: skyblue;
  }
}
</style>
