<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :key="item.iid" :goodsItem="item"></goods-list-item>
  </div>
</template>
<script>
  import GoodsListItem from "./GoodsListItem";
  
  export default {
    name: "GoodsList"
    , data() {
      return {}
    }
    , props: {
      goods: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {}
    , computed: {}
    , components: {
      GoodsListItem
    }
  }
</script>
<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
  }
</style>
