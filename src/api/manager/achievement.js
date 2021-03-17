import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const ACHIEVEMENT_URL = `${SERVER.MANAGER}/achievement`

/**
 * 获取全部成果
 * */
function all () {
  return http.$get(`${ACHIEVEMENT_URL}/all`)
}

/**
 * 模糊查询全部成果
 *
 * @param dto 成果信息
 * */
function fuzzy (dto) {
  return http.$get(ACHIEVEMENT_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 成果id
 * */
function queryById (id) {
  return http.$get(`${ACHIEVEMENT_URL}/${id}`)
}

/**
 * 添加成果
 *
 * @param dto 成果信息
 * */
function add (dto) {
  return http.$post(ACHIEVEMENT_URL, dto)
}

/**
 * 批量添加成果
 *
 * @param dto 成果信息
 * */
function batchAdd (dto) {
  return http.$post(`${ACHIEVEMENT_URL}/batch`, dto)
}

/**
 * 修改成果
 *
 * @param dto 成果信息
 * */
function modify (dto) {
  return http.$put(ACHIEVEMENT_URL, dto)
}

/**
 * 删除成果
 *
 * @param dto 成果信息
 * */
function remove (dto) {
  return http.$delete(ACHIEVEMENT_URL, dto)
}

/**
 * 批量删除成果
 *
 * @param dto 成果信息
 * */
function batchRemove (dto) {
  return http.$delete(`${ACHIEVEMENT_URL}/batch`, dto)
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
