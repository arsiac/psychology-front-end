/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

const _import = page => () => import(`@/views/${page}/index.vue`)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('error/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } }
]

const mainRoute = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主路由' },
  children: [
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } }
  ],

  // 进入路由前检查权限
  beforeEnter (to, from, next) {
    const token = store.getters.token
    const expire = store.getters.expireTime
    const currentDate = new Date()

    console.log(
      `==> token(check)
      ==> token: ${token}
      ==> expire: ${expire}
      ==> current: ${currentDate}\n`)

    // token 为空, token 过期跳转到登录
    if (!token || token === '' || expire || expire < currentDate) {
      next({ name: 'login' })
    }
    next()
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  // 是否已经添加动态(菜单)路由
  isAddDynamicMenuRoutes: false,
  routes: globalRoutes.concat(mainRoute)
})

export default router
