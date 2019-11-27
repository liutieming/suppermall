<template>
  <div v-if="Object.keys(detailInfo).length > 0" class="goods-info">
    <!--<h1>DetailGoodsInfo.vue</h1>-->
    <!--{{Object.keys(detailInfo).length}}-->
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img v-for="(item, index) in detailInfo.detailImage[0].list"
           :key="index" :src="item" alt=""
           @load="imgLoad"
      >
    </div>
    <br><br><br>
  </div>
</template>
<script>
  export default {
    name: "DetailGoodsInfo"
    , data() {
      return {
        counter: 0
        , imageLength: 0
      }
    }
    , props: {
      detailInfo: {
        type: Object
        , default() {
          return {}
        }
      }
    }
    , methods: {
      imgLoad() {
        ++this.counter;
        // console.log('imgLoad: ' + this.counter);
        if (this.counter === this.imageLength) {
          // console.log("imgLoaded.......");
          this.$emit("imgLoaded"); // 所有图片加载完后向父组件发射"图片载完"事件, 父组件refresh scroll 得到最新的高度值
        }
      }
    }
    , watch: {
      // watch 实现对 data 数据库化的监视. 函数名必须是要监视的数据名.
      detailInfo(val) {   // val 新数据      如果给两个参数, 则第一个参数是 新值, 第二个参数是 旧值
        this.imageLength = val.detailImage[0].list.length;
        // 下面的代码 与上面的代码效果一样. val == this.detailInfo
        // this.imageLength = this.detailInfo.detailImage[0].list.length
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .info-list img{
    width: 100vw;
  }
</style>
