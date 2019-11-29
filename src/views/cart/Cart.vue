<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>
<script>
  import NavBar from "@/components/common/navbar/NavBar.vue"
  
  import CartList from "./cartComps/CartList"
  
  import {mapGetters} from "vuex";
  
  export default {
    name: "Cart"
    , data() {
      return {}
    }
    , methods: {}
    , computed: {
      // 直接手写
      // cartLength() {
      //   return this.$store.getters.cartLength;
      // }
      
      
      // mapGetters 使用方法 参见 https://vuex.vuejs.org/zh/guide/getters.html
      // 使用 mapGetters  解构 数组 得到 自动生成的 computed ; 这种方式不能重命名
      // ...mapGetters(["cartLength", "cartList"])
      
      // 使用 mapGetters 解构 对象 得到 自动生成的 computed ; 可以重命名
      ...mapGetters({
        length: "cartLength"
      })
    }
    , components: {
      NavBar
      , CartList
    }
  }
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 22px;
  }
</style>
