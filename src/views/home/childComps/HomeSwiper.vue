<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="图片走丢了">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"
  export default {
    name: "HomeSwiper"
    , data() {
      return {}
    }
    , props: {
      banners: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {}
    , computed: {}
    , components: {Swiper, SwiperItem}
  }
</script>
<style scoped>
</style>
