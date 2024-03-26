<template>
  <!-- 对对话框设计 -->
  <div class="messageBox">
    <!-- 头像框 -->
    <div v-if="props.isTeacher" class="teacher">
      <teacherIcon :size="'20'"></teacherIcon>
      <!-- 文本框 -->
      <p class="teacher-message" v-html="markdown.render(props.message)"></p>
    </div>
    <div v-else class="student">
      <studentIcon :size="'20'" class="svg"></studentIcon>
      <p class="student-message">
        {{ props.message }}
      </p>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import MarkdownIt from 'markdown-it'
// import MarkdownItHighlightjs from 'markdown-it-highlightjs'
import MarkdownIt from 'markdown-it'
import markdownItCodeCopy from '@/utils/markdown-it-code-copy.ts'
import MarkdownItHightlightJS from 'markdown-it-highlightjs'
import 'highlight.js/styles/github-dark.css'
import '@/styles/copy.css'
const markdown = new MarkdownIt().use(MarkdownItHightlightJS).use(markdownItCodeCopy)

const props = defineProps({
  message: String,
  isTeacher: Boolean
})
// const markdown = new MarkdownIt().use(MarkdownItHighlightjs)
// // 将传入的markdown格式数据转换为html然后进行渲染
// const html = markdown.render(props.msg)
// console.log(html)
// // const makeDownText = ref(props.msg)


</script>

<style scoped lang="less">
.messageBox {
  box-sizing: border-box;
  position: relative;
  width: 100%;
  // background-color: pink;
  // padding: 15px;
  // margin-left: 50%;
  // transform: translateX(-50%);
  // display: flex;
  margin-bottom: 10px;
  // justify-content: space-between;
  .teacher-message {
    position: relative;
    margin-top: 4px;
    font-size: @font-size-normal;
    background-color: @theme-color;
    color: white;
    padding: 25px;
    border-radius: 5px;
    margin-left: auto;
    width: 100%;
    &::before {
      /* 创建一个向上的小三角箭头 */
      content: '';
      position: absolute;
      top: -4px; /* 调整这个值来改变箭头的位置 */
      // left: 50%;  /* 让箭头在 .messageBox 的中心 */
      transform: translateX(-221%);  /* 使用 transform 来精确定位箭头 */
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid @theme-color; /* 箭头的颜色应该和 .messageBox 的背景色相同 */
    }
  }
  .student-message {
    position: relative;
    margin-top: 4px;
    font-size: @font-size-normal;
    background-color: @theme-color;
    color: white;
    padding: 25px;
    border-radius: 5px;
    width: 100%;
    &::before {
      /* 创建一个向上的小三角箭头 */
      content: '';
      position: absolute;
      top: -4px; /* 调整这个值来改变箭头的位置 */
      transform: translateX(-221%);
      // left: 50%;  /* 让箭头在 .messageBox 的中心 */
      // transform: translateX(-50%);  /* 使用 transform 来精确定位箭头 */
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid @theme-color; /* 箭头的颜色应该和 .messageBox 的背景色相同 */
    }
  }
  // .student {
  //   display: flex;
  //   flex-direction: column;
  //   .svg {
  //     margin-left: auto;
  //     margin-bottom: 3px;
  //   }
  // }
}
</style>
