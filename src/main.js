import '@/styles/common.less'
import 'element-plus/dist/index.css'
// import '@/utils/live2d.min.js'
// import '@/utils/live2dcubismcore.min.js'
// 导入所有的el-icon图标
// import * as ElIconModules from '@element-plus/icons-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
// import Markdown from 'vue3-markdown-it'
const pinia = createPinia()
const app = createApp(App)
pinia.use(persist)
app.use(pinia)
// app.use(use(persist))

import router from './router'
// icon-park图标库的导入
// import '@icon-park/vue-next/styles/index.css'
// import * as IconPark  from '@icon-park/vue-next'
// import IconParkIcon from '@/utils/IconParkIcon.js'



// //  统一注册el-icon图标
// for(let iconName in ElIconModules){
//     app.component(iconName,ElIconModules[iconName])
// }
// 持久化Pinia数据

app.use(router)
// app.use(Markdown)
app.mount('#app')
