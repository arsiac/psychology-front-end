import http from '@/utils/http'
import { SERVER, HTTP_METHOD } from '@/utils/constant'

const USER_URL = `${SERVER.USER_CENTRE}/user`

/**
 * 获取全部用户
 * */
function all () {
  return http.$get(`${USER_URL}/all`)
}

/**
 * 模糊查询全部用户
 *
 * @param user 用户信息
 * */
function fuzzy (user) {
  return http({
    url: USER_URL,
    method: HTTP_METHOD.GET,
    param: user
  })
}

/**
 * 根据id查询
 *
 * @param id 用户id
 * */
function queryById (id) {
  return http({
    url: `${USER_URL}/${id}`,
    method: HTTP_METHOD.GET
  })
}

/**
 * 添加用户
 *
 * @param user 用户信息
 * */
function add (user) {
  return http({
    url: USER_URL,
    method: HTTP_METHOD.POST

  })
}

export default {
  all,
  fuzzy,
  queryById,
  add
}
