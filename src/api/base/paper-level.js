import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const PAPER_LEVEL_URL = `${SERVER.BASE_DATA}/paper/level`

/**
 * 获取全部论文级别
 * */
function all () {
  return http.$get(`${PAPER_LEVEL_URL}/all`)
}

/**
 * 模糊查询全部论文级别
 *
 * @param dto 论文级别信息
 * */
function fuzzy (dto) {
  return http.$get(PAPER_LEVEL_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 论文级别id
 * */
function queryById (id) {
  return http.$get(`${PAPER_LEVEL_URL}/${id}`)
}

/**
 * 添加论文级别
 *
 * @param dto 论文级别信息
 * */
function add (dto) {
  return http.$post(PAPER_LEVEL_URL, dto)
}

/**
 * 修改论文级别
 *
 * @param dto 论文级别信息
 * */
function modify (dto) {
  return http.$put(PAPER_LEVEL_URL, dto)
}

/**
 * 删除论文级别
 *
 * @param dto 论文级别信息
 * */
function remove (dto) {
  return http.$delete(PAPER_LEVEL_URL, dto)
}

export default {
  all,
  fuzzy,
  queryById,
  add,
  modify,
  remove
}
