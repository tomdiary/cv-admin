import { defineConfig } from 'vite'
import { svgBuilder } from './src/utils/svgBuilder'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgBuilder('./src/icons/svg/')
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'view': path.resolve(__dirname, 'src/views'),
      'util': path.resolve(__dirname, 'src/utils'),
      'com': path.resolve(__dirname, 'src/components'),
      'lay': path.resolve(__dirname, 'src/layout'),
    },
    // 不推荐省略后缀 https://github.com/vitejs/vite/issues/178#issuecomment-630138450
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variable.scss";`
      }
    }
  }
})
