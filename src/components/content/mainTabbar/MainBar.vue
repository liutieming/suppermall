<template>
  <tab-bar>
    <!--注意这里父组件(App) 传 子组件组件(TabBarItem)自定义属性性 path, 给定路由 -->
    <!--@是一个别名, @ = src 所在文件夹的路径, 其定义在
          E:/LTM/99_WS/MYPRJ2/IWS/study/vue190920/vue15tabbar/tabbar/node_modules/@vue/cli-service/lib/config/base.js
          第49行
    -->
    <tab-bar-item path="/home" active-color="blue">
      <img slot="item-icon" src="@/assets/img/tabbar/shouye-xianxing.png">
      <img slot="item-icon-active" src="@/assets/img/tabbar/shouye.png">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="blue">
      <img slot="item-icon" src="@/assets/img/tabbar/ziyuan-xianxing.png">
      <img slot="item-icon-active" src="@/assets/img/tabbar/ziyuan.png">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img slot="item-icon" src="@/assets/img/tabbar/caigou-xianxing.png">
      <img slot="item-icon-active" src="@/assets/img/tabbar/caigou.png">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <img slot="item-icon" src="@/assets/img/tabbar/yonghu-xianxing.png">
      <img slot="item-icon-active" src="@/assets/img/tabbar/yonghu.png">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
  import TabBar from "@/components/common/tabbar/TabBar.vue"
  import TabBarItem from "@/components/common/tabbar/TabBarItem"
  
  export default {
    name: "MainBar"
    , data() {
      return {}
    }
    , methods: {}
    , computed: {}
    , components: {
      TabBar
      , TabBarItem
    }
  }
</script>
<style scoped>
</style>
