// 该文件, 会被 vue-cli 与其系统配置文件进行合并

module.exports = {
  configureWebpack: {
    resolve: {
      // extensions: [".vue", ".json", ".js"]       // 其作用是省略引用的文件扩展名 不用配置了, 因为 vue-cli 已经有配置
      alias: {                                      // 定义别名
        "@": 'src'                                  // @ 指向 src 目录, 这个vue-cli 已经配置过了
        , "assets": '@/assets'
        , "common": '@/common'
        , "components": '@/components'
        , "network": '@/network'
        //, "router": '@/router'                    // router 不用引用别名, 因为它只在 main.js中引用, 且可 $router使用
        //, "store": '@/store'                      // store 也不用引用别名, 因为它也可通过 $store 引用
        , "views": '@/views'
      }
      
    }
  }
}