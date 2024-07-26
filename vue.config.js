const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: config => {
    // 配置
    config.plugin('define').tap((definitions)=>{
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: true,
        // __VUE_PROD_DEVTOOLS__: true,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
      });
      return  definitions;
    });
    // 项目配置
    config.plugin('html').tap(args => {
      args[0].title = 'WebMIS 3.0'
      args[0].keywords = 'WebMIS'
      args[0].description = 'WebMIS'
      return args
    })
    // Less全局变量
    const oneOfsMap = config.module.rule('less').oneOfs.store
    oneOfsMap.forEach(item => {
      item.use('sass-resources-loader').loader('sass-resources-loader').options({
        resources: ['./src/assets/style/themes.less']
      }).end()
    })
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包体积配置
      config.performance = {
        "maxEntrypointSize": 10000000,
        "maxAssetSize": 30000000
      }
    }
  }
})
