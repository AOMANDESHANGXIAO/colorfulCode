<template>
  <div class="subList" :class="{focus:true}">
    <h4 class="title">任务X(未完成)</h4>
    <p class="discription">你需要XXXXXX</p>
    <el-input
      v-model="answer"
      style="width: '80%'"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      placeholder="输入你的回答..."
    />
    <button class="sumbit">提交</button>
    <div class="finished">✅已完成! 完成时间:2024/12/25</div>
    <div class="finished">🚫未完成!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const answer = ref('')
</script>

<style lang="less" scoped>
.subList {
  position: relative;
  width: 100%;
  // height: 50px;
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 10px;
  // background-color: pink;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  // padding-top: 10px;
  // padding-bottom: 10px;
  padding: 30px;
  margin-bottom: 10px;
  .title {
    font-size: 16px;
    margin-bottom: 5px;
  }
  .sumbit {
    color: white;
    background-color: @theme-color;
    border: none;
    height: 26px;
    border-radius: 5px;
    &:hover {
      background-color: lighten(@theme-color, 10%);
      cursor: pointer;
    }
  }
}
.focus {
  border: 3px solid @theme-color;
 &::before {
  position: absolute;
  // width: 100px;
  // height: 30px;
  // background-color: #008F7A;
  right: 30px;
  content: 'Focusing...';
  color: @theme-color; 
  display: block;
 }
}
</style>
