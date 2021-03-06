import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const SUBJECT_TYPE_URL = `${SERVER.BASE_DATA}/subject/type`

/**
 * 获取全部课题类型
 * */
function all () {
  return http.$get(`${SUBJECT_TYPE_URL}/all`)
}

/**
 * 模糊查询全部课题类型
 *
 * @param dto 课题类型信息
 * */
function fuzzy (dto) {
  return http.$get(SUBJECT_TYPE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 课题类型id
 * */
function queryById (id) {
  return http.$get(`${SUBJECT_TYPE_URL}/${id}`)
}

/**
 * 添加课题类型
 *
 * @param dto 课题类型信息
 * */
function add (dto) {
  return http.$post(SUBJECT_TYPE_URL, dto)
}

/**
 * 修改课题类型
 *
 * @param dto 课题类型信息
 * */
function modify (dto) {
  return http.$put(SUBJECT_TYPE_URL, dto)
}

/**
 * 删除课题类型
 *
 * @param dto 课题类型信息
 * */
function remove (dto) {
  return http.$delete(SUBJECT_TYPE_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
