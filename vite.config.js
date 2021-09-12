import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'view': path.resolve(__dirname, 'src/views'),
      'util': path.resolve(__dirname, 'src/utils'),
      'com': path.resolve(__dirname, 'src/components'),
      'lay': path.resolve(__dirname, 'src/layout'),
    }
  },
  plugins: [vue()]
})
