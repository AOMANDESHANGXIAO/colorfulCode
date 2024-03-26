import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'

export const useCodeStore = defineStore('localCode', () => {
  const moduleList = ref([
    {
      name: '默认模块',
      code: '',
      id: 1,
      color: 'skyblue',
      isSelected: true,
      description: '默认代码描述'
    }
  ])
  const findModuleLById = (id) => {
    return moduleList.value.find((module) => module.id === id)
  }
  // muduleList.Element = name:String, code:String, color: String, id:Number
  const id = ref(2)
  // 被选中的代码块
  const selectedCode = computed(() => {
    return moduleList.value.filter((item) => item.isSelected === true)
  })
  // const userCode = computed(() => {
  //   return selectedCode.value.reduce((sum, item) => {
  //     return sum + item.code + '\n'
  //   }, '')
  // })
  const userCode = ref('')
  // 添加模块区分功能
  const distinguishModule = (ele) => {
    return `#====模块:${ele.name}开始===\n${ele.code}\n#===模块:${ele.name}结束===`
  }
  // 预览代码
  const previewUserCode = computed(() => {
    return selectedCode.value.reduce((sum, item) => {
      return sum + distinguishModule(item) + '\n'
    }, '')
  })
  const getModuleCode = computed((id) => {
    return moduleList.value.find((item) => item.id === id).code
  })
  // 插入一个新的模块方法
  const generateNewModule = (name, color) => {
    const moduleId = id.value + 1
    const obj = { name, color, code: '', isSelected: true, id: moduleId, description: '' }
    id.value += 1
    moduleList.value.push(obj)
  }

  const pyodide = ref('')
  const results = ref('')

  // 封装代码的方法
  // 提供代码输入功能
  // 保存用户的输入
  const userInput = ref('')
  // 1. 将用户在输入框编写的输入格式化成为Python代码的列表格式
  const stringToList = () => {
    let arr = userInput.value.trim().split(/\s+/)
    // let arr = userInput.value.split()
    // 将数组转换为字符串，并添加引号
    let formattedArr = arr.map((item) => `'${item}'`)

    // 将数组转换为字符串，并添加方括号
    let arrStr = `[${formattedArr.join(', ')}]`

    // 返回格式化的字符串
    // console.log(`userDataxb123 = ${arrStr}\n`)
    return `userData123 = ${arrStr}`
  }
  // 2. 提供Python输入流重定向的模板语法
  const generateReStdCode = () => {
    // 拼接重定向的代码
    let pythonCodes = [
      'import builtins',
      'def input_generator(data):',
      '    for item in data:',
      '        yield item',
      `${stringToList()}`,
      'input = input_generator(userData123).__next__'
    ]
    return pythonCodes.join('\n')
  }
  // 3. 提供恢复Python输入流重定向的模板语法
  const generateReset = () => {
    return `input = builtins.input\n`
  }
  // 4. 将input()中的提示词全部删除，否则会报错
  const removePrompt = (inputStr) => {
    // 匹配input函数中的字符串参数，包括单引号和双引号
    let regex = /input\((["'])(.*?)\1\)/
    let match = inputStr.match(regex)

    // 如果找到匹配项，删除提示词和引号
    while ((match = regex.exec(inputStr)) !== null) {
      inputStr = inputStr.replace(`"${match[2]}"`, '').replace(`'${match[2]}'`, '')
    }

    // 如果没有找到匹配项，返回原字符串
    return inputStr
  }
  // 5. 使用上面封装的方法对用户的代码进行处理，同时为代码添加缩进，并且包裹在main()函数里面
  const indentUserCode = (moduleID) => {
    let myCode
    // 判断是否只运行一个代码块
    if (moduleID === -1) {
      myCode = userCode.value
    } else {
      myCode = selectedCode.value.find((item) => item.id === moduleID).code
    }
    // 封装用户的代码
    // 将用户的代码按行分割，然后在每一行的开始添加四个空格
    // 要将输入流重写，同时将用户的输入导入进来
    // 测试输入的格式是否正确
    myCode = `${generateReStdCode()}\n${myCode}`
    let indentedUserCode = myCode
      .split('\n')
      .map((line) => '    ' + line)
      .join('\n')
    indentedUserCode = `def main():\n${indentedUserCode}\n    ${generateReset()}\nmain()`
    // 将input中的输入提示词全部干掉
    indentedUserCode = removePrompt(indentedUserCode)
    // userInput.value = indentedUserCode
    return indentedUserCode
  }

  // =====Python运行环境配置======
  // 1. 获取pyodide
  const getPyodide = async () => {
    return await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/' })
  }
  // 2. 初始化Python终端
  const initPython = async () => {
    const originalConsoleLog = console.log
    results.value = ''
    // 重写console.log函数
    // 目的是将输出流重定向到results变量中
    console.log = function (message) {
      // 使用原始的console.log函数来输出消息
      // originalConsoleLog.apply(console, arguments)

      // 将输出添加到consoleOutput变量中
      results.value += message + '\n'
    }
    // 如果不存在，就重新加载Pyodide
    // 使用加载框提示用户正在加载
    const loading = ElLoading.service({
      fullscreen:true,
      text:'正在加载Python环境'
    })
    try {
      //
      console.log("重新载入了...")
      pyodide.value = await getPyodide()
    } catch (err) {
      loading.close()
      return ElMessage({
        message: '初始化Python环境失败!请重试!',
        type: 'error'
      })
    }
    console.log = originalConsoleLog
    console.log('init successfully!')
    loading.close()
    ElMessage({
      message: '初始化Python环境成功!',
      type: 'success'
    })
    // return Boolean(pyodide.value)
  }
  initPython()
  // 运行Python代码
  // moduleID为-1表示从上至下运行所有选择的Python代码
  const runCode = async (moduleID = -1) => {
    // 保存原始的console.log函数
    // console.log('selected?', selectedCode.value)
    const originalConsoleLog = console.log
    results.value = ''
    // 重写console.log函数
    console.log = function (message) {
      // 使用原始的console.log函数来输出消息
      // originalConsoleLog.apply(console, arguments)

      // 将输出添加到consoleOutput变量中
      results.value += message + '\n'
    }
    if (!pyodide.value || typeof pyodide.value.runPython !== 'function') {
      // 如果不存在，就重新加载Pyodide
      pyodide.value = await getPyodide()
    }
    try {
      // pyodide.value.runPython('clear')
      // pyodide.value.globals = pyodide.value.new_globals()
      const wrappedCode = indentUserCode(moduleID)
      // 一定要加await
      await pyodide.value.runPython(wrappedCode)
    } catch (err) {
      console.log(err)
    }
    console.log = originalConsoleLog
    // 保存运行结果
    const isRight = isRunningRight(results.value)
    saveResult(isRight, results.value, new Date().toLocaleString())
  }
  // 清空所有模块的代码方法
  const clearCode = () => {
    // userCode.value = ''
    moduleList.value = []
  }
  // 删除单一模块方法
  const deleteModule = (id) => {
    moduleList.value = moduleList.value.filter((item) => item.id !== id)
  }
  // 将运行结果保存起来的方法
  // 判断运行结果是否正确的函数
  const isRunningRight = (result) => {
    console.log('result:', result)
    if (result.startsWith('PythonError')) {
      return 'fail'
    }
    return 'success'
  }
  // type:'success'/'fail'，result:XXX, time: xxxx
  const runningResults = ref([])
  // 保存运行结果的方法
  const saveResult = (type, result, time) => {
    runningResults.value.unshift({
      type,
      result,
      time,
      id: time
    })
  }
  // 清除所有输出的方法
  const clearResults = () => {
    runningResults.value = []
  }
  // ======代码模块管理控制=====
  // 保存的对象数据格式: saveTime:String, saveCode:String, moduleName: String
  const savedModuleCode = ref([
    {
      id: 0,
      saveTime: '2022/04/17',
      moduleName: '模块名字',
      moduleDescription: '模块描述XXX',
      saveCode: 'print("HelloWorld")'
    }
  ])
  // 保存代码模块
  const generateNewSaveModule = (obj) => {
    savedModuleCode.value.unshift(obj)
  }
  // 删除模块
  const deleteSavedModule = (id) => {
    savedModuleCode.value = savedModuleCode.value.filter((item) => item.id !== id)
  }

  // 实现拖拽模块
  const isDragging = ref(false)
  // 生成一个虚拟的用于展示拖拽组件的数组
  const generateDraggableModuleList = () => {
    return moduleList.value.map((item) => {
      // { name: 'HAHAH', code: '', id: 0, color: 'skyblue', isSelected: true, description: '示范' }
      return {
        id: item.id,
        code: item.code,
        name: item.name,
        color: item.color,
        isSelected: item.isSelected,
        description: item.description
      }
    })
  }
  const setDraggableModuleList = (list) => {
    console.log('改变了?')
    moduleList.value = list
    console.log(moduleList.value)
  }
  //==========实现代码拖拽功能======
  // 1. 保存正在拖拽的代码
  const isDraggingCode = ref('')
  return {
    initPython,
    id,
    findModuleLById,
    previewUserCode,
    getModuleCode,
    userCode,
    moduleList,
    results,
    runCode,
    clearCode,
    runningResults,
    clearResults,
    generateNewModule,
    userInput,
    deleteModule,
    savedModuleCode,
    deleteSavedModule,
    generateNewSaveModule,
    isDragging,
    generateDraggableModuleList,
    setDraggableModuleList,
    isDraggingCode
  }
})
