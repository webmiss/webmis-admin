import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // resolve: {  
  //   alias: {  
  //     '@': path.resolve(__dirname, 'src'),  
  //     'vuex': path.resolve(__dirname, 'node_modules/vuex/types')  
  //   }  
  // },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "./src/assets/style/themes.less";`,  // 注入全局变量
        javascriptEnabled: true
      }
    }
  }
})
