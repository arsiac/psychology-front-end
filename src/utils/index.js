/**
 * 是否有权限
 * @param url 目标链接
 * @param option 操作
 *
 * @return boolean
 */
export function isAuth (url, option) {
  const auth = JSON.parse(sessionStorage.getItem('auth'))

  if (auth[url]) {
    return auth[url][option] || false
  }

  return false
}

export function toDateString (time, isDateObject = false) {
  let date = time
  if (!isDateObject) {
    date = new Date(time)
  }

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}
