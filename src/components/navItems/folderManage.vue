<!-- 这是文件管理部分的组件 -->
<template>
  <div class="folderManage">
    <!-- 文件夹标题 -->
    <div class="folder">
      <!-- 折叠按钮 -->
      <el-tooltip content="折叠/打开列表" placement="top" effect="light">
        <downIcon @click="closeFolder($event)" :size="size" class="btn"></downIcon>
      </el-tooltip>
      <codeFolder :size="size"></codeFolder>
      <p>PythonProject</p>
      <!-- 创建文件按钮 -->
      <el-tooltip content="新建文件" placement="top" effect="light">
        <plusIcon :size="size" class="plus btn" @click="createFile"></plusIcon>
      </el-tooltip>
    </div>
    <!-- 文件内容模块 -->
    <div class="file-list" v-if="!codeStore.isEmptyStore" :class="{closed:closed}">
      <div
        class="item"
        v-for="(item, index) in codeStore.myCode"
        :key="item.id"
        :class="{ active: codeStore.activeFileID === item.id }"
        @click="handleShowFiles(item.id, index)"
      >
        <!-- 图标 -->
        <pythonIcon :size="'20'"></pythonIcon>
        <!-- 文本 -->
        <el-popover
          :visible="item.visible"
          placement="bottom-end"
          title="🚫🚫错误提示🚫🚫"
          :width="200"
          content="文件名长度限定一到十个字符且只能包含中英文，结尾必须为.py!"
          :show-arrow="false"
        >
          <template #reference>
            <span v-show="!item.changing" @dblclick="handleDbclick(item)">{{ item.name }}</span>
          </template>
        </el-popover>
        <input
          v-if="item.changing"
          v-focus
          v-model="item.name"
          @blur="handleEndInput($event, item)"
          @keyup.enter="handleEndInput($event, item)"
        />
        <!-- 下拉菜单 -->
        <el-dropdown v-if="activeIndex === index" placement="bottom-end">
          <div class="more">
            <moreIcon :size="'18'"></moreIcon>
          </div>
          <template #dropdown>
            <el-dropdown-item @click="deleteItem(item.id)">删除</el-dropdown-item>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div v-else class="no-file">
      <p>还没有文件哦!<br />点击右上角新建一个Python文件吧!<br />😉😉😉</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCodeStore } from '@/stores/index.js'
import { ElMessageBox, ElMessage } from 'element-plus'
const size = ref('24')

// 1. 导入Python文件模块
// 用户编辑的代码存储在本地
const codeStore = useCodeStore()
// console.log(codeStore.isEmptyStore)
// 2. 修改文件名模块
// 自动聚焦
const vFocus = {
  mounted: (el) => el.focus()
}
// 记录上一次文件名防止不合规
const savedFilename = ref('')
const handleDbclick = (item) => {
  savedFilename.value = item.name
  item.changing = true
}
// 自定义错误提示关闭时长
const handleEndInput = (event, item) => {
  codeStore.setChanging(item.id, false)
  // console.log('change?', item.changing)
  const fileName = event.target.value.trim()
  const isValidPythonFileName = /^[\u4e00-\u9fa5a-zA-Z0-9_]{1,8}\.py$/.test(fileName)
  if (!isValidPythonFileName) {
    // 文件名不合规
    // 替换为上一次的文件名
    item.name = savedFilename.value
    // 显示错误
    item.visible = true
    // 两秒后自动关闭
    setTimeout(() => {
      item.visible = false
    }, 4000)
  }
}

// 3. 选中active模块
const activeIndex = ref(0)

const handleShowFiles = (id, index) => {

  // 在打开文件的时候应该将当前正在编辑的代码文件进行展示
  codeStore.setActiveIndexById(id)
  codeStore.setThisFileShow(id)
  activeIndex.value = index
}
// 4. 新建Python文件模块
const createFile = () => {
  ElMessageBox.prompt('文件名需要和实际任务相关哦😊', '请输入新的Python文件名', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /^[a-zA-Z_\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_]{0,7}$/,
    inputErrorMessage:
      '文件名不合法，只能包含一到八位的中英文字符和数字以及下划线，不能以数字开头，不需要包含.py',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        // 对文件名进行处理，去除无效的空格和.py后缀
        let filename = instance.inputValue.trim().replace('.py', '')
        filename += '.py'
        // 在这里创建新的Python文件
        const newId = codeStore.pushNewFile(filename)
        // 创建的时候应该自动聚焦到该该文件上
        codeStore.setActiveIndexById(newId)
        // instance.inputValue 是用户输入的文件名
        ElMessage.success(`成功创建文件：${filename}`)
      }
      done()
    }
  }).catch(() => {}) // 捕获和处理取消的Promise
}

// 4. 删除Python文件模块
const deleteItem = (id) => {
  // 删除
  codeStore.handleClosedFileById(id)
  codeStore.removeAFile(id)
}

// 5. 折叠文件列表模块
const closed = ref(false)
// 提供一个方法来折叠或者打开列表
const closeFolder = (e) => {
  if(closed.value) {
    closed.value = false
    e.target.style.transform = 'rotate(0)'
    e.target.style.transition = 'all .3s'
  }else {
    closed.value = true
    e.target.style.transform = 'rotate(-90deg)'
  }

}

</script>

<style lang="less" scoped>
.folderManage {
  width: 100%;
  height: 100%;
  // padding: 40px;
  background-color: @font-color;
  overflow-x: hidden;
  border-right: 6px solid @theme-color;
  border-top: 6px solid @theme-color;
  .folder {
    display: flex;
    height: 30px;
    background-color: @theme-color;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    padding: 10px;
    overflow: hidden;

    p {
      font-size: @font-size-normal;
      color: white;
    }
    .btn {
      cursor: pointer;
    }
  }
  .file-list {
    transition: all 1s;
    overflow: hidden;
    .item {
      position: relative;
      display: flex;
      // justify-content: center;
      align-items: center;
      gap: 10px;
      width: 100%;
      height: 30px;
      // line-height: 30px;
      color: white;
      padding-left: 60px;
      font-size: @font-size-small;
      .more {
        // position: absolute;
        width: 20px;
        height: 20px;
        margin-left: 130px;
        // left: 0;
        // top: 50%;
      }
      &:hover {
        background-color: @theme-color;
      }
      input {
        outline: none;
        border: none;
        border-bottom: 1px solid white;
        background-color: @theme-color;
        color: white;
      }
    }
    .active {
      // 文件item被选中后的样式
      background-color: @theme-color;
      &::before {
        position: absolute;
        content: '✨✨';
        left: 0;
        top: 0;
      }
    }
  }
  .closed {
    // 这是折叠列表关闭时的样式
    transform: translateY(-500px);
  }
}
.plus {
  margin-left: auto;
}

.no-file {
  display: flex;
  width: 100%;
  height: 80%;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: @font-size-normal;
}
</style>
