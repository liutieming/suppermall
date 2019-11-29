<template>
  <div class="wrapper" ref="wrapper">   <!--wrapper 与 content 必须挨着 不然 滚动失效-->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  // 对 better-scroll 的封装
  import BScroll from "better-scroll"
  
  export default {
    name: "scroll"
    , data() {
      return {
        scroll: null
      }
    }
    , props: {            // 接收父控件传入的参数
      probeType: {        // 设置滚动监听类型
        type: Number
        , default() {
          return 0        // 监听类型的值: 0, 1: 不监听, 2: 只监听一下, 3: 实时监听
        }
      }
      , pullUpLoad: {     // 设置加载更多
        type: Boolean
        , default: false  // 值: ture 加载更多事件生效, false 加载更多事件失效
      }
    }
    , mounted() {
      // console.log('xxxxxxxxxxxxxxxxxxxxx  ' + this.$refs.wrapper);
      this.scroll = new BScroll(this.$refs.wrapper, {
        // probeType 数值型 监听类型: 0, 1: 不监听, 2: 只监听一次, 3: 一直监听
        probeType: this.probeType
        
        // click 布尔型 点击类型: true: 接受点击, false: 不接受点击事件. 其中 button 不受其影响
        , click: true
        
        // pullUpLoad 布尔型 打开/关闭上拉 加载更多事件: 手势为向上拖动到底部
        , pullUpLoad: this.pullUpLoad
      })
      , this.scroll.on("scroll", (position) => {    // 滚动监听程序
        // console.log('this.$emit("scroll", position)........... 应由父组件给出具体处理逻辑');
        this.$emit("scroll", position)              // 发射事件 第一个参数是事件名称, 第二个参数是 事件参数
      })
      , this.scroll.on("pullingUp", () => {         // 加载更多监听程序
        // console.log("pullingUp.............. 应由父组件给出具体处理逻辑");
        this.$emit("pullingUp")
      })
    }
    , methods: {
      backTop(x = 0, y = 0, time = 333) {
// console.log"backTop().....");
        
        // 下面代码解析 && 逻辑与操作符的作用, && 左边表达式有值, 执行其右边的表达式.
        //   也就是确保 scroll; scroll.scrollTo 函数都不是 null, 才执行 scroll.scrollTo(...) 函数
        //   因为图片加载很快, 下面的代码可以避免触发空对象引用执行.
        this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
      }
      
      , scrollTo(x = 0, y = 0, time = 333) {
// console.log"scrollTo().....");
        this.scroll && this.scroll.scrollTo(x, y, time);
      }
      , getScrollY() {
        return this.scroll ? this.scroll.y : 0        // 得到 Scroll 的 y 轴值
      }
      
      , finishPullUp () {           // 这里对 finsihPullUp() 进行一次包装, 对 better-scroll 组件解耦
        this.scroll && this.scroll.finishPullUp()  // 该方法 刷新 pullUpLoad状态, 允许下一次加载更多
      }
      , refresh () {                // 这里对 refresh() 进行一层包装, 对 better-scroll 组件解耦
// console.log"refresh()....................");
        this.scroll && this.scroll.refresh()       // 调用原生scroll方法,重新计算 scroll管理的高度
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
</style>
