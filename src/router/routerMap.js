import Layout from '@/layout'

export const routerMap = {
  LAYOUT: Layout,
  user: () => import('@/views/admin/userProfile/index'),
  path: () => import('@/views/admin/path/index'),
  role: () => import('@/views/admin/role/index'),
  permission: () => import('@/views/admin/permission/index')
}
