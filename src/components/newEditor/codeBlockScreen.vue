<template>
  <div class="screen">
    <!-- <div v-if="!codeStore.isDragging">
      <editorWriteNew
        v-for="(item, index) in codeStore.moduleList"
        :key="item.id"
        :index="index"
        :name="item.name"
        :color="item.color"
        :id="item.id"
      ></editorWriteNew>
    </div>
    <div v-else v-generate-list>
      <draggable :list="draggableList" item-key="id" animation="300">
        <template #item="{ element }">
          <div class="draggableElement" :style="{ backgroundColor: element.color }">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div> -->
    <codeEditor></codeEditor>
  </div>
</template>

<script setup>
// import { useCodeStore } from '@/stores/index.js'
// import draggable from 'vuedraggable'
// import { ref } from 'vue'
// import { watch } from 'vue'

// const codeStore = useCodeStore()
// const draggableList = ref([])

// const vGenerateList = {
//   mounted: () => {
//     watch(
//       () => codeStore.moduleList.length,
//       () => {
//         // console.log('变化了')
//         draggableList.value = codeStore.generateDraggableModuleList()
//       }
//     )
//     draggableList.value = codeStore.generateDraggableModuleList()
//   },
//   // 在销毁之前将codeStore中的moduList改编为拖拽过后的列表
//   beforeUnmount: () => {
//     codeStore.setDraggableModuleList(draggableList.value)
//   }
// }
</script>

<style lang="less" scoped>
.screen {
  width: 100%;
  height: 100%;
  background-color: @font-color;
}

.draggableElement {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 10px;
  color: white;

  &:hover {
    cursor: pointer;
  }
}
</style>
