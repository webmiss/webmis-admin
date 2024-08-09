import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Home', component: Home },
  {path: '/refresh', name: 'Refresh', component: ()=>import('../views/tools/Refresh.vue') },
  // 系统管理
  {path: '/SysMenus', name: 'SysMenus', component: ()=>import('../views/system/Menus.vue') },
  {path: '/SysUser', name: 'SysUser', component: ()=>import('../views/system/User.vue') },
]
/* 创建 */
export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
