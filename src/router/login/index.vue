<template>
  <div class="login">
    <div class="mask" :class="{ activeMask: isFocused }"></div>
    <!-- 加一个走马灯效果图 -->
    <div class="carousel">
      <el-carousel indicator-position="outside" height="500px">
        <el-carousel-item v-for="(item, index) in List" :key="index">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="login-form" :class="{ activeLogin: isFocused }">
      <h2>Welcome to ColorfulCode</h2>
      <!-- 通过tabs导航栏来控制登录和注册 -->
      <el-tabs v-model="activeName" class="demo-tabs">
        <!-- 登录表单 -->
        <el-tab-pane label="登录" name="first" class="colorFul">
          <el-form ref="loginForm" :model="loginData" :rules="loginRules">
            <el-form-item prop="username">
              <el-input
                v-model="loginData.username"
                prefix-icon="User"
                placeholder="请输入账号"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginData.password"
                type="password"
                show-password
                prefix-icon="Hide"
                placeholder="请输入密码"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="handleLogin" type="primary" class="loginButton">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 注册表单 -->
        <el-tab-pane label="注册" name="second">
          <el-form ref="registForm" :model="registData" :rules="registRules">
            <el-form-item prop="username">
              <el-input
                v-model="registData.username"
                prefix-icon="User"
                placeholder="请输入账号"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registData.password"
                type="password"
                show-password
                prefix-icon="Hide"
                placeholder="请输入密码"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item prop="repassword">
              <el-input
                v-model="registData.repassword"
                type="password"
                show-password
                prefix-icon="Hide"
                placeholder="请再次输入密码"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item prop="nickname">
              <el-input
                v-model="registData.nickname"
                placeholder="请输入昵称"
                @focus="addMask"
                @blur="removeMask"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <span> 性别： </span>
              <el-radio-group v-model="registData.gender">
                <el-radio label="m" size="large">男生</el-radio>
                <el-radio label="w" size="large">女生</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <span> 年龄：</span>
              <el-input-number
                v-model="registData.age"
                :min="10"
                :max="18"
                size="small"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item>
              <el-button @click="handleRegist" type="primary" class="loginButton">注册</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/index.js'

import img1 from '@/assets/img_carousel1.png'
import img2 from '@/assets/img_carousel2.png'
import img3 from '@/assets/img_carousel3.png'

import { userLogin, userRegister } from '@/api/user.js'
// vue3使用宏函数来定义组件的名称
defineOptions({
  name: 'loginIndex'
})
// 路由
const router = useRouter()
// tab栏目默认的选项
const activeName = ref('first')
// 绑定登录时的账号密码
const loginData = ref({
  // 为测试方便直接加上了user和password
  username: '',
  password: ''
})
// 登录表单验证

const loginRules = {
  username: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '账号的长度为3到10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码的长度为6到20', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        const reg = /^[A-Za-z0-9]+$/
        if (!reg.test(value)) {
          callback(new Error('密码只能包含英文大小写字母以及数字'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
// 绑定注册时的账号密码以及再密码
const registData = ref({
  username: '',
  password: '',
  repassword: '',
  nickname: '',
  // 选择一个默认的性别为男生，即m
  gender: 'm',
  age: 0
})

// 用户信息仓库
const userStore = useUserStore()
// 处理登录事件
const loginForm = ref()
const handleLogin = async () => {
  // 登陆之前再次验证
  await loginForm.value.validate()
  // 与账户进行匹配
  // 处理用户登录
  // console.log(loginData.value)
  const res = await userLogin(loginData.value)
  // 保存传递的token
  // console.log(data)
  // console.log('重复打印token:', res.data.token)
  const {
    data: { token }
  } = res
  // console.log(userStore.setUserToken(data.token))
  userStore.setUserToken(token)
  // 直接进入编辑器路由
  // console.log('成功获取Token!')
  // 携带token跳转到editor路由
  router.push(`/editor?name=${loginData.value.username}`)
}

// 注册表单验证模块
const registRules = {
  username: [
    { required: true, message: '内容不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '账号的长度为3到10', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]*$/,
      message: '用户名只能包含英文大小写字母以及数字',
      trigger: ['blur', 'change']
    }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '密码的长度为6到12', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 12, message: '密码的长度为6到12', trigger: 'blur' },
    { required: true, message: '确认密码不能为空', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registData.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: ['blur', 'change'] },
    { min: 1, max: 5, message: '昵称长度必须在1到5个字符之间', trigger: ['blur', 'change'] },
    {
      validator: (rule, value, callback) => {
        const specialCharRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]*$/ // 允许字母和数字，以及汉字
        if (!specialCharRegex.test(value)) {
          callback(new Error('昵称不能包含特殊字符!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const registForm = ref()
// 注册事件模块
// 保存用户信息到本地

const handleRegist = async () => {
  // 注册之前进行预校验
  await registForm.value.validate()
  // 调用接口向服务器发送注册请求
  const userRegisterInfo = {
    username: registData.value.username,
    password: registData.value.password,
    nickname: registData.value.nickname,
    gender: registData.value.gender,
    age: registData.value.age
  }
  // console.log(userRegisterInfo)
  await userRegister(userRegisterInfo)
  // 如果注册成功，转到登录视图
  activeName.value = 'first'
  // console.log(res)
}

// 毛玻璃效果控制代码
const isFocused = ref(false)
// 当输入框聚焦的时候为背景添加毛玻璃效果
const addMask = () => {
  isFocused.value = true
}
const removeMask = () => {
  isFocused.value = false
}

// 走马灯效果图片
const List = ref([img1, img2, img3])
</script>

<style lang="less" scoped>
:deep(.el-tabs__item) {
  color: #0e0e3a;
}
@keyframes rainbow {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}
.login {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  // background-color: pink;
  background: #feac5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4bc0c8,
    #c779d0,
    #feac5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #4bc0c8,
    #c779d0,
    #feac5e
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  // animation: rainbow 1.5s ease-in-out infinite alternate;
  background-size: cover;
  position: relative;
  .mask {
    // 毛玻璃遮罩层
    position: absolute;
    content: ' ';
    width: 100%;
    height: 100%;
    bottom: 0;
    left: -100%;
    // border-radius: 50%;
    transition: all 0.8s;
  }
  .login-form {
    background: rgba(255, 255, 255, 0.6);
    // text-align: left;
    box-sizing: content-box;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15); /* 水平偏移 垂直偏移 模糊距离 阴影颜色 */
    transition: all 0.5s;
    backdrop-filter: blur(8px);
    transform: translateX(80%);
    h2 {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 10px;
    }
    .loginButton {
      width: 100%;
      font-size: 12px;
      background: linear-gradient(to right, #4bc0c8, #c779d0, #feac5e);
      border: none;
      transition: all 0.5s;
      &:hover {
        background-size: 200% auto;
        color: #fff;
        border-radius: 5px;
        // background-image: linear-gradient(
        //   45deg,
        //   lighten(@theme-color, 20%),
        //   @theme-color,
        //   darken(@theme-color, 5%)
        // );
        animation: rainbow 1.5s ease-in-out infinite alternate;
      }
      // background: linear-gradient(90deg, #f96f9c, #3078c0, #7359bd)
    }
  }
}
.login .activeMask {
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  left: 0;
}
// 被选中时让登录框的毛玻璃效果削弱
.login .activeLogin {
  backdrop-filter: blur(0px);
  background-color: rgba(255, 255, 255, 0.8);
}
:deep(.el-tabs__active-bar) {
  background-color: @theme-color;
}
// :deep(.el-radio__input .is-checked) {
//   background-color: @theme-color;

// }
// 走马灯
.login .carousel {
  position: absolute;
  left: 10%;
  width: 800px;
  height: 500px;
  background-color: pink;
  .el-carousel__item {
    width: 100%;
    height: 100%;
    background-color: blue;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
