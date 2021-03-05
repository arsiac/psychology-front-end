import http                    from '@/utils/http'
import { SERVER } from '@/utils/constant'

const ROLE_RESOURCE_URL = `${SERVER.USER_CENTRE}/role/resource`

/**
 * 获取全部角色-资源
 * */
function all () {
  return http.$get(`${ROLE_RESOURCE_URL}/all`)
}

/**
 * 根据角色id查询
 *
 * @param id 角色-资源信息
 * */
function queryByRoleId (id) {
  return http.$get(`${ROLE_RESOURCE_URL}/role/${id}`)
}

/**
 * 根据资源id查询
 *
 * @param id 角色-资源id
 * */
function queryByResourceId (id) {
  return http.$get(`${ROLE_RESOURCE_URL}/resource/${id}`)
}

/**
 * 添加角色-资源
 *
 * @param dto 角色-资源信息
 * */
function add (dto) {
  return http.$post(ROLE_RESOURCE_URL, dto)
}

/**
 * 批量添加角色-资源
 *
 * @param dto 角色-资源信息
 * */
function batchAdd (dto) {
  return http.$post(`${ROLE_RESOURCE_URL}/batch`, dto)
}

/**
 * 修改角色-资源
 *
 * @param dto 角色-资源信息
 * */
function modify (dto) {
  return http.$put(ROLE_RESOURCE_URL, dto)
}

/**
 * 删除角色-资源
 *
 * @param dto 角色-资源信息
 * */
function remove (dto) {
  return http.$delete(ROLE_RESOURCE_URL, dto)
}

/**
 * 批量删除角色-资源
 *
 * @param dto 角色-资源信息
 * */
function batchRemove (dto) {
  return http.$delete(`${ROLE_RESOURCE_URL}/batch`, dto)
}

export default {
  all,
  queryByRoleId,
  queryByResourceId,
  add,
  batchAdd,
  modify,
  remove,
  batchRemove
}
