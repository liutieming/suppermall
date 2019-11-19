<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in pTopImages" :key="item">
      <img :src="item">
    </swiper-item>
  </swiper>

  <!--<swiper></swiper>-->
</template>
<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"
  
  export default {
    name: "DetailSwiper"
    , data() {
      return {}
    }
    , props: {
      pTopImages: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {}
    , computed: {}
    , components: {
      Swiper
      , SwiperItem
    }
  }
</script>
<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
