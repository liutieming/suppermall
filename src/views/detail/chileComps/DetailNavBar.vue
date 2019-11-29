<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="goBack">&lt</div>
      <div slot="center" class="title">
          <div @click="barItemClick(index)"
               v-for="(item, index) in dTitle"
               class="title-item"
               :class="{active: index === dCurrentIndex}"
          >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from "@/components/common/navbar/NavBar.vue"
  
  export default {
    name: "DetailNavBar"
    , data() {
      return {
        dTitle: ['商品', '参数', '评论', '推荐']
        , dCurrentIndex: 0
      }
    }
    , props: {
      pCurrentIndex: {
        type: Number
        , default() {
          return 0;
        }
      }
    }
    , watch: {
      // pCurrentIndex(val) {
      //   console.log("watch pCurrentIndex------->" + val);
      // }
    }
    , methods: {
      barItemClick(index) {
// console.logindex);
        this.dCurrentIndex = index
        this.$emit("titleClick", index);
      }
      , goBack() {
        this.$router.go(-1)     // this.$router.back() 效果一样
      }
      , setCurrentIndex(index) {
        this.dCurrentIndex = index
      }
    }
    , computed: {}
    , components: {
      NavBar
    }
  }
</script>
<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
    border-bottom: 1px solid var(--color-high-text);
  }
</style>
