<template>
  <div class="messagesBox">
    <div class="content">
      <!-- 渲染列表 -->
      <messageBox
        v-for="(item, index) in gptMessages.messagesList"
        :key="index"
        :isTeacher="item.isTeacher"
        :message="item.message"
      ></messageBox>
    </div>
  </div>
</template>

<script setup>
import { useGptMessageStore } from '@/stores'

const gptMessages = useGptMessageStore()
</script>

<style lang="less" scoped>
.messagesBox {
  // padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 200px - 150px);
  // background-color: pink;
  // height: 100%;
  .content {
    width: 90%;
    height: 90%;
    // background-color: skyblue;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
