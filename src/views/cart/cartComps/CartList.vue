<template>
  <div class="cart-list">
    <scroll ref="refScroll" class="scroll" :probeType="3">
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index"/>
    </scroll>
  </div>
</template>
<script>
  import { mapGetters } from "vuex"
  
  import Scroll from "@/components/common/scroll/Scroll.vue"
  
  import CartListItem from "./CartListItem";
  
  export default {
    name: "CartList"
    , components: {
      Scroll
      , CartListItem
    }
    , data() {
      return {}
    }
    , methods: {}
    , computed: {
      ...mapGetters(["cartList"])
    }
  }
</script>
<style scoped>
  .scroll {
    width: 100vw;
    height: calc(100vh - var(--height-bottom-bar) - var(--height-top-bar) - 40px);  /*40px 是 购物车底部工具栏的高度*/
    overflow: hidden;
  }
</style>
