import http                    from '@/utils/http'
import { SERVER } from '@/utils/constant'

const USER_URL = `${SERVER.USER_CENTRE}/user`

/**
 * 获取全部用户
 * */
function all () {
  return http.$get(`${USER_URL}/all`)
}

/**
 * 模糊查询全部用户
 *
 * @param user 用户信息
 * */
function fuzzy (user) {
  return http.$get(USER_URL, user)
}

/**
 * 根据id查询
 *
 * @param id 用户id
 * */
function queryById (id) {
  return http.$get(`${USER_URL}/${id}`)
}

/**
 * 添加用户
 *
 * @param user 用户信息
 * */
function add (user) {
  return http.$post(USER_URL, user)
}

/**
 * 批量添加用户
 *
 * @param user 用户信息
 * */
function batchAdd (user) {
  return http.$post(`${USER_URL}/batch`, user)
}

/**
 * 修改用户
 *
 * @param user 用户信息
 * */
function modify (user) {
  return http.$put(USER_URL, user)
}

/**
 * 修改用户
 *
 * @param form 用户信息
 * */
function changePassword (form) {
  console.log('cp')
  return http.$put(`${USER_URL}/passwd`, form)
}

/**
 * 删除用户
 *
 * @param user 用户信息
 * */
function remove (user) {
  return http.$delete(USER_URL, user)
}

/**
 * 批量删除用户
 *
 * @param user 用户信息
 * */
function batchRemove (user) {
  return http.$delete(`${USER_URL}/batch`, user)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  batchAdd,
  modify,
  changePassword,
  remove,
  batchRemove
}
