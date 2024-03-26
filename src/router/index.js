import { createRouter, createWebHistory } from 'vue-router'
// import login from '@/router/login/index.vue'
import editor from '@/router/editor/index.vue'
// import { ElMessage } from 'element-plus'
// import { useUserStore } from '@/stores'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/editor' },
    // { path: '/login', component: login },
    { path: '/editor', component: editor }
  ]
})

// 删除登录功能
// const userStore = useUserStore()
// const unAuthUrl = ['/editor']
// router.beforeEach((to, from, next) => {
//   // 检查路由是否需要认证
//   if (unAuthUrl.includes(to.path)) {
//     // 检查用户是否携带了token
//     const token = localStorage.getItem('csToken')
//     if (!token) {
//       // 如果没有token，重定向到登录页面
//       next({ path: '/login' })
//       ElMessage({
//         message: '请先登录!',
//         type:'error'
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })
export default router
