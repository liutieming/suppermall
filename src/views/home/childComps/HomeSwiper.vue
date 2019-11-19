<template>
  <swiper>
    <swiper-item v-for="item  in banners" :key="item.link">
      <a :href="item.link">
        <img :src="item.image" alt="图片走丢了"  @load="imageLoaded">
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
  import {Swiper, SwiperItem} from "@/components/common/swiper"
  
  export default {
    name: "HomeSwiper"
    , data() {
      return {
        imgLoaded: false
      }
    }
    , props: {
      banners: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {
      imageLoaded() {
        if (!this.imgLoaded) {
          this.imgLoaded = true;
          this.$emit("swiperImageLoaded")
        }
      }
    }
    , computed: {}
    , components: {Swiper, SwiperItem}
  }
</script>
<style scoped>
</style>
