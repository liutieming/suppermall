<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NavBar"
    , data() {
      return {}
    }
    , methods: {}
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .nav-bar {
    /* Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
     * 设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。
     */
    display: flex;
    /*一般导航的高度都是44px line-height 可以将盒子撑起来(但需要有内容)*/
    line-height: var(--height-top-bar); /*--height-top-bar=44px*/
    height: var(--height-top-bar);
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  }
  .left, .right {
    width: 60px;
    /*background-color: #f00;*/
  }
  .center {
    flex: 1;    /* 填充全部空间 */
    /*background-color: #0f0;*/
  }
</style>
