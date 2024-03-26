<template>
  <div class="editor">
    <codemirror
        class="myCodeMirror"
        ref="cm"
        v-model="codeStore.userCode"
        :style="CoderStyle"
        :extensions="extensions"
        @drop="handleDropCode"
        @dragover.prevent
      >
      </codemirror>
  </div>
</template>

<script setup lang="js">
import { useCodeStore} from '@/stores/localCode.js'
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref } from 'vue'
const codeStore = useCodeStore()

// 1. 代码编辑器配置项
const CoderStyle = ref({
  'height': '180px',
  width: '100%',
  'font-size': '28px',
  'font-family': 'FiraCode',
  outline: 'none',
  spellcheck: true
})
const extensions = [python(), oneDark]
</script>

<style lang="less" scoped>
.editor {
  flex:2;
}
:deep(.cm-activeLine) {
  //font-size: 30px !important;
  //background-color: pink !important;
  font-family: 'monospace';
}

:deep(.cm-line) {
  //font-size: 30px !important;
  //background-color: pink !important;
  // font-family: 'FiraCode';
  font-family: 'monospace';
}
</style>