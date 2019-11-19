<template>
  <div>
    <detail-nav-bar class="detail-nav-bar">
      <div slot="left">&lt</div>
      <div slot="center">详情</div>
    </detail-nav-bar>
    <detail-swiper :p-top-images="dTopImgages"></detail-swiper>
    <detail-base-info :goods="dGoods"></detail-base-info>
  </div>
</template>
<script>
  import DetailNavBar from "./chileComps/DetailNavBar";
  import DetailSwiper from "./chileComps/DetailSwiper";
  import DetailBaseInfo from "./chileComps/DetailBaseInfo";
  
  import {getDetail, Goods, Shop} from "@/network/detail.js"
  
  // console.log(DetailNavBar);
  export default {
    name: "Detial"
    , data() {
      return {
        dIid: ""
        , dTopImgages: []     // 顶部轮播图
        , dGoods: {}          // 货品信息
        , dShop: {}           // 店铺信息
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
        });
      }
      
    }
    , methods: {}
    , computed: {
      cIid() {
        return this.$route.query.iid
      }
    }
    , components: {
      DetailNavBar,
      NavBar: DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    }
  }
</script>
<style scoped>
</style>
