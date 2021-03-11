import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const ACHIEVEMENT_TYPE_URL = `${SERVER.BASE_DATA}/achievement/type`

/**
 * 获取全部成果类型
 * */
function all () {
  return http.$get(`${ACHIEVEMENT_TYPE_URL}/all`)
}

/**
 * 模糊查询全部成果类型
 *
 * @param dto 成果类型信息
 * */
function fuzzy (dto) {
  return http.$get(ACHIEVEMENT_TYPE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 成果类型id
 * */
function queryById (id) {
  return http.$get(`${ACHIEVEMENT_TYPE_URL}/${id}`)
}

/**
 * 添加成果类型
 *
 * @param dto 成果类型信息
 * */
function add (dto) {
  return http.$post(ACHIEVEMENT_TYPE_URL, dto)
}

/**
 * 修改成果类型
 *
 * @param dto 成果类型信息
 * */
function modify (dto) {
  return http.$put(ACHIEVEMENT_TYPE_URL, dto)
}

/**
 * 删除成果类型
 *
 * @param dto 成果类型信息
 * */
function remove (dto) {
  return http.$delete(ACHIEVEMENT_TYPE_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
