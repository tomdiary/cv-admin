export default {
  path: '/map',
  redirect: '/map/default',
  component: () => import('@ld'),
  meta: { title: '高德地图', icon: 'map' },
  children: [
    {
      path: 'default',
      name: 'MapDefault',
      meta: { title: '默认地图', layoutPadding: false },
      component: () => import('@/views/map/default/index.vue')
    },
    {
      path: 'electric-fence',
      name: 'MapElectricFence',
      meta: { title: '电子围栏' },
      component: () => import('@/views/map/electricFence/index.vue')
    },
    {
      path: 'area-preview',
      name: 'MapAreaPreview',
      meta: { title: '行政区域预览', layoutPadding: false },
      component: () => import('@/views/map/areaPreview/index.vue')
    }
  ]
}
