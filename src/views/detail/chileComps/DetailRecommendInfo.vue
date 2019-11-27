<template>
  <div v-if="Object.keys(recommends).length > 0">
    <goods-list :goods="recommends"></goods-list>
  </div>
</template>
<script>
  import GoodsList from "@/components/content/goods/GoodsList.vue"
  
  export default {
    name: "DetailRecommendInfo"
    , data() {
      return {}
    }
    , props: {
      recommends: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {}
    , computed: {}
    , components: {
      GoodsList
    }
  }
</script>
<style scoped>
</style>
