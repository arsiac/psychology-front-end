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

/**
 * 保证数字为两位数
 *
 * @param value 数值
 * */
function formatDate (value) {
  return value > 9 ? value : `0${value}`
}

/**
 * 转换为日期字符串
 *
 * @param time 时间
 * @param isDateObject 是否是Date对象
 * */
export function toDateString (time, isDateObject = false) {
  let date = time
  if (!isDateObject) {
    date = new Date(time)
  }

  return `${date.getFullYear()}-${formatDate(date.getMonth() + 1)}-${formatDate(
    date.getDate())}`
}
