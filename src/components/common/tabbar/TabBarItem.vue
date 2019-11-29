<template>
  <div class="tab-bar-item" @click="clk">
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    
    <!--通过类样式方法实现, 但无法传参数-->
    <!--<div :class="{active: isActive}">-->
      <!--<slot name="item-text"></slot>-->
    <!--</div>-->
    
    <!--通过动态绑定样式的方式实现, 该方法可以传activeColor参数-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabBarItem"
    , data() {
      return {
        // isActive: true
      }
    }
    , props: {
      path: String
      , activeColor: {
        type: String
        , default: "red"
      }
    }
    , methods: {
      // 当用户点击时进行路由
      clk () {
// console.log'xxx');
        this.$router.replace(this.path)
      }
    }
    , computed: {
      isActive () {
        return (this.$route.path.indexOf(this.path) >= 0 ? true : false)  // 找到了返回真
      }
      , activeStyle () {
        return this.isActive ? {color: this.activeColor} : {}
      }
    }
    , components: {}

  }
</script>
<style scoped>
  .tab-bar-item {
    /*实现平均占位*/
    flex: 1;
    /*实现文字居中*/
    text-align: center;
    height: var(--height-bottom-bar);
    font-size: 14px;
  }
  
  .tab-bar-item img {
    margin-top: 3px;
    width: 28px;
    height: 28px;
    vertical-align: -5px;
  }
  
  .active {
    color: royalblue;
  }
</style>
