import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore(
  'user',
  () => {
    //存储用户基本信息的仓库

    // 用户的账户和密码
    const user = ref({
      username: '',
      nickname: '',
      id: ''
    })
    // 提供方法来修改存储user仓库
    const setUserInfo = (obj) => {
      user.value = obj
    }
    // 保存token
    const token = ref(
      ''
    )
    // 提供方法来保存账号和密码

    const setUserToken = (newToken) => {
      token.value = newToken 
      localStorage.setItem('csToken', newToken)
    }

    // 清空Token
    const clearUserToken = () => {
      token.value = ''
      localStorage.removeItem('csToken')
    }
    return {
      user,
      setUserInfo,
      token,
      setUserToken,
      clearUserToken
    }
  },
  {
    persist: true
  }
)
