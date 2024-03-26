<template>
  <div class="output" ref="outPutBox">
    <!-- 头部 -->
    <outPutHeader @changeWidth="handleChange" @limitWidth="handleLimitWidth"></outPutHeader>
    <!-- 输出内容区域 -->
    <div class="outPutBox">
      <div class="content">
        <div class="outPutModule">
          <div class="header">输出</div>
          <div class="message" v-for="(item, index) in codeStore.runningResults" :key="item.id">
            <div v-if="index === 0" class="newest">Newest</div>
            <editorOutputMessage
              :type="item.type"
              :result="item.result"
              :time="item.time"
            ></editorOutputMessage>
            <!-- <editorOutputMessage :type="'fail'" :result="'Hello World'" :time="'2024/2/29'"></editorOutputMessage> -->
          </div>
        </div>
        <div class="inputModule">
          <div class="header">输入</div>
          <div>请对照input函数依次输入, 全部删除:ctrl+A后按下回车</div>
          <el-input
            v-model="codeStore.userInput"
            style="width: 80%"
            :rows="6"
            type="textarea"
            placeholder="以空格隔开需要输入的内容..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCodeStore } from '@/stores/localCode.js'
//====输入框大小改变
const outPutBox = ref(null)
const handleChange = (changeValue) => {
  outPutBox.value.style.transition = 'none'
  outPutBox.value.style.height = outPutBox.value.offsetHeight - changeValue + 'px'
}
// 处理极限变化
const handleLimitWidth = () => {
  outPutBox.value.style.transition = 'all .5s'
  if (parseInt(outPutBox.value.style.height) <= 40) {
    outPutBox.value.style.height = '300px'
  } else {
    outPutBox.value.style.height = '40px'
  }
}
// 提供输入框架
//====渲染运行结果
const codeStore = useCodeStore()
</script>
<style lang="less" scoped>
.output {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 300px;
  min-height: 40px;
  max-height: 400px;
  background-color: pink;
  z-index: 100;
  .outPutBox {
    width: 100%;
    height: 100%;
    background-color: @font-color;
    padding: 20px;
    overflow: auto;
    .content {
      width: 100%;
      height: 90%;
      display: flex;
      color: white;
      background-color: lighten(@font-color, 5%);
      overflow: auto;
      // margin-bottom: 20px;
      .header {
        width: 100%;
        height: 20px;
        text-align: center;
        line-height: 20px;
        background-color: @theme-color;
        z-index: 20;
        // position: absolute;
      }
      .outPutModule {
        // background-color: pink;
        border: 2px solid @theme-color;
        flex: 1;
        overflow: auto;
        .message {
          position: relative;
          .newest {
            position: absolute;
            top: 3px;
            left: 300px;
            // content: 'Newest!';
            background-color: #13ce66;
            width: 80px;
            height: 20px;
            text-align: center;
            font-size: 16px;
            line-height: 20px;
            border-radius: 4px;
          }
          }
        }
      
      .inputModule {
        flex: 1;
        display: flex;
        position: relative;
        overflow: auto;
        .header {
          position: absolute;
          top: 0;
        }
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 3px;
        border: 2px solid @theme-color;
        // background-color: skyblue;
      }
    }
  }
}
</style>
