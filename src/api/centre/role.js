import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const ROLE_URL = `${SERVER.USER_CENTRE}/role`

/**
 * 获取全部角色
 * */
function all () {
  return http.$get(`${ROLE_URL}/all`)
}

/**
 * 模糊查询全部角色
 *
 * @param dto 角色信息
 * */
function fuzzy (dto) {
  return http.$get(ROLE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 角色id
 * */
function queryById (id) {
  return http.$get(`${ROLE_URL}/${id}`)
}

/**
 * 添加角色
 *
 * @param dto 角色信息
 * */
function add (dto) {
  return http.$post(ROLE_URL, dto)
}

/**
 * 批量添加角色
 *
 * @param dto 角色信息
 * */
function batchAdd (dto) {
  return http.$post(`${ROLE_URL}/batch`, dto)
}

/**
 * 修改角色
 *
 * @param dto 角色信息
 * */
function modify (dto) {
  return http.$put(ROLE_URL, dto)
}

/**
 * 删除角色
 *
 * @param dto 角色信息
 * */
function remove (dto) {
  return http.$delete(ROLE_URL, dto)
}

/**
 * 批量删除角色
 *
 * @param dto 角色信息
 * */
function batchRemove (dto) {
  return http.$delete(`${ROLE_URL}/batch`, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  batchAdd,
  modify,
  remove,
  batchRemove
}
