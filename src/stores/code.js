import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// 这是保存用户代码信息的仓库
export const useCodeStore = defineStore(
  'code',
  () => {
    // 0. 提供模拟存储代码文件的对象
    const myCode = ref([
    ])
    // 对象设定为
    // {
    //   name: filename,
    //   id: Date.now(),
    //   code: '#coding here...',
    //   changing: false, // 是否正在改变文件的名称
    //   visible: false, // 是否可见修改文件名的错误提示
    //   isShowing: true // 是否展示在文件导航栏目
    // }
    // 1. 提供一个方法创建新的文件对象
    const createNewFileObj = (filename) => ({
      name: filename,
      id: Date.now(),
      code: '#coding here...',
      changing: false, // 是否正在改变文件的名称
      visible: false, // 是否可见修改文件名的错误提示
      isShowing: true // 是否展示在文件导航栏目
    })
    // 2. 提供一个方法为myCode添加新的文件
    const pushNewFile = (newFile) => {
      myCode.value.push(createNewFileObj(newFile))
      // 将新对象的id返回便于接收
      return myCode.value[myCode.value.length - 1].id
    }

    // 3. 提供一个方法移除myCode对象
    const removeAFile = (id) => {
      myCode.value = myCode.value.filter((item) => item.id !== id)
    }

    // 4. 提供一个属性判断仓库是否为空
    const isEmptyStore = computed(() => myCode.value.length === 0)

    // 5. 提供一个计算属性，包含所有正在展示的代码文件
    const isShowingFiles = computed(() => myCode.value.filter((item) => item.isShowing))

    // 6. 提供一个方法，取消展示一个文件
    const notShowThisFile = (id) => {
      myCode.value.find((item) => item.id === id).isShowing = false
    }

    // 7. 提供一个方法，展示一个文件
    const setThisFileShow = (id) => {
      myCode.value.find((item) => item.id === id).isShowing = true
    }

    // 8. 提供一个方法更改一个文件的changing属性
    const setChanging = (id, value) => {
      myCode.value.find((item) => item.id === id).changing = value
    }

    // 9. 提供一个属性，如果从folderManage中点击文件让activeIndex共通到导航栏目中
    const activeFileID = ref(null)

    // 10. 提供一个方法，将当前展示的文件设置为id为传入值的文件
    const setActiveIndexById = (id) => {
      activeFileID.value = id
    }
    // 重构后的 handleClosedFileById 方法，增强了健壮性和可读性

    // 11. 提供一个方法处理在导航栏关闭文件时的问题
    const handleClosedFileById = (id) => {
      // 如果点击关闭的文件并不是当前正在展示的文件，什么也不做
      if (id !== activeFileID.value || isShowingFiles.value.length === 1) return
      // 如果是当前的id，则将展示的id顺位给当前id所在位置的上一个
      const index = isShowingFiles.value.findIndex((item) => item.id === id)
      if (index === -1) {
        console.log('尝试关闭的文件ID没有在显示列表中找到')
        return
      }
      // 如果目前元素前面还有别的元素
      if (index - 1 >= 0) {
        activeFileID.value = isShowingFiles.value[index - 1].id
      } else {
        activeFileID.value = isShowingFiles.value[index + 1].id
      }
    }

    // 12. 提供一个方法获得当前正在编辑的代码
    const getCodes = () => {
      if (isEmptyStore.value) return false
      return myCode.value.find((item) => item.id === activeFileID.value).code
    }

    // 13. 提供一个方法获取当前出错的代码
    // 提供文件 ID和出错信息
    const errorCodes = ref([])
    // error列表中的元素格式设置为:  {id: XXX, errorCodes: XXX }
    // 插入错误信息方法，如果已存在id，则进行覆盖，如果不存在则添加到错误信息列表中
    const recordError = (errorInfo) => {
      const isExisted = errorCodes.value.findIndex((e) => e.id !== activeFileID.value)
      if (isExisted !== -1) {
        // 说明存在相同 id的错误，进行替换更新
        errorCodes.value[isExisted] = { id:activeFileID.value, errorInfo }
        return true
      } else {
        // 否则存储新文件的错误
        errorCodes.value.push({ id:activeFileID.value, errorInfo })
        return false
      }
    }
    // 14. 提供一个方法获取错误对应文件的错误信息
    const getErrorInfo = () => {
      const errorIndex = errorCodes.value.findIndex((e) => e.id === activeFileID.value)
      if (errorIndex !== -1) {
        // 如果找到了错误，返回错误信息
        return errorCodes.value[errorIndex].errorInfo
      } else {
        // 如果没有找到错误，返回 null
        return null
      }
    }
    // 15. 用户正在忙的任务
    const codeTask = ref('')

    // 提供方法修改当前的错误文件和
    return {
      myCode,
      activeFileID,
      setActiveIndexById,
      handleClosedFileById,
      pushNewFile,
      removeAFile,
      isEmptyStore,
      isShowingFiles,
      notShowThisFile,
      setThisFileShow,
      setChanging,
      getCodes,
      errorCodes,
      recordError,
      getErrorInfo,
      codeTask
    }
  },
  {
    persist: true
  }
)
