<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles">
      <a @click="aClick(index)" :class="{active: index === activeIndex}">
        {{item}}
      </a>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabControl"
    , data() {
      return {
        activeIndex: 0
      }
    }
    , props: {
      titles: {
        type: Array
        , default() {
          return []
        }
      }
    }
    , methods: {
      aClick(index) {
        this.activeIndex = index;
        this.$emit("tabClick", index);
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    padding: 10px;
  }
  
  .tab-control div {
    flex: 1;
  }
  
  .active {
    padding: 3px;
    border-bottom: var(--color-high-text) 3px solid;
    color: var(--color-high-text);
  }
</style>
