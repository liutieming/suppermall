<template>
  <div class="recommend">
    <div v-for="item in recommends">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: "RecommendView"
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
    , components: {}
  }
</script>
<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    border-top: transparent 100px solid;
    border-bottom: transparent 100px solid;
  }
  .recommend img {
    width: 90%;
    background-color: #00f;
  }
</style>
