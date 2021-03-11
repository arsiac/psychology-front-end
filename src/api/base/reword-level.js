import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const REWORD_LEVEL_URL = `${SERVER.BASE_DATA}/reword/level`

/**
 * 获取全部获奖等级
 * */
function all () {
  return http.$get(`${REWORD_LEVEL_URL}/all`)
}

/**
 * 模糊查询全部获奖等级
 *
 * @param dto 获奖等级信息
 * */
function fuzzy (dto) {
  return http.$get(REWORD_LEVEL_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 获奖等级id
 * */
function queryById (id) {
  return http.$get(`${REWORD_LEVEL_URL}/${id}`)
}

/**
 * 添加获奖等级
 *
 * @param dto 获奖等级信息
 * */
function add (dto) {
  return http.$post(REWORD_LEVEL_URL, dto)
}

/**
 * 修改获奖等级
 *
 * @param dto 获奖等级信息
 * */
function modify (dto) {
  return http.$put(REWORD_LEVEL_URL, dto)
}

/**
 * 删除获奖等级
 *
 * @param dto 获奖等级信息
 * */
function remove (dto) {
  return http.$delete(REWORD_LEVEL_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
