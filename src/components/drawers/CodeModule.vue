<template>
  <div class="codeModule">
    <div class="header">在此处可管理你已记录的代码</div>
    <div class="collapse">
      <el-collapse>
        <el-collapse-item title="测试数据">
          <template #title>
            <div class="record-title">已记录的代码</div>
          </template>
          <template #default>
            <el-timeline
                style="max-width: 600px"
                v-for="(item, index) in userCode.savedModuleCode"
                :key="item.saveTime"
            >
              <el-timeline-item :timestamp="item.saveTime" placement="top">
                <div class="card">
                  <el-tooltip placement="bottom" effect="light" content="删除该模块">
                    <div class="icon" @click="handleDeleteModule(item.id)">
                      X
                    </div>
                  </el-tooltip>
                  <el-card>
                    <h4 class="item" v-if="!isChangeName" @dblclick="handleChangeName(item.moduleName)">
                      {{ item.moduleName }}
                    </h4>
                    <input
                        class="nameInput"
                        v-focus
                        v-else
                        v-model="item.moduleName"
                        @blur="handleEditName(item.moduleName, index)"
                        @keyup.enter="handleEditName(item.moduleName, index)"
                    >
                    </input>
                    <p
                        class="item"
                        v-if="!isChangeDescription"
                        @dblclick="handleChangeDescription(item.moduleDescription)"
                    >
                      {{ item.moduleDescription }}
                    </p>
                    <textarea
                        class="des-input"
                        v-focus
                        v-else
                        v-model="item.moduleDescription"
                        @blur="handleEditDescription(item.moduleDescription, index)"
                        @keyup.enter="handleEditDescription(item.moduleDescription, index)"
                    ></textarea>
                    <showModuleCode :index="index"></showModuleCode>
                    <div class="footer"></div>
                  </el-card>
                </div>

              </el-timeline-item>
            </el-timeline>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
import {useCodeStore} from '@/stores/localCode.js'
import ShowModuleCode from '@/components/drawers/showModuleCode.vue'
import {ref} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'


const userCode = useCodeStore()
// 提供双击修改模块名和模块描述功能
const isChangeName = ref(false)
let saveName = ref('')
const isChangeDescription = ref(false)
let saveDescription = ref('')


const handleChangeName = (value) => {
  saveName.value = value
  isChangeName.value = true
}
const handleEditName = (value, index) => {
  isChangeName.value = false
  if (value.trim() === '') {
    userCode.savedModuleCode[index].moduleName = saveName.value
    // console.log(e.target.value)
    return ElMessage({
      message: '修改失败!模组名不能为空!',
      type: 'error'
    })
  } else {
    userCode.savedModuleCode[index].moduleName = value.trim()
  }
}
const handleChangeDescription = (value) => {
  isChangeDescription.value = true
  saveDescription.value = value
}
const handleEditDescription = (value, index) => {
  isChangeDescription.value = false
  if (value.trim() === '') {
    userCode.savedModuleCode[index].moduleDescription = saveDescription.value
    ElMessage({
      message: '修改失败!模组描述不能为空!',
      type: 'error'
    })
  } else {
    userCode.savedModuleCode[index].moduleDescription = value.trim()
  }
}
// 自定义指令，自动聚焦
const vFocus = {
  mounted: (el) => el.focus()
}
// 删除模块方法
const handleDeleteModule = (id) => {
  ElMessageBox({
    message: '确认删除该模块?(点击其他区域取消)',
    // type: 'warning',
    showClose: true,
    // center: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    callback: (action) => {
      if (action === 'confirm') {
        userCode.deleteSavedModule(id)
      }
    }
  })
}
</script>

<style scoped lang="less">
.codeModule {
  width: 100%;

  .header,
  .control {
    width: 100%;
    height: 30px;
    font-size: 20px;
    line-height: 30px;
    background-color: @theme-color;
    color: white;
    border-radius: 5px;
    text-align: center;
    //line-height: 30px;
    margin-bottom: 10px;
  }

  .control {
    display: flex;
  }
}

.card {
  position: relative;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 30px;
    right: 20px;
    background-color: @theme-color;
    //border: 5px solid @theme-color;
    border-radius: 10px;
    width: 30px;
    height: 30px;
    color: white;

    &:hover {
      cursor: pointer;
      background-color: lighten(@theme-color, 10%);
    }
  }
}

.item {
  font-size: 20px;
}

.nameInput {
  width: 100%;
  height: 30px;
  font-size: 20px;
  outline: none;
  border: 1px solid @theme-color;
}

.des-input {
  width: 100%;
  font-size: 20px;
  outline: none;
  border: 1px solid @theme-color;;
}

.record-title {
  width: 100%;
  color: @theme-color;
  font-size: 20px;
  text-align: center;
}

.footer {
  background-color: @theme-color;
  width: 100%;
  height: 10px;
}
</style>
