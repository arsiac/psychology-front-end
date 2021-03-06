import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const PROJECT_SOURCE_URL = `${SERVER.BASE_DATA}/project/source`

/**
 * 获取全部项目来源
 * */
function all () {
  return http.$get(`${PROJECT_SOURCE_URL}/all`)
}

/**
 * 模糊查询全部项目来源
 *
 * @param dto 项目来源信息
 * */
function fuzzy (dto) {
  return http.$get(PROJECT_SOURCE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 项目来源id
 * */
function queryById (id) {
  return http.$get(`${PROJECT_SOURCE_URL}/${id}`)
}

/**
 * 添加项目来源
 *
 * @param dto 项目来源信息
 * */
function add (dto) {
  return http.$post(PROJECT_SOURCE_URL, dto)
}

/**
 * 修改项目来源
 *
 * @param dto 项目来源信息
 * */
function modify (dto) {
  return http.$put(PROJECT_SOURCE_URL, dto)
}

/**
 * 删除项目来源
 *
 * @param dto 项目来源信息
 * */
function remove (dto) {
  return http.$delete(PROJECT_SOURCE_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
