import store from '@/store'

/**
 * 是否有权限
 * @param url 目标链接
 * @param option 操作
 *
 * @return boolean
 */
export function isAuth (url, option) {
  const auth = store.getters.auth

  if (auth[url]) {
    return auth[url][option] || false
  }

  return false
}
