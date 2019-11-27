<template>
  <div class="detail-main">
    
    <detail-nav-bar ref="refDetailNavBar" class="detail-nav-bar" @titleClick="titleClick" :pCurrentIndex="2">
      <div slot="left">&lt</div>
      <div slot="center">详情</div>
      <div slot="right">详情</div>
    </detail-nav-bar>
    <scroll class="scroll" ref="refScroll" :probeType="3" @scroll="scroll">
      <detail-swiper :p-top-images="dTopImgages" ref="refTitleGoods"></detail-swiper>
      <detail-base-info :goods="dGoods"></detail-base-info>
      <detail-shop-info :shop="dShop"></detail-shop-info>
      <detail-goods-info :detailInfo="dDetailInfo" @imgLoaded="imgLoaded"></detail-goods-info>
      <detail-goods-params :paramInfo="dGoodsParam" ref="refTitleParam"/>
      <detail-comment-info :commentInfo="dCommentInfo" ref="refTitleComment"/>
      <detail-recommend-info :recommends="dRecommends" ref="refTitleRecommends"/>
    </scroll>
    <detail-bottom-bar></detail-bottom-bar>
    <back-top @click.native="backTop" ref="refBackTop" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
  import DetailNavBar from "./chileComps/DetailNavBar";
  import DetailSwiper from "./chileComps/DetailSwiper";
  import DetailBaseInfo from "./chileComps/DetailBaseInfo";
  import DetailShopInfo from "./chileComps/DetailShopInfo";
  import DetailGoodsInfo from "./chileComps/DetailGoodsInfo";
  import DetailGoodsParams from "./chileComps/DetailGoodsParams.vue";
  import DetailCommentInfo from "./chileComps/DetailCommentInfo";
  import DetailRecommendInfo from "./chileComps/DetailRecommendInfo";
  import DetailBottomBar from "./chileComps/DetailBottomBar";
  
  import {getDetail, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail.js"
  
  import {debounce} from "@/common/utils";
  import {itemImgListenerMixin, backTopMixin} from "@/common/mixin.js"
  import {BACK_POSITION} from "../../common/const";

  import Scroll from "@/components/common/scroll/Scroll.vue"
  
  // console.log(DetailNavBar);
  export default {
    name: "Detial"
    , data() {
      return {
        dIid: ""
        , dTopImgages: []         // 顶部轮播图
        , dGoods: {}              // 货品信息
        , dShop: {}               // 店铺信息
        , dDetailInfo: {}         // 详情数据
        , dGoodsParam: {}         // 货品参数信息
        , dCommentInfo: {}        // 评论信息
        , dRecommends: []         // 推荐信息
        // , eItemImgListener: null  // 保存事件函数  (因为被混入了, 所以注掉)
        , dTitleMapPos: []
        , dCurrentBarIndex: 0     // 当前 detail-nav-bar title 索引值
        , isShowBackTop: false    // 是否显示 回到顶部
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
      , DetailCommentInfo
      , DetailRecommendInfo
      , DetailBottomBar
    }
    
    //// vue高级功能: 代码混入, 将公用代码抽离, 混入到需要的地方, 混入的代码,和对应事件的代码被依次放入数组中,
    //                按数组中的顺序执行. 也就是先执行混入的代码, 然后再执行本身的代码. 这样本身的代码可以覆盖
    //                混入的代码.
    //   下面的例子, 我混入了 itemImgListenerMixin , 它是一个对象, 有一个成员是 mounted, 其中mounted内容会被混入到
    //                本地的 mounted 钩子函数中执行.
    , mixins: [itemImgListenerMixin, backTopMixin]
    , mounted() {
      // console.log("我是自己写的内容, 如果被混入, 混入的内容会先执行");
    
      this.calcTitleMapPos()
    }
    , deactivated() {
      // 解除事件
      this.$bus.$off("itemImgLoaded", this.eItemImgListener)
    }
    , activated() {
      if (this.dIid != this.cIid) {
        this.dIid = this.cIid;
        
        // 得到详情信息(除了推荐信息)
        getDetail(this.dIid).then((res) => {
          // 0. 得到数据
          const data = res.result;
          // console.log("Detail.activated()............");
          // console.log(data);
          
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
          
          // 6. 得到 评论信息
          if (data.rate.cRate > 0) this.dCommentInfo = data.rate.list[0]
        });
        
        // 得到 详情信息(推荐信息)
        getRecommend().then(res => {
          // console.log("######## 推荐信息 #######");
          // console.log(res);
          this.dRecommends = res.data.list;
        })
      }
    }
    , methods: {
      imgLoaded() {
        // console.log("imgLoaded @@@@@@");
        this.$refs.refScroll.refresh();
      }
      , titleClick(index) {
        console.log("titleClick::::::::: " + index);
        this.$refs.refScroll.refresh();
        this.calcTitleMapPos();
        this.$refs.refScroll.scrollTo(0, -this.dTitleMapPos[index].pos, 333);
      }
      // 计算 title 对映的 位置
      , calcTitleMapPos() {
        // $nextTick 是 vue 的回调函数, 回调条件: template 渲染完成. 这个函数很重要, 用它作为数据与渲染完成同步的标志
        // 我没有这个函数, 而是用了 setTimeout(). 因为它不保证图片也加载完了.
        // this.$nextTick(() => {})
        console.log("calcTitleMapPos $$$$$$$$$$$$$$$$$ ");
        setTimeout(() => {
          this.dTitleMapPos = Object.keys(this.$refs).filter((item) => {
            return item.indexOf("refTitle") >= 0    // 只保留包函 refTitle的
          });
          
          this.dTitleMapPos = this.dTitleMapPos.map((item, index) => {
            console.log({"title": this.dTitleMapPos[index], "pos": this.$refs[this.dTitleMapPos[index]].$el.offsetTop});
            return {"title": this.dTitleMapPos[index], "pos": this.$refs[this.dTitleMapPos[index]].$el.offsetTop}
          })
        }, 1111)
      }
      , scroll(position) {
        let okIndex = 0;
        let minVal = 99999999;

        // 得到 最接近的 title index
        this.dTitleMapPos.map((item, index) => {
          return -position.y - item.pos < 0 ? 999999999 : -position.y - item.pos
        }).forEach((item, index) => {
          if (item <= minVal) {
            minVal = item;
            okIndex = index;
          }
        })
        if (this.dCurrentBarIndex !== okIndex) {
          this.dCurrentBarIndex = okIndex;
          this.$refs.refDetailNavBar.setCurrentIndex(okIndex);
          console.log("this.dCurrentBarIndex=======" + this.dCurrentBarIndex);
        }
        
        // 计算 回到顶部
        // this.isShowBackTop = position.y < -BACK_POSITION
        
        // 使用混入的函数计算 回到顶部
        this.listenShowBackTop(position)
      }
    }
    , computed: {
      cIid() {
        return this.$route.query.iid
      }
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
    height: calc(100vh - var(--height-top-bar) - var(--height-bottom-bar));
    width: 100vw;
    background-color: #fff;
  }

</style>
