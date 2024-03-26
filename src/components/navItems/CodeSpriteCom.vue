<template>
  <div class="codeSprite">
    <!-- 标题 -->
    <div class="title">
      <!-- 头部 -->
      <spriteHeader></spriteHeader>
    </div>
    <!-- 对话部分 -->
    <chatBox></chatBox>
    <!-- 底部功能栏目 -->
    <bottomButton></bottomButton>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.codeSprite {
  position: relative;
  background-color: @font-color;
  width: 100%;
  height: 100%;
  border-right: 6px solid @theme-color;
  border-top: 6px solid @theme-color;
}
</style>
