<template>
  <div class="cart-list">
    <scroll ref="refScroll" class="scroll" :probeType="3">
      <ul>
        <li v-for="item in cartList">{{item}}</li>
      </ul>
    </scroll>
  </div>
</template>
<script>
  import { mapGetters } from "vuex"
  import Scroll from "@/components/common/scroll/Scroll.vue"
  
  export default {
    name: "CartList"
    , components: {
      Scroll
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
  .cart-list {
    width: 100vw;
    height: 100vh - var(--height-bottom-bar) - var(--height-top-bar);
    overflow: hidden;
  }
</style>
