export default {
  path: '/table',
  redirect: '/table/default',
  component: () => import('@ld'),
  meta: {
    id: '498e8546-5234-442c-8952-c21ff0289616',
    title: '表格管理',
    icon: 'table',
    badge: 12,
    type: 0
  },
  children: [
    {
      path: 'default',
      name: 'TableDefault',
      meta: { id: 'd40ea974-a8a6-4e10-bd6e-1fe248dac951', title: '默认表格', type: 1 },
      component: () => import('@/views/table/default/index.vue')
    },
    {
      path: 'merge',
      name: 'TableMerge',
      meta: { id: '2c7f04ce-0f26-4ce0-bf79-1e4a01eafac7', title: '表格合并行/列', type: 1 },
      component: () => import('@/views/table/merge/index.vue')
    }
  ]
}
