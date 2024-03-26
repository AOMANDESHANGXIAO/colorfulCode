<!-- 这是新的编辑器窗口 -->
<template>
  <div class="newEditor">
    <!-- 头部 -->
   <editorHeaderNew></editorHeaderNew>
   <!-- 编辑部 -->
   <div class="write">
    <!-- 代码书写框 -->
    <!-- <editorWriteNew></editorWriteNew> -->
    <codeBlockScreen></codeBlockScreen>
    <!-- 代码输出模块 -->
    <editorOutPutNew></editorOutPutNew>
   </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.newEditor {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: @font-color;
  
}
</style>
