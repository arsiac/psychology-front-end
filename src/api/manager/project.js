import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const PROJECT_URL = `${SERVER.MANAGER}/project`

/**
 * 获取全部项目
 * */
function all () {
  return http.$get(`${PROJECT_URL}/all`)
}

/**
 * 模糊查询全部项目
 *
 * @param dto 项目信息
 * */
function fuzzy (dto) {
  return http.$get(PROJECT_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 项目id
 * */
function queryById (id) {
  return http.$get(`${PROJECT_URL}/${id}`)
}

/**
 * 添加项目
 *
 * @param dto 项目信息
 * */
function add (dto) {
  return http.$post(PROJECT_URL, dto)
}

/**
 * 批量添加项目
 *
 * @param dto 项目信息
 * */
function batchAdd (dto) {
  return http.$post(`${PROJECT_URL}/batch`, dto)
}

/**
 * 修改项目
 *
 * @param dto 项目信息
 * */
function modify (dto) {
  return http.$put(PROJECT_URL, dto)
}

/**
 * 删除项目
 *
 * @param dto 项目信息
 * */
function remove (dto) {
  return http.$delete(PROJECT_URL, dto)
}

/**
 * 批量删除项目
 *
 * @param dto 项目信息
 * */
function batchRemove (dto) {
  return http.$delete(`${PROJECT_URL}/batch`, dto)
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
