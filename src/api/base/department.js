import http                    from '@/utils/http'
import { SERVER } from '@/utils/constant'

const DEPARTMENT_URL = `${SERVER.BASE_DATA}/department`

/**
 * 获取全部系别
 * */
function all () {
  return http.$get(`${DEPARTMENT_URL}/all`)
}

/**
 * 模糊查询全部系别
 *
 * @param dto 系别信息
 * */
function fuzzy (dto) {
  return http.$get(DEPARTMENT_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 系别id
 * */
function queryById (id) {
  return http.$get(`${DEPARTMENT_URL}/${id}`)
}

/**
 * 添加系别
 *
 * @param dto 系别信息
 * */
function add (dto) {
  return http.$post(DEPARTMENT_URL, dto)
}

/**
 * 修改系别
 *
 * @param dto 系别信息
 * */
function modify (dto) {
  return http.$put(DEPARTMENT_URL, dto)
}

/**
 * 删除系别
 *
 * @param dto 系别信息
 * */
function remove (dto) {
  return http.$delete(DEPARTMENT_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
