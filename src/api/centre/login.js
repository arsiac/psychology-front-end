import http from '@/utils/http'
import { SERVER, HTTP_METHOD } from '@/utils/constant'

const USER_CENTRE = SERVER.USER_CENTRE

/**
 * 注册接口
 *
 * @param form 登录表单
 * */
function register (form) {
  return http.post(`${USER_CENTRE}/register`, form)
}

/**
 * 登录接口
 *
 * @param form 登录表单
 * */
function login (form) {
  return http.$post(`${USER_CENTRE}/login`, form)
}

/**
 * 登录接口,获取已有token
 *
 * @param id 用户id
 * */
function loginForToken (id) {
  return http.$post(`${USER_CENTRE}/login/${id}`)
}

/**
 * 登出接口
 *
 * @param id 用户id
 * */
function logout (id) {
  return http.$post(`${USER_CENTRE}/logout`, { id })
}

/**
 * 获取验证码
 * */
function captcha () {
  return http({
    url: `${USER_CENTRE}/captcha`,
    responseType: 'arraybuffer',
    method: HTTP_METHOD.GET
  })
}

/**
 * 获取应用名称
 * */
function app () {
  return http.$get(`${USER_CENTRE}/app`)
}

export default {
  register,
  login,
  loginForToken,
  logout,
  captcha,
  app
}
