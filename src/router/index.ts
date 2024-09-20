import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  {path: '/', name: 'Home', component: Home },
  {path: '/refresh', name: 'Refresh', component: ()=>import('../views/tools/Refresh.vue') },
  // 系统管理
  {path: '/SysFileManage', name: 'SysFileManage', component: ()=>import('../views/system/file/index.vue') },
  {path: '/SysMenus', name: 'SysMenus', component: ()=>import('../views/system/menus/index.vue') },
  {path: '/SysUser', name: 'SysUser', component: ()=>import('../views/system/user/index.vue') },
  {path: '/SysRole', name: 'SysRole', component: ()=>import('../views/system/role/index.vue') },
  // 基础数据
  {path: '/WebHtml', name: 'WebHtml', component: ()=>import('../views/base/html/index.vue') },
  // 网站
  {path: '/MBanner', name: 'MBanner', component: ()=>import('../views/web/MBanner.vue') },
  {path: '/MSuggest', name: 'MSuggest', component: ()=>import('../views/web/MSuggest.vue') },
]
/* 创建 */
export default createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
