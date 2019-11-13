<template>
  <div class="goods-item">
    <!--@load是vue层img图片加载事件, img 原生的图片加载事件是 onload-->
    <img :src="goodsItem.show.img" alt="" @load="imgLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      &nbsp
      <span class="collect">{{goodsItem.cfav}}</span>
      
    </div>
  </div>
</template>
<script>
  export default {
    name: "GoodsListItem"
    , data() {
      return {}
    }
    , props: {
      goodsItem: {
        type: Object
        , default() {
          return {}
        }
      }
    }
    , methods: {
      imgLoaded() {
        console.log("imgLoaded...........");
        // console.log(this.$bus);
        this.$bus.$emit("itemImgLoaded");       // 向 事件总线 发射事件, 让能处理该事件的上级组件, 给定具体的处理方法
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .goods-item {
    width: 48%;
    padding-left: 4%;
    padding-bottom: 40px;
    position: relative;
  }
  .goods-item img {
    width: 100%;
    border-radius: 8px;
  }
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    padding-left: 8%;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  
  }
  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;          /*当文字多出的时间显示...*/
    white-space: nowrap;              /*当文字多出时, 不弯折*/
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect {
    position: relative;
  }
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/fav-n.png") 0 0 / 14px 14px;
  }
  
</style>
