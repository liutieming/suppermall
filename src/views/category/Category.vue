<template>
  <div>
    <h3>分类</h3>
    <div class="wrapper" ref="aaa">       <!--wrapper 与 content 必须挨着-->
      <div class="content">
        <p><b>1. 无论是否设置 click: true, button 都可以点击</b></p>
        <!--<br>-->
        <!--<button @click="btnClick">点我</button>-->
        <!--<br><br>-->
        <!--<p><b>2. 其它标签要想可点击必须设置 click: true; 因为默认为false</b></p>-->
        <ul @click="ulClick">
          <li>例子1</li>
          <li>例子2</li>
          <li>例子3</li>
          <li>例子4</li>
          <li>例子5</li>
          <li>例子6</li>
          <li>例子7</li>
          <li>例子8</li>
          <li>例子9</li>
          <li>例子10</li>
          <li>例子11</li>
          <li>例子12</li>
          <li>例子13</li>
          <li>例子14</li>
          <li>例子15</li>
          <li>例子16</li>
          <li>例子17</li>
          <li>例子18</li>
          <li>例子19</li>
          <li>例子20</li>
          <li>例子21</li>
          <li>例子22</li>
          <li>例子23</li>
          <li>例子24</li>
          <li>例子25</li>
          <li>例子26</li>
          <li>例子27</li>
          <li>例子28</li>
          <li>例子29</li>
          <li>例子30</li>
          <li>例子31</li>
          <li>例子32</li>
          <li>例子33</li>
          <li>例子34</li>
          <li>例子35</li>
          <li>例子36</li>
          <li>例子37</li>
          <li>例子38</li>
          <li>例子39</li>
          <li>例子40</li>
          <li>例子41</li>
          <li>例子42</li>
          <li>例子43</li>
          <li>例子44</li>
          <li>例子45</li>
          <li>例子46</li>
          <li>例子47</li>
          <li>例子48</li>
          <li>例子49</li>
          <li>例子50</li>
          <li>例子51</li>
          <li>例子52</li>
          <li>例子53</li>
          <li>例子54</li>
          <li>例子55</li>
          <li>例子56</li>
          <li>例子57</li>
          <li>例子58</li>
          <li>例子59</li>
          <li>例子60</li>
          <li>例子61</li>
          <li>例子62</li>
          <li>例子63</li>
          <li>例子64</li>
          <li>例子65</li>
          <li>例子66</li>
          <li>例子67</li>
          <li>例子68</li>
          <li>例子69</li>
          <li>例子70</li>
          <li>例子71</li>
          <li>例子72</li>
          <li>例子73</li>
          <li>例子74</li>
          <li>例子75</li>
          <li>例子76</li>
          <li>例子77</li>
          <li>例子78</li>
          <li>例子79</li>
          <li>例子80</li>
          <li>例子81</li>
          <li>例子82</li>
          <li>例子83</li>
          <li>例子84</li>
          <li>例子85</li>
          <li>例子86</li>
          <li>例子87</li>
          <li>例子88</li>
          <li>例子89</li>
          <li>例子90</li>
          <li>例子91</li>
          <li>例子92</li>
          <li>例子93</li>
          <li>例子94</li>
          <li>例子95</li>
          <li>例子96</li>
          <li>例子97</li>
          <li>例子98</li>
          <li>例子99</li>
          <li>例子100</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from "better-scroll"
  
  export default {
    name: "Category"
    , data() {
      return {
        scroll: {}
      }
    }
    , mounted() {
      // console.log(document.querySelector(".wrapper"));
      // console.log(this.$refs.aaa);
      this.scroll = new BScroll(this.$refs.aaa, {
        // probeType 侦测类型
        //    0, 1: 都是不侦测实时的位置
        //    2: 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程不侦测
        //    3: 只要是流动就侦测
        probeType: 3
        
        // click 设置点击属性 这里 button 不受该属性的控制
        , click: true
        
        // pullUpLoad 滚动条的下拉加载属性
        , pullUpLoad: true
      })
        
      // 为流动条滚动添加侦听
      , this.scroll.on('scroll', (position) => {
// console.logposition);
      })
        
      // 为下拉加载事件添加侦听
      , this.scroll.on("pullingUp", () => {
// console.log"触发了[加载更多]事件..............doing");
      })
    }
    , methods: {
      btnClick() {
// console.log"btn 您点我了");
      }
      , ulClick() {
// console.log"ul 您点我了");
      }
    }
    , computed: {}
    , components: {}
  }
</script>
<style scoped>
  .wrapper {
    background-color: #32ca00;
    height: 333px;
    
    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
