import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import { svgBuilder } from './src/utils/svgBuilder'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock'
    }),
    // Element-UI 自动导入
    Components({
      resolvers: [ElementPlusResolver()],
    }),
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
