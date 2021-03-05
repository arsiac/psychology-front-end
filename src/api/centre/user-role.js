import http                    from '@/utils/http'
import { SERVER } from '@/utils/constant'

const USER_ROLE_URL = `${SERVER.USER_CENTRE}/user/role`

/**
 * 获取全部用户-角色
 * */
function all () {
  return http.$get(`${USER_ROLE_URL}/all`)
}

/**
 * 根据用户id查询
 *
 * @param id 用户id
 * */
function queryByUserId (id) {
  return http.$get(`${USER_ROLE_URL}/user/${id}`)
}

/**
 * 根据角色id查询
 *
 * @param id 角色id
 * */
function queryByRoleId (id) {
  return http.$get(`${USER_ROLE_URL}/role/${id}`)
}

/**
 * 添加用户-角色
 *
 * @param dto 用户-角色信息
 * */
function add (dto) {
  return http.$post(USER_ROLE_URL, dto)
}

/**
 * 批量添加用户-角色
 *
 * @param dto 用户-角色信息
 * */
function batchAdd (dto) {
  return http.$post(`${USER_ROLE_URL}/batch`, dto)
}

/**
 * 修改用户-角色
 *
 * @param dto 用户-角色信息
 * */
function modify (dto) {
  return http.$put(USER_ROLE_URL, dto)
}

/**
 * 删除用户-角色
 *
 * @param dto 用户-角色信息
 * */
function remove (dto) {
  return http.$delete(USER_ROLE_URL, dto)
}

/**
 * 批量删除用户-角色
 *
 * @param dto 用户-角色信息
 * */
function batchRemove (dto) {
  return http.$delete(`${USER_ROLE_URL}/batch`, dto)
}

export default {
  all,
  queryByRoleId,
  queryByUserId,
  add,
  batchAdd,
  modify,
  remove,
  batchRemove
}
