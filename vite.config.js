import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './src/utils/svgBuilder'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Mock
    viteMockServe({
      ignore: /^\_/, // 忽略以_开头的文件
      mockPath: 'mock', // mock 文件地址
      logger: true, // 控制台请求日志
      injectCode: `
        import { setupProdMockServer } from './mock/_createServer.js';
        setupProdMockServer();
      ` //  这样可以控制关闭 mock 的时候不让 mock 打包到最终代码内
    }),
    // 自动导入
    AutoImport({
      resolvers: [
        // Element-UI https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5
        ElementPlusResolver()
      ]
    }),
    // 自动注册
    Components({
      resolvers: [
        //  Element-UI
        ElementPlusResolver()
      ]
    }),
    // Svg
    svgBuilder('./src/icons/svg/')
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@util': path.resolve(__dirname, 'src/utils'),
      '@com': path.resolve(__dirname, 'src/components'),
      '@lay': path.resolve(__dirname, 'src/layout')
    },
    // 不推荐省略后缀 https://github.com/vitejs/vite/issues/178#issuecomment-630138450
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variable.scss";'
      }
    }
  }
})
