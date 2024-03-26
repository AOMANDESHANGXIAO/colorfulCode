<template>
  <div class="header">
    <div class="title">在此处编写代码吧!</div>
    <div class="functionList">
      <el-tooltip
        effect="light"
        placement="bottom"
        content="重载Python环境，注意仅在代码不可运行时使用"
      >
        <div @click="handleReset">
          <resetIcon :size="'24'" class="item"></resetIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="bottom" content="添加代码块">
        <div @click="handleAddCode">
          <addCodeIcon :size="'24'" class="item"></addCodeIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="bottom" content="移动代码块">
        <div @click="handleMoveCode">
          <changeposIcon :size="'20'" class="item"></changeposIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="bottom" content="预览所有运行代码">
        <div @click="handleWatchCode">
          <watchIcon :size="'24'" class="item"></watchIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="bottom" content="运行所有代码">
        <div @click="handleRunCode">
          <runIcon :size="'20'" class="item"></runIcon>
        </div>
      </el-tooltip>
      <el-tooltip effect="light" placement="bottom" content="清空代码">
        <div @click="handleClearCode">
          <deleteIcon :size="'20'" class="item"></deleteIcon>
        </div>
      </el-tooltip>
    </div>
  </div>
  <el-dialog v-model="dialogFormVisible" title="添加新的代码模块" :width="500">
    <el-form :model="form" :rules="rules">
      <el-form-item prop="moduleName">
        <h2>为该模块取个名字:(反映出这一块要实现的功能)</h2>
        <h2>一、模块名称</h2>
        <el-input v-model="form.moduleName"></el-input>
        <h2>二、选择一个你喜欢的颜色!</h2>
        <div>
          <el-color-picker v-model="color" :predefine="predefineColors"></el-color-picker>
        </div>
        <p>
          模块化是一种编程技术，它将大型的、复杂的程序分解为小的、独立的部分，这些部分被称为模块。每个模块都有一个特定的任务，可以独立完成这个任务，而不依赖于其他模块。模块之间通过定义清晰的接口进行交互
        </p>
      </el-form-item>
      <el-button @click="closeDialog">取消</el-button>
      <el-button @click="confirm" type="primary">确定</el-button>
    </el-form>
  </el-dialog>
  <el-dialog v-model="isWatched" title="代码预览" :width="500">
    <previewCode></previewCode>
  </el-dialog>
</template>
<script setup>
import { useCodeStore } from '@/stores/localCode.js'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import _ from 'lodash'
import ResetIcon from '@/components/icon/editorCodeNew/resetIcon.vue'

const codeStore = useCodeStore()

const handleRunCode = _.debounce(() => {
  codeStore.runCode()
}, 300)

const handleClearCode = _.debounce(() => {
  ElMessageBox.confirm('❗❗确定删除所有代码?', 'Warning', {
    'close-on-press-escape': true,
    confirmButtonText: '确定',
    cancelButtonText: '取消'
    // type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      codeStore.clearCode()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}, 300)

const dialogFormVisible = ref(false)
const handleAddCode = () => {
  // 处理添加代码块的方法
  dialogFormVisible.value = true
}
const closeDialog = () => {
  // 关闭
  dialogFormVisible.value = false
}
const form = ref({
  moduleName: ''
})
const rules = {
  moduleName: { required: true, message: '模块名称不能为空', trigger: 'blur' }
}
// const taskInput = ref()
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577'
])
const confirm = () => {
  // 禁止模块名为空
  if (form.value.moduleName.trim() === '') {
    return
  }
  closeDialog()
  codeStore.generateNewModule(form.value.moduleName, color.value)
}

// 代码预览功能
const isWatched = ref(false)
const handleWatchCode = () => {
  isWatched.value = true
}

const handleMoveCode = () => {
  codeStore.isDragging = !codeStore.isDragging
  // console.log('正在拖拽')
}

const handleReset = () => {
  codeStore.initPython()
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
    align-items: center;

    .item {
      margin-left: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
