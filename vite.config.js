import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import viteCompression from 'vite-plugin-compression'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, VxeTableResolve } from 'vite-plugin-style-import'
import vueI18n from '@intlify/unplugin-vue-i18n/vite'
import { svgBuilder } from './src/utils/svgBuilder.js'

const pathResolve = dir => resolve(process.cwd(), '.', dir)

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const localEnabled = env.VITE_USE_MOCK || false
  const prodEnabled = env.VITE_USE_CHUNK_MOCK || false

  return defineConfig({
    server: {
      open: Boolean(env.VITE_OPEN),
      port: Number(env.VITE_PORT)
    },
    plugins: [
      vue(),
      // Mock
      viteMockServe({
        mockPath: './mock', // mock 文件地址
        logger: true, // 控制台请求日志
        watchFiles: true, // 监视文件更改
        supportTs: false, // 是否读取 ts 文件，开启后无法监听 js 文件
        localEnabled: command === 'serve', // 本地是否启用 ts 文件，设置为 false 将禁用 mock 功能
        prodEnabled: command !== 'serve' && prodEnabled, // 打包后是否启用 mock 功能
        injectCode: `
          import { setupProdMockServer } from '../mock/_createServer.js'
          setupProdMockServer()
        ` // 如果打包后开启 mock, injectCode 会将对应的文件注入生产环境中
      }),
      // 自动引入组件对应的 CSS 样式或者 SASS 文件
      ElementPlus({
        importStyle: 'SASS',
        useSource: true
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
      vueI18n({
        include: pathResolve('src/language/locales/**')
      }),
      // Svg
      svgBuilder('./src/icons/svg/'),
      // Vxe-Table
      createStyleImportPlugin({
        resolves: [
          VxeTableResolve()
        ]
      }),
      viteCompression({
        algorithm: 'gzip',
        filter: /\.(js|mjs|json|css|html)$/i
      })
    ],
    resolve: {
      alias: [
        { find: '@', replacement: pathResolve('src') },
        { find: '@v', replacement: pathResolve('src/views') },
        { find: '@util', replacement: pathResolve('src/utils') },
        { find: '@com', replacement: pathResolve('src/components') },
        { find: '@lay', replacement: pathResolve('src/layout') },
        { find: '@ld', replacement: pathResolve('src/layout/Default/index.vue') }
      ],
      // 不推荐省略后缀 https://github.com/vitejs/vite/issues/178#issuecomment-630138450
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 不推荐使用 import 引入，Sass 官方会在接下来几年逐步淘汰 import，详情：https://sass-lang.com/documentation/at-rules/import
          additionalData: '@use "@/styles/variable.scss" as *;'
        }
      }
    },
    build: {
      target: 'esnext'
    }
  })
}
