import http from '@/utils/http';
import { USER_CENTRE } from '@/api/constant';

/**
 * 登录接口
 *
 * @param form 登录表单
 * */
function login(form) {
  return http({
    url: `${USER_CENTRE}/login`,
    method: 'post',
    data: form
  });
}

/**
 * 登出接口
 *
 * @param id 用户id
 * */
function logout(id) {
  return http({
    url: `${USER_CENTRE}/logout`,
    method: 'post',
    data: { id }
  });
}

/**
 * 获取验证码
 * */
function captcha() {
  return http({
    url: `${USER_CENTRE}/captcha`,
    responseType: 'arraybuffer',
    method: 'get'
  })
}

/**
 * 获取应用名称
 * */
function app() {
  return http({
    url: `${USER_CENTRE}/app`,
    method: 'get'
  })
}




export default {
  login,
  logout,
  captcha,
  app
}