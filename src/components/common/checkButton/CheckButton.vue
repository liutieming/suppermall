<template>
  <div class="check-button" :class="{check: checked}">
    <img src="@/assets/img/checkButton/check.png" alt="">
  </div>
</template>
<script>
  export default {
    name: "CheckButton"
    , components: {}
    , data() {
      return {}
    }
    , props: {
      checked: {
        type: Boolean
        , default() {
          return false;
        }
      }
    }
    , methods: {}
    , computed: {}
  }
</script>
<style scoped>
  .check-button img {
    max-width: 100%;
    max-height: 100%;
    background-color: #ddd;
    border-radius: 50%;
  }
  .check img {
    background-color: #f66;
    border-radius: 50%;
  }
</style>
