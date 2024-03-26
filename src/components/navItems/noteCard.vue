<template>
  <!-- 封装我的拉伸式知识卡片 -->
  <!-- 之后传入后台的数据动态渲染即可 -->
  <el-collapse-item :title="props.title" :name="props.name">
    <template #title>
      <p class="title">{{ item.title }}</p>
    </template>
    <template #default>
      <div class="content">
        <div class="item">
          <div
            class="copy"
            v-html="
              markdown.render(item.content)
            "
          ></div>
        </div>
      </div>
      <div class="bottom">
        <span>😵‍💫😵‍💫😵‍💫还是不能理解?</span>
        <!-- 跳转AI转手栏目 -->
        <span class="link" @click="handleToAiHelper">寻求AI助手帮助</span>
      </div>
    </template>
  </el-collapse-item>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import markdownItCodeCopy from '@/utils/markdown-it-code-copy.ts'
import MarkdownItHightlightJS from 'markdown-it-highlightjs'
import 'highlight.js/styles/github-dark.css'
import '@/styles/copy.css'
const markdown = new MarkdownIt().use(MarkdownItHightlightJS).use(markdownItCodeCopy)

// 1. 配置项
const props = defineProps({
  title:String,
  name: Number,
  item: Object
})

</script>

<style scoped lang="less">
.title {
  background-color: @theme-color;
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  color: white;
  text-align: center;
}

// 这是按钮的颜色及样式
// :deep 样式穿透
:deep(.el-collapse-item__header) {
  background-color: @theme-color;
  font-size: @font-size-normal;
  // color: red;
  color: white;
  border: none;
}
:deep(.el-collapse-item__content) {
  padding: 0;
}
.content {
  padding: 30px;
  background-color: @font-color;
  .item {
    .item-title {
      font-size: @font-size-big;
      color: white;
    }
    .item-content {
      font-size: @font-size-normal;
      color: white;
    }
    .codemirror {
      position: relative;
      .icon {
        position: absolute;
        top: 20%;
        right: 10px;
        cursor: pointer;
      }
    }
  }
}
.item {
  color: white;
}
.bottom {
  background-color: @theme-color;
  font-size: @font-size-normal;
  padding: 10px;
  border: none;
  color: white;
  .link {
    margin-left: 10px;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
}
</style>
