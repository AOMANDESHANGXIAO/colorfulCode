<template>
  <!-- 这是输出消息组件 -->
  <div class="outputMessage">
    <!-- 代码是否运行成功的标题 -->
    <div class="title">
      <div>运行时间: {{ item.time }}</div>
      <span v-if="item.isRight" class="success"> 成功运行! </span>
      <span v-else class="fail"> 运行出错! </span>
    </div>
    <div :class="{ error: !item.isRight }">
      {{ item.outPut }}
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
}
</script>
<style scoped lang="less">
.outputMessage {
  margin-bottom: 10px;
}
.title {
  font-size: @font-size-big;
}
.success {
  color: chartreuse;
}
.fail {
  color: red;
}
.error {
  color: red;
}
</style>
