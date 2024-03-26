<template>
  <!-- 这是代码预览的功能 -->
  <codemirror
    v-model="codeStore.moduleList[props.index].code"
    :style="CoderStyle"
    :extensions="extensions"
  >
  </codemirror>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref } from 'vue'
import { useCodeStore } from '@/stores/localCode.js'

const props = defineProps({
  index: Number
})
const codeStore = useCodeStore()
// 1. 代码编辑器配置项
const CoderStyle = ref({
  'min-height': '150px',
  width: '100%',
  'font-size': '16px',
  // 'font-family': 'Consolas, "Courier New", monospace',
  outline: 'none'
})
const extensions = [python(), oneDark]
</script>
