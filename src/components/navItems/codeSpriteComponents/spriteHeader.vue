<template>
  <div class="title">🧚‍♀️🧚‍♀️编程精灵🧚‍♀️🧚‍♀️</div>
  <div class="sprite">
    <div class="head">
      <img :src="spriteImg" alt="" />
    </div>
    <div class="name">
      <span>编程精灵CodeSprite</span
      ><span class="delete" @click="handleClearMessages">清理记录</span>
    </div>
  </div>
</template>
<script setup>
import spriteImg from '@/assets/sprite.gif'
import { useGptMessageStore } from '@/stores'
import { ElMessage, ElMessageBox } from 'element-plus'
const gptStore = useGptMessageStore()
const handleClearMessages = () => {
  ElMessageBox.confirm(
  '❗❗确定删除所有记录?',
  'Warning',
  {
    'close-on-press-escape': true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    // type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      gptStore.clearMessages()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

</script>
<style lang="less" scoped>
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 100%;
  font-size: @font-size-normal;
  color: white;
  background-color: @theme-color;
}
.sprite {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 170px;
  border-bottom: 1px solid white;
  // background-color: pink;
  .head {
    width: 80px;
    height: 80px;
    background-color: @theme-color;
    border-radius: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .name {
    position: absolute;
    bottom: 4px;
    padding: 5px;
    background-color: @theme-color;
    color: white;
    border-radius: 6px;
    .delete {
      margin: 10px;
      text-decoration: underline;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
