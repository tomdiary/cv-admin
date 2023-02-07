export default {
  path: '/com',
  redirect: '/com/list',
  component: () => import('@ld'),
  meta: { title: '组件库', icon: 'com' },
  children: [
    {
      path: 'list',
      name: 'ComList',
      meta: { title: '组件列表', layoutPadding: false },
      component: () => import('@/views/com/list/index.vue')
    },
    {
      path: 'table',
      name: 'ComTable',
      meta: { title: '表格' },
      component: () => import('@/views/com/table/index.vue')
    },
    {
      path: 'dialog',
      name: 'ComDialog',
      meta: { title: '对话框' },
      component: () => import('@/views/com/dialog/index.vue')
    },
    {
      path: 'icons',
      name: 'ComIcons',
      meta: { title: '图标' },
      component: () => import('@/views/com/icons/index.vue')
    }
  ]
}
