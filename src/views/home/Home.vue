<template>
  <div id="home">
    <nav-bar class="home-nav" ref="refHomeNav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新品', '精选']"
                 @tabClick="tabClick"
                 ref="refTabControlTop"
                 v-show="isFixed"
    />
    <scroll class="BScroll"
            ref="refScroll"
            :probeType="3"
            :pullUpLoad="true"
            @scroll="contentScroll"
            @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"
                   @swiperImageLoaded="swiperImageLoaded"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-week></feature-week>
      <tab-control class="tab-control"
                   :titles="['流行', '新品', '精选']"
                   @tabClick="tabClick"
                   ref="refTabControlFloat"
                   v-show="!isFixed"
      />
      <!--<goods-list :goods="goods[currentType].data"></goods-list>-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    
    <!--组件的原生事件如 click (非原生事件为 组件 内部 $emit 出来的事件), 必须给对应事件加上 .native 修改符, 才能进行监听-->
    <back-top @click.native="backTop" ref="refBackTop" v-show="isShowBackTop"></back-top>
    
  </div>
</template>
<script>
  // import {debounce} from "@/common/utils.js";                           // 载入 防抖函数
  import {itemImgListenerMixin} from "@/common/mixin.js";                    // 载入 防抖函数
  import {backTopMixin} from "@/common/mixin.js"
  import {BACK_POSITION} from "@/common/const";
  
  import NavBar from "@/components/common/navbar/NavBar"
  import TabControl from "@/components/content/tabControl/TabControl"
  import GoodsList from "@/components/content/goods/GoodsList"
  
  import Scroll from "@/components/common/scroll/Scroll"
  
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureWeek from "./childComps/FeatrueWeek"
  
  import {getHomeMultidata, getHomeGoods} from "@/network/home"
  
  // import mockjs from '@/mock/test.js'
  
  export default {
    name: "Home"
    , data() {
      return {
        result: null
        , banners: []
        , recommends: []
        , goods: {
          "pop": {
            page: 0
            , data: []
          }
          , "new": {
            page: 0
            , data: []
          }
          , "sell": {
            page: 0
            , data: []
          }
        }
        , currentType: 'pop'
        , isShowBackTop: false
        , tabOffsetTop: 0
        , isFixed: false
        , leaveY: 0               // 记录当离开 home页面时 scroll 的 y轴位置
        // , eItemImgListener: null  // 用于保存 一个事件函数 (因为 混入了, 所以注掉)
      }
    }
    , components: {
      NavBar
      , TabControl
      , GoodsList
      
      , Scroll
      
      , HomeSwiper
      , RecommendView
      , FeatureWeek
    }
    , created() {
      // 请求多个数据
      this.getHomeMultidata();
      
      // 请求商品数据
      this.getHomeGoods("pop", 1);
      this.getHomeGoods("new", 1);
      this.getHomeGoods("sell", 1);
    }
    //// 代码混入: vue高级功能, 将公用代码抽离, 混入到需要的地方, 混入的代码,和对应事件的代码被依次放入数组中,
    //                按数组中的顺序执行. 也就是先执行混入的代码, 然后再执行本身的代码. 这样本身的代码可以覆盖
    //                混入的代码.
    //   下面的例子, 我混入了 itemImgListenerMixin , 它是一个对象, 有一个成员是 mounted, 其中mounted内容会被混入到
    //                本地的 mounted 钩子函数中执行.
    , mixins: [itemImgListenerMixin, backTopMixin]
    , mounted() {
      // console.log("有代码混入, 所以我就不用写代码了");
    }
    , activated() {
      // console.log('activated');
      this.$refs.refScroll.refresh();                     // 刷新一次 (重新计算 scroll 的高度)
      this.$refs.refScroll.scrollTo(0, this.leaveY, 0)    // 跳回到 scroll 离开时的y轴位置
      this.$refs.refScroll.refresh();                     // 刷新一次 (重新计算 scroll 的高度)
    }
    , deactivated() {
      // 1. 保存Y值
      // console.log('deactivated');
      this.leaveY = this.$refs.refScroll.getScrollY();    // 记录 scorll 的y轴位置
      
      // 2. 取消全局事件监听
      this.$bus.$off('itemImgLoaded', this.eItemImgListener)
    }
    , methods: {
      swiperImageLoaded() {
        // 当轮播图加载完毕, 得到 tab_control 的 offsetTop 值
        //   以轮播图加载完第一个图片做为tab_control的offsetTop稳定值, 是因为, 这个轮播图,是最大的图, 它的加载
        //   可以作为, tab_control上面的图片加载完后撑起tab_control.offsetTop值的条件.
        
        // console.log(this.$refs.refTabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.refTabControlFloat.$el.offsetTop
        // console.log(this.tabOffsetTop);
      },
      /////////// 以下是网络请求相关方法 //////////
      // 请求多个数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
// console.logres);
          this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      }
      
      // 请求商品数据
      , getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].page = page;
          this.goods[type].data.push(...res.data.list)
          
          // 因为图片是异步加载, 原图片位置有可能被撑高, 所要在加载完图片后, 刷新 scroll
          this.$refs.refScroll.scroll.refresh()
          
// console.log'加载 goods 数据.........');
// console.logres);
        })
      }
      
      ////////// 以下是事件监听相关方法 /////////
      , tabClick(index) {
        // this.getHomeGoods()
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = "new"
            break
          case 2:
            this.currentType = "sell"
            break
        }
        
        // 保持上下两个tabControl的index是一致的.
        this.$refs.refTabControlTop.activeIndex = index
        this.$refs.refTabControlFloat.activeIndex = index
      }
      , contentScroll(position) {
        // 该方法处理滚动事件
        // 1. 当向下滚动距离达到 -1000 以上时, 得到 true, 否则为 false (BACK_POSITION = 1000)
        this.isShowBackTop = position.y < -BACK_POSITION
      
        // 2. 计算, 是否固定. 用于实现 tabControl 的吸顶驻留功能
        this.isFixed = -position.y > this.tabOffsetTop - this.$refs.refHomeNav.$el.offsetHeight
      }
      , loadMore() {
// console.log"loadMore..............");
        this.getHomeGoods(this.currentType);
        this.$refs.refScroll.finishPullUp();      // 该方法 刷新 pullUpLoad状态, 允许下一次加载更多
        
      }
    }
    , computed: {
      showGoods() {
        return this.goods[this.currentType].data
      }
    }
  }
</script>
<style scoped>
  #home {
    padding-top: var(--height-top-bar);
    padding-bottom: var(--height-bottom-bar);
    height: 100vh;
    /*position: relative;*/
  }
  
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    height: var(--height-top-bar);
    left: 0;
    right: 0;
    top: 0;
    z-index: 11;
  }
  
  .tab-control { /*在 better-scroll 下是不起作用的*/
    position: sticky;
    top: 44px;
    background-color: #fff;
    z-index: 9;
  }
  
  .BScroll {
    /*vh是 视口高度*/
    height: calc(100vh - var(--height-bottom-bar) - var(--height-top-bar)); /*想让better-scroll启作用, 高度属性是必须的.*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    background-color: #aaaaaa;
    overflow: hidden;
  }
</style>
