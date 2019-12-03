<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!--<sport-ball ref="ball" class="sport-ball"></sport-ball>-->
  </div>
  
</template>
<script>
  export default {
    name: "DetailBottomBar"
    , data() {
      return {}
    }
    , methods: {
      addToCart () {
        this.$emit("addCart")
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .bottom-bar {
    background-color: #fff;
    width: 100%;
    height: var(--height-bottom-bar);
    position: fixed;
    z-index: 100;
    bottom: 0;
  
    display: flex;
    text-align: center;
  }
  .bar-item {
    flex: 1;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 13px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 6px auto 3px;
    /*background: url("../../../assets/img/detailBottomBar/cs.png") 0 0/100% ;*/
  }
  .bar-left .service {
    /*background-position: 0 -54px;*/
    background: url("../../../assets/img/detailBottomBar/cs.png") 0 0/100% ;
  }
  .bar-left .shop {
    /*background-position: 0 -98px;*/
    background: url("../../../assets/img/detailBottomBar/shop.png") 0 0/100% ;
  }
  .bar-right {
    font-size: 15px;
    color: #fff;
    line-height: var(--height-bottom-bar);
  }
  .bar-right .cart {
    background-color: #ffe817;
    color: #333;
  }
  .bar-right .buy {
    background-color: #f69;
  }
  .sport-ball {
    position: absolute;
    left: 225px;
    bottom: 20px;
  }
  .select {
    background: url("../../../assets/img/detailBottomBar/collect-n.png") 0 0/100% ;
  }
  
</style>
