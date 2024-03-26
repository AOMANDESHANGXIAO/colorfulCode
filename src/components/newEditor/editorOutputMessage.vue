<template>
  <div v-if="props.type === 'success'" class="box">
    <div class="success">
      <span class="title">运行成功!</span><span class="time">{{ props.time }}</span>
    </div>
    <div>运行结果: {{ props.result }}</div>
  </div>
  <div v-else class="box">
    <div class="fail">
      <span class="title">运行失败!</span><span class="time">{{ props.time }}</span>
    </div>
    <div class="failResult">运行结果: {{ props.result }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: String,
  time: String,
  result:String
})
</script>

<style lang="less" scoped>
.title {
  font-size:20px;
  // color:red;

}
.time {
  font-size: 15px;
  margin-left: 10px;
}
.success {
  color: white;
  margin-bottom: 5px;
  .title {

    color: #32cd32;
  }
}
.fail {
  color: white;
  margin-bottom: 5px;
  .title {
    color: #ff5733;
  }
}
.box {
  margin-bottom: 10px;
}
.failResult {
  color: #ff5733;
}
</style>
