import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const PAPER_URL = `${SERVER.MANAGER}/paper`

/**
 * 获取全部论文
 * */
function all () {
  return http.$get(`${PAPER_URL}/all`)
}

/**
 * 模糊查询全部论文
 *
 * @param dto 论文信息
 * */
function fuzzy (dto) {
  return http.$get(PAPER_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 论文id
 * */
function queryById (id) {
  return http.$get(`${PAPER_URL}/${id}`)
}

/**
 * 添加论文
 *
 * @param dto 论文信息
 * */
function add (dto) {
  return http.$post(PAPER_URL, dto)
}

/**
 * 批量添加论文
 *
 * @param dto 论文信息
 * */
function batchAdd (dto) {
  return http.$post(`${PAPER_URL}/batch`, dto)
}

/**
 * 修改论文
 *
 * @param dto 论文信息
 * */
function modify (dto) {
  return http.$put(PAPER_URL, dto)
}

/**
 * 删除论文
 *
 * @param dto 论文信息
 * */
function remove (dto) {
  return http.$delete(PAPER_URL, dto)
}

/**
 * 批量删除论文
 *
 * @param dto 论文信息
 * */
function batchRemove (dto) {
  return http.$delete(`${PAPER_URL}/batch`, dto)
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
