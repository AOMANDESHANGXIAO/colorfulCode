<template>
  <div class="editorIndex">
    <!-- <editorHeader></editorHeader> -->
    <codeHeader></codeHeader>
    <el-row class="down">
      <el-col :span="6"> <NoteBookNew></NoteBookNew></el-col>
      <el-col :span="12"><editorCodeNew></editorCodeNew></el-col>
      <el-col :span="6"><AiHelper></AiHelper></el-col>
    </el-row>
  </div>
  <!-- <TaskPlane></TaskPlane> -->
</template>

<script setup>
defineOptions({
  name: 'editorIndex'
})
</script>

<style lang="less" scoped>
@titleHeight: 50px;
@contentWidth: 300px;
.editorIndex {
  display: flex;
  flex-direction: column;
  background: #feac5e; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #4bc0c8,
    #c779d0,
    #feac5e
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #4bc0c8, #c779d0, #feac5e);
  // background: url(@/assets/bg.png) center no-repeat;
  background-size: cover;
  .down {
    // 占据剩余高度
    // display: flex;
    // flex-direction: row;
    // justify-content: center;
    height: calc(100vh - 20px);
    // width: calc(100vw - @contentWidth);
    width: 100vw;
    overflow: hidden;
    // background-color: green;
  }
}
</style>
