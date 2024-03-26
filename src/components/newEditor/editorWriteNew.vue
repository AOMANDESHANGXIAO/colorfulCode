<!-- 代码模块功能 -->
<template>
  <!-- <div><button @click="codeStore.runCode">Run</button></div>
  <div>运行结果:{{ codeStore.results }}</div> -->
  <div class="myModuleEditor">
    <div class="title" :style="{ backgroundColor: props.color }">
      <div class="name">
        <moduleIcon :size="'24'"></moduleIcon>
        <div>✨✨模块名: {{ props.name }}</div>
      </div>
      <div class="iconList">
        <div>
          <el-switch
            class="switch"
            v-model="ele.isSelected"
            style="--el-switch-on-color: #13ce66"
          ></el-switch>
        </div>
        <el-tooltip effect="light" placement="left" content="运行本段代码">
          <div class="delete" @click="handleRunModule">
            <runIcon :size="'18'"></runIcon>
          </div>
        </el-tooltip>
        <el-tooltip effect="light" placement="left" content="删除该模块">
          <div class="delete" @click="handleDeleteModule">
            <deleteIcon :size="'18'"></deleteIcon>
          </div>
        </el-tooltip>
        <el-tooltip effect="light" placement="left" content="编辑模块">
          <div class="delete" @click="handleEditModule">
            <writeIcon :size="'18'"></writeIcon>
          </div>
        </el-tooltip>
        <el-tooltip effect="light" placement="left" content="折叠模块">
          <div class="collapse" :class="{ rotate: isNoActive }">
            <arrowIcon :size="'18'" @click="changeActive"></arrowIcon>
          </div>
        </el-tooltip>
      </div>
      <div class="titleMask" v-show="!codeStore.moduleList[props.index].isSelected">
        🚫🚫这段代码不会被执行!🚫🚫
      </div>
    </div>
    <div class="codeTextarea draggable" :class="{ noActived: isNoActive }" draggable="true">
      <!--需要给draggable添加一个事件来接受被拖拽过来的代码-->
      <codemirror
        class="myCodeMirror"
        ref="cm"
        v-model="codeStore.moduleList[props.index].code"
        :style="CoderStyle"
        :extensions="extensions"
        @drop="handleDropCode"
        @dragover.prevent
      >
      </codemirror>
      <div class="bottom" :style="{ backgroundColor: props.color }"></div>
    </div>
  </div>
  <el-dialog v-model="isEditing" title="编辑模块" :width="500">
    <h3>添加到代码记录中可供以后参考</h3>
    <el-button type="primary" @click="handleAddToModule(props.index)">添加</el-button>
    <h3>模块重命名</h3>
    <el-input
      v-model="codeStore.moduleList[props.index].name"
      @focus="handleChangeNameFocus"
      @blur="handleChangeNameBlur"
    ></el-input>
    <h3>模块功能描述</h3>
    <el-input
      v-model="codeStore.moduleList[props.index].description"
      style="width: 100%"
      :rows="2"
      type="textarea"
      placeholder="描述该模块的功能。编程精灵会根据该内容为你生成代码思路。"
    />
    <h3>模块代码编辑</h3>
    <previewModuleCode :index="props.index"></previewModuleCode>
  </el-dialog>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { python } from '@codemirror/lang-python'
import { oneDark } from '@codemirror/theme-one-dark'
import { ref, watch } from 'vue'
import { useCodeStore } from '@/stores/localCode.js'
import { ElMessageBox, ElMessage } from 'element-plus'

const props = defineProps({
  index: Number,
  id: Number,
  name: String,
  color: String
  // isSelected: Boolean
})
const codeStore = useCodeStore()
const ele = codeStore.findModuleLById(props.id)

// 1. 代码编辑器配置项
const CoderStyle = ref({
  'min-height': '80px',
  width: '100%',
  'font-size': '16px',
  // 'font-family': 'Consolas, "Courier New", monospace',
  outline: 'none',
  spellcheck: true
})
const extensions = [python(), oneDark]

// 实现折叠功能
const isNoActive = ref(false)
const changeActive = () => {
  isNoActive.value = !isNoActive.value
}
// 模块开关功能呢个
watch(
  () => codeStore.moduleList[props.index].isSelected,
  (newValue) => {
    isNoActive.value = !newValue
  }
)
// ====代码模块控制====
// 运行
const handleRunModule = () => {
  // 处理运行本段代码
  const id = codeStore.moduleList[props.index].id
  codeStore.runCode(id)
}
// 删除
const handleDeleteModule = () => {
  ElMessageBox.confirm('确定要删除该模块吗?', 'Warning', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
    // type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      const id = codeStore.moduleList[props.index].id
      codeStore.deleteModule(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
// 编辑 => 提供重命名以及保存代码功能
const isEditing = ref(false)
const handleEditModule = () => {
  isEditing.value = true
}
// 处理标题模块
const originTitle = ref('')
const handleChangeNameFocus = () => {
  originTitle.value = codeStore.moduleList[props.index].name
}
const handleChangeNameBlur = () => {
  if (codeStore.moduleList[props.index].name === '') {
    codeStore.moduleList[props.index].name = originTitle.value
    ElMessage({
      message: '模块名不能为空!',
      type: 'error'
    })
  }
}
const id = ref(1)
const handleAddToModule = (index) => {
  const obj = {
    id: id.value,
    moduleName: codeStore.moduleList[index].name,
    moduleDescription: codeStore.moduleList[index].description,
    saveCode: codeStore.moduleList[index].code,
    saveTime: new Date().toLocaleTimeString()
  }
  codeStore.generateNewSaveModule(obj)
  ElMessage({
    message: '保存成功!',
    type: 'success'
  })
  id.value += 1
}

const cm = ref(null)
const handleDropCode = () => {
  event.preventDefault() // 阻止默认的 drop 行为

  // 获取 drop 位置
  // const dropPosition = cm.value.posAtCoords({ left: event.clientX, top: event.clientY })
  //
  // if (dropPosition) {
  //   // 设置光标位置
  //   cm.value.view.dispatch(cm.value.state.tr.setSelection(dropPosition))
  // }
}
</script>

<style lang="less" scoped>
.switch {
  z-index: 10;
}

//
:deep(.cm-activeLine) {
  //font-size: 30px !important;
  //background-color: pink !important;
  font-family: 'FiraCode';
}

:deep(.cm-line) {
  //font-size: 30px !important;
  //background-color: pink !important;
  font-family: 'FiraCode';
}

.myModuleEditor {
  // display: inline-block;
  .title {
    position: relative;
    width: 100%;
    flex: 1;
    height: 30px;
    background-color: skyblue;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 20px;

    .titleMask {
      position: absolute;
      background-color: rgba(224, 224, 224, 0.5);
      // opacity: .5;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 30px;
      cursor: not-allowed;
    }

    .name {
      margin-left: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: white;
    }

    .iconList {
      display: flex;
      justify-content: space-around;
      align-items: center;
      gap: 20px;
    }

    .delete,
    .collapse {
      display: flex;
      justify-content: center;

      &:hover {
        cursor: pointer;
      }
    }

    .collapse {
      transition: all 0.3s;
      transform: rotate(90deg);
    }

    .rotate {
      transform: rotate(0deg);
    }
  }
}

.codeTextarea {
  transition: all 0.5s;
}

.bottom {
  width: 100%;
  height: 5px;
  background-color: skyblue;
}

@keyframes turnOff {
  0% {
  }
  100% {
    height: 0;
  }
}

.noActived {
  overflow: hidden;
  height: 0;
  // animation: turnOff 1s forwards;
}

// :deep(.el-collapse-item__header) {
//   background-color: rgba(0,0,0,0);
// }
// :deep(.el-collapse-item__arrow) {
//   background-color: rgba(0,0,0,0);
// }
</style>
