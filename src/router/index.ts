import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Homes.vue';

/* 路由 */
const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/refresh', name: 'Refresh', component: ()=>import('../views/tools/Refresh.vue') },
  // 系统管理
  { path: '/SysFileManage', name: 'SysFileManage', component: ()=>import('../views/system/file/index.vue') },
  { path: '/SysMenus', name: 'SysMenus', component: ()=>import('../views/system/menus/index.vue') },
  { path: '/SysUser', name: 'SysUser', component: ()=>import('../views/system/user/index.vue') },
  { path: '/SysRole', name: 'SysRole', component: ()=>import('../views/system/role/index.vue') },
  // 基础数据
  { path: '/WebHtml', name: 'WebHtml', component: ()=>import('../views/base/html/index.vue') },
  { path: '/BaseOrganization', name: 'BaseOrganization', component: () => import('../views/base/organization/index.vue') },
  { path: '/BaseShop', name: 'BaseShop', meta: { keepAlive: true }, component: () => import('../views/base/shop/index.vue') },
  { path: '/BasePartner', name: 'BasePartner', component: () => import('../views/base/partner/index.vue') },
  { path: '/BaseBrand', name: 'BaseBrand', component: () => import('../views/base/brand/index.vue') },
  { path: '/BaseCategory', name: 'BaseCategory', component: () => import('../views/base/category/index.vue') },
  { path: '/BaseSupplier', name: 'BaseSupplier', component: () => import('../views/base/supplier/index.vue') },
  // 商品管理
  { path: '/GoodsInfo', name: 'GoodsInfo', component: () => import('../views/goods/info/index.vue') },
  { path: '/GoodsLog', name: 'GoodsLog', component: () => import('../views/goods/log/index.vue') },
  { path: '/GoodsStock', name: 'GoodsStock', component: () => import('../views/goods/stock/index.vue') },
]
/* 创建 */
export default createRouter({
  history: createWebHistory(),
  routes
})
