import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const OPUS_URL = `${SERVER.MANAGER}/opus`

/**
 * 获取全部作品
 * */
function all () {
  return http.$get(`${OPUS_URL}/all`)
}

/**
 * 模糊查询全部作品
 *
 * @param dto 作品信息
 * */
function fuzzy (dto) {
  return http.$get(OPUS_URL, dto)
}

/**
 * 根据id查询
 *
 * @param id 作品id
 * */
function queryById (id) {
  return http.$get(`${OPUS_URL}/${id}`)
}

/**
 * 添加作品
 *
 * @param dto 作品信息
 * */
function add (dto) {
  return http.$post(OPUS_URL, dto)
}

/**
 * 批量添加作品
 *
 * @param dto 作品信息
 * */
function batchAdd (dto) {
  return http.$post(`${OPUS_URL}/batch`, dto)
}

/**
 * 修改作品
 *
 * @param dto 作品信息
 * */
function modify (dto) {
  return http.$put(OPUS_URL, dto)
}

/**
 * 删除作品
 *
 * @param dto 作品信息
 * */
function remove (dto) {
  return http.$delete(OPUS_URL, dto)
}

/**
 * 批量删除作品
 *
 * @param dto 作品信息
 * */
function batchRemove (dto) {
  return http.$delete(`${OPUS_URL}/batch`, dto)
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
