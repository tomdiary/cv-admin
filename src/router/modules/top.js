export default {
  path: '/',
  redirect: 'dashboard',
  component: () => import('@ld'),
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      meta: { id: '87dd1426-c627-4364-989c-eb3163616612', title: '首页', icon: 'dashboard', type: 0, affix: true },
      component: () => import('@/views/dashboard/index.vue')
    },
    {
      path: 'https://github.com/',
      name: 'Github',
      meta: { id: 'f910ac89-a182-4446-8c22-2a0a318105d4', title: 'Github', icon: 'github', link: 1 },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}
