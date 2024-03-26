<!-- 这是编辑器的导航模块 -->
<template>
  <div class="editorNav">
    <!-- 侧部导航栏重构 -->
    <!-- 导航 -->
    <div class="nav">
      <!-- 头像 -->
      <div class="portarit">
        <portaritIcon></portaritIcon>
      </div>
      <!-- 动态渲染用户的名字 -->
      <p class="name">{{ userStore.user.nickname || '加载中' }}</p>
      <!-- 分隔线 -->
      <div class="line"></div>
      <!-- 图标列表 -->
      <div class="icon-list">
        <!-- 滚动条 -->
        <div @click="handleClickIcon(0)" class="item" :class="{ active: activeIndex === 0 }">
          <el-tooltip content="代码支架" effect="light" placement="top">
            <div>
              <noteIcon :size="size"></noteIcon>
            </div>
          </el-tooltip>
        </div>
        <div @click="handleClickIcon(1)" class="item" :class="{ active: activeIndex === 1 }">
          <el-tooltip content="编程精灵" effect="light" placement="top">
            <div>
              <spriteIcon :size="size"></spriteIcon>
            </div>
          </el-tooltip>
        </div>
      </div>
      <!-- 底部设置按钮 -->
      <div class="bottom">
        <div class="line"></div>
        <el-tooltip content="设置" placement="top" effect="light">
          <settingIcon :size="size"></settingIcon>
        </el-tooltip>
      </div>
    </div>
    <!-- 这里展示对应的导航界面 -->
    <div class="nav-item">
      <NoteBookNew v-show="activeIndex === 0"></NoteBookNew>
      <CodeSpriteCom v-show="activeIndex === 1"></CodeSpriteCom>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { onMounted } from 'vue'
import { getUserInfo } from '@/api/my.js'
// import resize from '@/utils/resize.js'
// import { ref } from 'vue'
defineOptions({
  name: 'editorNav'
})
// const vResize = resize
//  1. 统一控制图标尺寸大小
const size = ref('28')

// 2. 设置活跃导航栏
const activeIndex = ref(0)

const handleClickIcon = (index) => {
  console.log(index)
  activeIndex.value = index
}

const userStore = useUserStore()
const handleGetUserInfo = async () => {
  // console.log(getUserInfo(userStore.token))
  const res = await getUserInfo()
  console.log('res.data=', res.data)
  const userInfo = {
    id: res.data.id,
    nickname: res.data.nickname,
    username: res.data.username
  }
  console.log('userInfo:', userInfo)
  userStore.setUserInfo(userInfo)
  console.log('OK')
}
onMounted(() => {
  handleGetUserInfo()
  // console.log(userStore.token)
  // 获取用户基本信息后将其存储到user仓库中
})
</script>

<style lang="less" scoped>
@editorNavWidth: 35%;
@portarit-size: 40px;
.editorNav {
  position: relative;
  width: @editorNavWidth;
  transition: all 0.5s;
  border-right: 1px solid #2b333e;
  display: flex;
  // height: 100vh;
  height: 100%;

  .nav-item {
    width: 500px;
    height: 100vh;
    background-color: @font-color;
    overflow-x: hidden;
  }

  .nav {
    box-sizing: content-box;
    width: 80px;
    height: 100%;
    background-color: rgba(40, 44, 52, 0.4);
    border-right: 6px solid @theme-color;
    backdrop-filter: blur(8px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .portarit {
      width: @portarit-size;
      height: @portarit-size;
      border-radius: (@portarit-size / 2px);
      margin-top: 20px;
      background-color: skyblue;
      overflow: hidden;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .name {
      font-size: @font-size-normal;
      color: #fff;
      margin-top: 10px;
      font-weight: 300;
    }

    .line {
      width: 30px;
      height: 3px;
      margin: 20px 0;
      background-color: @theme-color;
    }

    .icon-list {
      display: flex;
      flex-direction: column;
      height: 40%;
      width: 100%;
      justify-content: space-around;
      // background-color: pink;
      .item {
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.5s ease;
        // background-color: pink;
        width: 100%;
        min-height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: @theme-color;
        }
      }

      .active::before {
        // border-left: 6px solid @theme-color;
        content: '';
        display: block;
        position: absolute;
        height: 100%;
        width: 6px;
        left: 0;
        top: 0;
        background-color: @theme-color;
      }
    }

    .bottom {
      margin-top: auto;
      margin-bottom: 20px;
      cursor: pointer;
    }
  }
}
</style>
