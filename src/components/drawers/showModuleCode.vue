<template>
  <div>
    <div class="header">
      <div>Python</div>
      <copyIcon :size="'20'" @click="handleCopyCode" class="copy"></copyIcon>
    </div>
    <codemirror
      v-model="codeStore.savedModuleCode[props.index].saveCode"
      :style="CoderStyle"
      :extensions="extensions"
    >
    </codemirror>
  </div>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { useCodeStore } from '@/stores/localCode.js'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const codeStore = useCodeStore()
const props = defineProps({
  index: Number
})
// 1. 代码编辑器配置项
const CoderStyle = ref({
  'min-height': '80px',
  width: '100%',
  'font-size': '16px',
  'font-family': 'Consolas, "Courier New", monospace',
  outline: 'none'
})
const extensions = [python(), oneDark]
const handleCopyCode = () => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(codeStore.savedModuleCode[props.index].saveCode).then(
      () => {
        ElMessage({
          message: '成功复制代码!按下Ctrl+V粘贴使用。',
          type: 'success'
        })
        // console.log('内容已成功复制到剪贴板')
      },
      (error) => {
        console.error('无法将内容复制到剪贴板:', error)
      }
    )
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 25px;
  border-radius: 10px 10px 0 0;
  background-color: @theme-color;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.copy {
  &:hover {
    cursor: pointer;
  }
}

:deep(.cm-activeLine) {
  //font-size: 30px !important;
  //background-color: pink !important;
  font-family: 'FiraCode';
}

:deep(.cm-line) {
  //font-size: 30px !important;
  //background-color: pink !important;
  font-family: 'FiraCode';
}
</style>
