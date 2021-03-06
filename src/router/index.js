/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue       from 'vue'
import Router    from 'vue-router'
import store     from '@/store'
import systemApi from '@/api/centre/system'

Vue.use(Router)

// 懒加载
const _import = page => () => import(`@/views/${page}/index.vue`)

// 鉴权
function authentication () {
  const token       = store.getters.accessToken
  const expire      = store.getters.expireTime
  const currentDate = new Date()

  console.log(
    `************************************************************
* ==> token(check)
* ==> token: ${token}
* ==> current: ${currentDate.toLocaleString()}
* ==> expire:  ${new Date(expire).toLocaleString()}
************************************************************`
  )

  // token为空/token过期 跳转到登录
  if (!token || token === '' || !expire || expire < currentDate.getTime()) {
    console.log('==> token验证失败 (token为空/token过期)')
    return false
  }
  return true
}

/**
 * 检查目标是否存在，不存在则新建再添加子属性
 *
 * @param obj 目标对象
 * @param key 对象的属性
 * @param valueKey 子对象的属性
 * @param value 子对象属性的值
 * */
function checkAndSet (obj, key, valueKey, value) {
  if (!obj || !key || !valueKey) {
    console.warn(
      `[warn] checkAndSet: obj: ${obj}, key: ${key}, valueKey: ${valueKey}`)
    return
  }

  if (!obj[key]) {
    obj[key] = {}
  }

  obj[key][valueKey] = value
}

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  {
    path: '/404',
    component: _import('error/404'),
    name: '404',
    meta: { title: '404未找到' }
  },
  {
    path: '/login',
    component: _import('common/login'),
    name: 'login',
    meta: { title: '登录' }
  }
]

function isGlobal (name) {
  // eslint-disable-next-line no-unused-vars
  for (const route of globalRoutes) {
    if (route.name === name) {
      return true
    }
  }
  return false
}

const mainRoute = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主路由' },
  children: [
    {
      path: '/home',
      component: _import('common/home'),
      name: 'home',
      meta: { title: '首页' }
    }
  ],

  // 进入路由前检查权限
  beforeEnter (to, from, next) {
    // 鉴权成功，加载用户资源
    if (authentication()) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
}

const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  // 是否已经添加动态(菜单)路由
  isAddDynamicMenuRoutes: false,
  routes: globalRoutes.concat(mainRoute)
})

router.beforeEach((to, from, next) => {
  // 返回登陆后清空权限和目录
  if (to.name ===  'login') {
    sessionStorage.setItem('menu', '[]')
    sessionStorage.setItem('auth', '{}')
    router.options.isAddDynamicMenuRoutes = false
  }
  if (router.options.isAddDynamicMenuRoutes || isGlobal(to.name)) {
    next()
  } else {
    const userId = store.getters.id
    systemApi.getResourceByUserId(userId).then(response => {
      const data = response.data.data
      if (data && Array.isArray(data)) {
        // 菜单树
        const menuRoot  = {}
        // 权限树
        const powerRoot = {}

        data.forEach(value => {
          // 没有父节点，为菜单分组
          if (!value.parent) {
            checkAndSet(menuRoot, value.id, 'name', value.name)
          }

          if (value.uri && value.uri.match(/^url:/)) {
            const url = value.uri.replace('url:', '')
            // 添加路由
            router.addRoute('main', {
              path: `/${url}`,
              component: _import(url),
              name: value.name,
              meta: { title: value.name }
            })

            // 添加菜单
            if (value.parent) {
              if (!menuRoot[value.parent]) {
                menuRoot[value.parent] = {}
              }
              if (!menuRoot[value.parent].children) {
                menuRoot[value.parent].children = []
              }
              menuRoot[value.parent].children.push({
                url: value.uri.replace('url:', ''),
                name: value.name,
                icon: value.icon
              })
            } else {
              console.warn(
                `[warn] menu item does not have parent node. -> name: ${value.name}, uri: ${value.uri}`)
            }

            // 添加权限对应url
            checkAndSet(powerRoot, value.id, 'url', url)

            // 添加权限
          } else if (value.uri.match(/^op:/)) {
            if (value.parent) {
              checkAndSet(powerRoot, value.parent, value.uri.replace('op:', ''),
                true)
            } else {
              console.warn(
                `[warn] menu item does not have parent node. -> name: ${value.name}, uri: ${value.uri}`)
            }
          }
        })

        // 将菜单转为数组
        const menuArray = []
        // eslint-disable-next-line no-unused-vars
        for (const item in menuRoot) {
          menuArray.push(menuRoot[item])
        }

        // 将权限树属性名转为url
        const powerTree = {}
        // eslint-disable-next-line no-unused-vars
        for (const property in powerRoot) {
          const url = powerRoot[property].url
          delete powerRoot[property].url
          powerTree[url] = powerRoot[property]
        }

        // 最后添加404, 防止一开始就404
        router.addRoute({ path: '*', redirect: '/404', hidden: true })
        router.options.isAddDynamicMenuRoutes = true
        sessionStorage.setItem('menu', JSON.stringify(menuArray))
        sessionStorage.setItem('auth', JSON.stringify(powerTree))
        next({ ...to, replace: true })
      }
    })
  }
})

export default router
