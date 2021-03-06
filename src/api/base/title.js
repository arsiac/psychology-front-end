import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const TITLE_URL = `${SERVER.BASE_DATA}/title`

/**
 * 获取全部职称
 * */
function all () {
  return http.$get(`${TITLE_URL}/all`)
}

/**
 * 模糊查询全部职称
 *
 * @param dto 职称信息
 * */
function fuzzy (dto) {
  return http.$get(TITLE_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 职称id
 * */
function queryById (id) {
  return http.$get(`${TITLE_URL}/${id}`)
}

/**
 * 添加职称
 *
 * @param dto 职称信息
 * */
function add (dto) {
  return http.$post(TITLE_URL, dto)
}

/**
 * 修改职称
 *
 * @param dto 职称信息
 * */
function modify (dto) {
  return http.$put(TITLE_URL, dto)
}

/**
 * 删除职称
 *
 * @param dto 职称信息
 * */
function remove (dto) {
  return http.$delete(TITLE_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
