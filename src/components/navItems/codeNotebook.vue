<template>
  <div class="codeNotebook">
    <!-- 标题 -->
    <div class="title">✨✨代码笔记✨✨</div>
    <!-- TODO:将来增添搜索框模块 -->

    <!-- TODO：知识卡片模块-->
    <div class="collapse">
      <el-collapse>
        <noteCard v-for="(item,index) in notebook" :key="item.id" :title="item.title" :name="index" :item="item"></noteCard>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import { getNoteBook } from '@/api/my'
import { ref, onMounted } from 'vue'
// 在这里获取信息并且传递
const notebook = ref([])

const handleGetNoteBook = async () => {
  const res = await getNoteBook()
  const { data } = res
  return data
}
onMounted(async () => {
  notebook.value = await handleGetNoteBook()
  // console.log(notebook.value)
})

</script>

<style lang="less" scoped>
.codeNotebook {
  width: 100%;
  height: 100%;
  background-color: @font-color;
  border-right: 6px solid @theme-color;
  border-top: 6px solid @theme-color;
  overflow-y: auto;
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
}
</style>
