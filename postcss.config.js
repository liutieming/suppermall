module.exports = {
  plugins: {
    autoprefixer: {}
    // postcss-px-to-viewport 是网页页面适配移动端(手机)的解决方案. 转化为 viewport 视口单位
    , "postcss-px-to-viewport": {
      viewportWidth: 375        // 视窗的宽度, 对应的是我们设计稿的宽度
      , viewportHeight: 667     // 视窗的高度, 对应的是我们设计向的高度(也可以不设置)
      , unitPrecision: 5        // 指定 px 转换为视窗单位值的小数位数 (很多时候无法整除)
      , viewportUnit: 'vw'      // 指定需要转换成的视窗单位, 建议使用 vw
      , selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item', 'tab-control']  // 指定不需要转换数组中类名开关的Css类
      , minPixelValue: 1        // 小于或等于 1px 不转换为视窗单位
      , mediaQuery: false       // 媒体查询里的单位是否需要转换单位
      , exclude: [/MainBar/, /TabControl/, /variableLib\.css/]    // 排除转化 文件名中有(必须是正则的) MainBar... 的文件.
    }
  }
}


/*
//以下是 postcss-px-to-viewport 配置项说明
// 需要转换的单位，默认为"px"
unitToConvert: 'px',

// 设计稿的视口宽度, 将根据视口做比例换算
viewportWidth: 750,

// 转化精度，转换后保留位数
unitPrecision: 2,

// 能转化为vw的属性列表
propList: [],

// 希望使用的视口单位
viewportUnit: 'vw',

// 字体使用的视口单位
fontViewportUnit: 'vw',

// 需要忽略的CSS选择器
selectorBlackList: [],

// 最小的转换数值
minPixelValue: 1,

// 媒体查询里的单位是否需要转换单位
mediaQuery: true,

// 转换后是否添加备用单位
replace: true,

// 忽略文件目录
exclude: ['node_modules'],

// 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
landscape: false,

// 横屏时使用的单位
landscapeUnit: 'vh',

// 横屏时使用的视口宽度
landscapeWidth: 1334
*/
