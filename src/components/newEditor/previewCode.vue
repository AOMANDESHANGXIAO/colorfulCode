<template>
  <!-- 这是代码预览的功能 -->
  <codemirror
    v-model="codeStore.previewUserCode"
    :style="CoderStyle"
    :extensions="extensions"
    :disabled="true"
  >
  </codemirror>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref } from 'vue'
import { useCodeStore } from '@/stores/localCode.js'

const codeStore = useCodeStore()
// 1. 代码编辑器配置项
const CoderStyle = ref({
  'min-height': '150px',
  width: '100%',
  'font-size': '16px',
  'font-family': 'Consolas, "Courier New", monospace',
  outline: 'none'
})
const extensions = [python(), oneDark]
</script>
<style scoped lang="less">
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
