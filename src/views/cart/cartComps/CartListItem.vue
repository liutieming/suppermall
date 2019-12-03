<template>
  <!--<h3>{{product}}</h3>-->
  <div id="shop-item">
    <div class="item-selector">
      <check-button :checked="product.checked" @click.native="btnClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">{{product.lowNowPrice}}</div>
        <div class="item-count right">{{product.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import CheckButton from "@/components/common/checkButton/CheckButton.vue";
  
  
  export default {
    name: "CartListItem"
    , components: {
      CheckButton
    }
    , data() {
      return {}
    }
    , props: {
      product: {
        type: Object
        , default() {
          return {};
        }
      }
    }
    , methods: {
      btnClick() {
        console.log("btnClick...........");
        this.product.checked = !this.product.checked;
      }
    }
    , computed: {}
  }
</script>
<style scoped>
  #shop-item {
    width: 100%;
    font-size: 0;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    display: flex;
  }
  .item-selector {
    flex: 1;
    display: flex;
    align-items: center;
    /*justify-content: center;*/
  }
  .item-img {
    flex: 3;
    padding: 5px;
  }
  .item-img img {
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
  }
  .item-info {
    flex: 12;
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
  }
  .item-info .item-desc {
    font-size: 14px;
    color: #666;
    margin-top: 15px;
  }
  .item-title, .item-desc {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .info-bottom {
    margin-top: 10px;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 10px;
  }
</style>












