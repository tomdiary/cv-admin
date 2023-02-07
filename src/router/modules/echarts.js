export default {
  path: '/echarts',
  redirect: '/echarts/default',
  component: () => import('@ld'),
  meta: { title: 'ECharts', icon: 'echarts' },
  children: [
    {
      path: 'default',
      name: 'EChartsDefault',
      meta: { title: '默认ECharts' },
      component: () => import('@/views/echarts/default/index.vue')
    }
  ]
}
