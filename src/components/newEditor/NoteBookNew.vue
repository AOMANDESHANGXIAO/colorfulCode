<script setup>
import { ref } from 'vue'
import { useCodeStore } from '@/stores/localCode.js'
import list from '@/stores/codeSupport.js'

const notebookData = ref(list)

const activeIndex = ref(0)
const setActiveIndex = (index) => {
  activeIndex.value = index
}
const codeStore = useCodeStore()
const dragCode = ref(null)
// const dragPic = ref(null)
const handleDropStart = (event, code) => {
  // console.log(isDraggingIndex.value, index)
  // 记录正在被拖拽的代码
  event.dataTransfer.setData('text/plain', code)
  codeStore.isDraggingCode = code
}
const handleDropEnd = () => {}
</script>

<template>
  <!-- 侧边导航组件-->
  <div class="newNoteBook">
    <div class="SidebarNav">
      <div
        class="item"
        v-for="(item, index) in notebookData"
        :key="index"
        @click="setActiveIndex(index)"
        :class="{ active: activeIndex === index }"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="container">
      <div class="showList">
        <div
          class="element"
          v-for="(item, index) in notebookData[activeIndex].contentList"
          :key="index"
        >
          <div class="title">{{ item.title }}</div>
          <div
            ref="dragCode"
            class="item"
            draggable="true"
            @dragstart="handleDropStart($event, item.code)"
            @dragend="handleDropEnd"
          >
            {{ item.code }}
          </div>
        </div>
      </div>
    </div>
    <!--    <div ref="dragPic" v-show="true">Coding</div>-->
  </div>
</template>

<style scoped lang="less">
.newNoteBook {
  height: 100%;
  display: flex;
  flex:1;
  flex-direction: row;

  .SidebarNav {
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 80px;
    height: 100%;
    background-color: white;
    border-top: 5px solid @theme-color;

    .item {
      width: 100%;
      //min-height: 60px;
      text-align: center;
      line-height: 60px;
      color: @font-color;
      cursor: pointer;

      &:hover {
        background-color: @theme-color;
        color: white;
        cursor: pointer;
      }
    }

    .active {
      background-color: @theme-color;
      color: white;
    }
  }

  .container {
    width: 100%;
    height: 100%;
    //padding: 10px;
    //padding-bottom: 80px;
    overflow: hidden;
    display: flex;
    align-items: center;
    border: 5px solid @theme-color;
  }

  .showList {
    width: 100%;
    height: 600px;
    border: 5px solid @theme-color;
    border-left: none;
    border-right: none;
    //border-bottom: none;
    background-color: @font-color;
    padding: 30px;
    overflow: auto;
    //margin-bottom: 80px;

    .element {
      margin-bottom: 20px;

      .item {
        width: 100%;
        min-height: 30px;
        color: white;
        border-radius: 8px;
        border: 1px solid white;
        text-align: center;
        line-height: 30px;
        font-family: 'FiraCode';

        &:hover {
          background-color: @theme-color;
          cursor: pointer;
        }
      }

      .title {
        font-size: 18px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
        border-left: 5px solid @theme-color;
        padding-left: 20px;
      }
    }
  }
}
</style>
