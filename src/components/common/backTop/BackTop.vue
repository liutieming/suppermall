<template>
  <div class="back-top">
    <img src="@/assets/img/common/back_top.png"/>
  </div>
</template>
<script>
  export default {
    name: "BackTop"
    , data() {
      return {}
    }
    , methods: {
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .back-top {
    position: fixed;
    z-index: 1111;
    right: 5px;
    bottom: calc(var(--height-bottom-bar) + 5px);
  }
  .back-top img {
    width: calc(var(--height-bottom-bar) / 4 * 3);
    height: calc(var(--height-bottom-bar) / 4 * 3);
  }
</style>
