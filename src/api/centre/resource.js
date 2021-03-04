import http                    from '@/utils/http'
import { SERVER } from '@/utils/constant'

const RESOURCE_URL = `${SERVER.USER_CENTRE}/resource`

/**
 * 获取全部资源
 * */
function all () {
  return http.$get(`${RESOURCE_URL}/all`)
}

/**
 * 模糊查询全部资源
 *
 * @param dto 资源信息
 * */
function fuzzy (dto) {
  return http.$get(RESOURCE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 资源id
 * */
function queryById (id) {
  return http.$get(`${RESOURCE_URL}/${id}`)
}

/**
 * 添加资源
 *
 * @param dto 资源信息
 * */
function add (dto) {
  return http.$post(RESOURCE_URL, dto)
}

/**
 * 批量添加资源
 *
 * @param dto 资源信息
 * */
function batchAdd (dto) {
  return http.$post(`${RESOURCE_URL}/batch`, dto)
}

/**
 * 修改资源
 *
 * @param dto 资源信息
 * */
function modify (dto) {
  return http.$put(RESOURCE_URL, dto)
}

/**
 * 删除资源
 *
 * @param dto 资源信息
 * */
function remove (dto) {
  return http.$delete(RESOURCE_URL, dto)
}

/**
 * 批量删除资源
 *
 * @param dto 资源信息
 * */
function batchRemove (dto) {
  return http.$delete(`${RESOURCE_URL}/batch`, dto)
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
