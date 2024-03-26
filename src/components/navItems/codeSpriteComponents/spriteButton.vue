<template>
  <div>
    <button class="spriteButton">{{ content }}</button>
  </div>
</template>

<script>
export default {
  props: {
    content: String
  }
}
</script>

<style lang="less" scoped>
.spriteButton {
  background-color: @theme-color;
  padding: 10px 20px;
  color: white;
  border-radius: 12px;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: lighten(@theme-color, 10%);
  }
}
</style>