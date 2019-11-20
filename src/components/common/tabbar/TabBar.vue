<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabBar"
    , data() {
      return {}
    }
    , methods: {}
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  #tab-bar {
    /*设置显示方式的 flex 浮动的*/
    display: flex;
    background-color: #f5f5f5;
    
    /*设置位置在最底部*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  
    /*设置小阴影 参数 0 偏离X轴; -1px 偏离Y轴(向上); 11px 模糊长度; rgba(~~~~); 颜色及透明度*/
    box-shadow: 0 -1px 11px rgba(100, 100, 100, 0.5);
    
  }
  
  .tab-bar-item {
    /*实现平均占位*/
    flex: 1;
    /*实现文字居中*/
    text-align: center;
    height: var(--height-bottom-bar)  /*--height-bottom-bar=49px*/
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
  }
</style>
