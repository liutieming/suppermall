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
    <back-top @click.native="backClick" ref="refBackTop" v-show="isShowBackTop"></back-top>
    
    <br><br>
    <ul>
      <li>例子1</li>
      <li>例子2</li>
      <li>例子3</li>
      <li>例子4</li>
      <li>例子5</li>
      <li>例子6</li>
      <li>例子7</li>
      <li>例子8</li>
      <li>例子9</li>
      <li>例子10</li>
      <li>例子11</li>
      <li>例子12</li>
      <li>例子13</li>
      <li>例子14</li>
      <li>例子15</li>
      <li>例子16</li>
      <li>例子17</li>
      <li>例子18</li>
      <li>例子19</li>
      <li>例子20</li>
    </ul>
  </div>
</template>
<script>
  import {debounce} from "@/common/utils.js";                           // 载入 防抖函数
  
  import NavBar from "@/components/common/navbar/NavBar"
  import TabControl from "@/components/content/tabControl/TabControl"
  import GoodsList from "@/components/content/goods/GoodsList"
  import BackTop from "@/components/common/backTop/BackTop.vue"
  
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
      }
    }
    , components: {
      NavBar
      , TabControl
      , GoodsList
      , BackTop
      
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
    , mounted() {
      ///////////////// 1. 完成加载事务处理 (解决 刷新 scroll 高度问题) /////////////////
      // 包装一层防抖功能, 以解决频繁执行 refresh() 函数,
      //   第一个参数 接收的是一个函数
      //   第二个参数 500 指延时500毫秒执行. 即在500毫秒内有多次执行仅执行最后一次函数
      // 函数)
      const refresh = debounce(this.$refs.refScroll.refresh, 500)
      // 在事件总线($bus)上, 注册事件($on)的方法, 实现图片完成加载事件的监听
      this.$bus.$on("itemImgLoaded", () => {
        // console.log("itemImgLoaded..........");
        // this.$refs.refScroll.refresh();
        refresh();
      })
      
      // ///////////////// 2. 获得tabControl的offsetTop (实现吸顶功能) /////////////////////
      // console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
      // setTimeout(() => {
      //   console.log(this.$refs.refTabControl.$el.offsetTop);
      // }, 500)
      
      
    }
    , activated() {
      // console.log('activated');
      this.$refs.refScroll.refresh();                     // 刷新一次 (重新计算 scroll 的高度)
      this.$refs.refScroll.scrollTo(0, this.leaveY, 0)    // 跳回到 scroll 离开时的y轴位置
      this.$refs.refScroll.refresh();                     // 刷新一次 (重新计算 scroll 的高度)
    }
    , deactivated() {
      // console.log('deactivated');
      this.leaveY = this.$refs.refScroll.getScrollY();    // 记录 scorll 的y轴位置
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
          console.log(res);
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
          
          console.log('加载 goods 数据.........');
          console.log(res);
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
      , backClick() {
        console.log("native's backClick()");
        this.$refs.refScroll.backTop();           // 调用 Scroll 组件内部封装好的 backTop 函数
      }
      , contentScroll(position) {
        // 该方法处理流动事件
        // 1. 当向下滚动距离达到 -1000 以上时, 得到 true, 否则为 false
        this.isShowBackTop = position.y < -1000
      
        // 2. 计算, 是否固定. 用于实现 tabControl 的吸顶驻留功能
        this.isFixed = -position.y > this.tabOffsetTop - this.$refs.refHomeNav.$el.offsetHeight
      }
      , loadMore() {
        console.log("loadMore..............");
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
