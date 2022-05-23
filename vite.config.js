import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { svgBuilder } from './src/utils/svgBuilder'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const localEnabled = env.VITE_USE_MOCK || false
  const prodEnabled = env.VITE_USE_CHUNK_MOCK || false

  return defineConfig({
    plugins: [
      vue(),
      // Mock
      viteMockServe({
        ignore: /^\_/, // 忽略以_开头的文件
        mockPath: 'mock', // mock 文件地址
        logger: true, // 控制台请求日志
        watchFiles: true, // 监视文件更改
        injectCode: `
          import { setupProdMockServer } from '../mock/_createServer.js'
          setupProdMockServer()
        `,
        localEnabled,
        prodEnabled
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
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        { find: '@views', replacement: path.resolve(__dirname, './src/views') },
        { find: '@util', replacement: path.resolve(__dirname, './src/utils') },
        { find: '@com', replacement: path.resolve(__dirname, './src/components') },
        { find: '@lay', replacement: path.resolve(__dirname, './src/layout') }
      ],
      // 不推荐省略后缀 https://github.com/vitejs/vite/issues/178#issuecomment-630138450
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 不推荐使用 import 引入，Sass 官方会在接下来几年逐步淘汰 import，详情：https://sass-lang.com/documentation/at-rules/import
          additionalData: `@use "@/styles/variable.scss" as *;`
        }
      }
    }
  })
}
