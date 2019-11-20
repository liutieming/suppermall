<template>
  <div class="detail-main">
    <detail-nav-bar class="detail-nav-bar">
      <div slot="left">&lt</div>
      <div slot="center">详情</div>
      <div slot="right">详情</div>
    </detail-nav-bar>
    <scroll class="scroll" ref="refScroll">
      <detail-swiper :p-top-images="dTopImgages"></detail-swiper>
      <detail-base-info :goods="dGoods"></detail-base-info>
      <detail-shop-info :shop="dShop"></detail-shop-info>
      <detail-goods-info :detailInfo="dDetailInfo" @imgLoaded="imgLoaded"></detail-goods-info>
      <detail-goods-params :paramInfo="dGoodsParam"/>
    </scroll>
  </div>
</template>
<script>
  import DetailNavBar from "./chileComps/DetailNavBar";
  import DetailSwiper from "./chileComps/DetailSwiper";
  import DetailBaseInfo from "./chileComps/DetailBaseInfo";
  import DetailShopInfo from "./chileComps/DetailShopInfo";
  import DetailGoodsInfo from "./chileComps/DetailGoodsInfo"
  import DetailGoodsParams from "./chileComps/DetailGoodsParams.vue"
  
  import {getDetail, Goods, Shop, GoodsParam} from "@/network/detail.js"
  
  import Scroll from "@/components/common/scroll/Scroll.vue"
  
  // console.log(DetailNavBar);
  export default {
    name: "Detial"
    , data() {
      return {
        dIid: ""
        , dTopImgages: []     // 顶部轮播图
        , dGoods: {}          // 货品信息
        , dShop: {}           // 店铺信息
        , dDetailInfo: {}     // 详情数据
        , dGoodsParam: {}     // 货品参数信息
      }
    }
    , activated() {
      if (this.dIid != this.cIid) {
        this.dIid = this.cIid;
        getDetail(this.dIid).then((res) => {
          const data = res.result;
          console.log("Detail.activated()............");
          console.log(data);
          
          // 分离数据
          // 1. 得到 顶部轮播图的图片
          this.dTopImgages = data.itemInfo.topImages
          // console.log(this.dTopImgages);
          
          // 2. 得到 Goods 信息
          this.dGoods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
          
          // 3. 得到 Shop 商家信息
          this.dShop = new Shop(data.shopInfo)
          
          // 4. 得到 详情 数据
          this.dDetailInfo = data.detailInfo;
          
          // 5. 得到 货品参数信息
          this.dGoodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        });
      }
      
    }
    , methods: {
      imgLoaded() {
        console.log("imgLoaded @@@@@@");
        this.$refs.refScroll.refresh();
      }
    }
    , computed: {
      cIid() {
        return this.$route.query.iid
      }
    }
    , components: {
      DetailNavBar
      , NavBar: DetailNavBar
      , DetailSwiper
      , DetailBaseInfo
      , DetailShopInfo
      , Scroll
      , DetailGoodsInfo
      , DetailGoodsParams
    }
  }
</script>
<style scoped>
  .detail-main {
    position: relative;
    width: 100vw;
    z-index: 9;
    background-color: #fff;
    /*margin-top: var(--height-top-bar);*/
  }
  
  .detail-nav-bar {
    background-color: #fff;
    /*width: 100%;*/
    position: relative;
    /*top: 0;*/
    /*left: 0;*/
    z-index: 9;
  }
  
  .scroll {
    position: fixed;
    top: var(--height-top-bar);
    height: calc(100vh - var(--height-top-bar));
    width: 100vw;
    background-color: #fff;
  }

</style>
