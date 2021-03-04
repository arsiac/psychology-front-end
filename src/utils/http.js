import axios           from 'axios'
import router          from '@/router'
import store           from '@/store'
import { Message }     from 'element-ui'
import { HTTP_METHOD } from './constant'

const http = axios.create({
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: 'http://arsiac.top:8010/'
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  // 加入token
  config.headers.authorization = store.getters.accessToken

  console.log(
    `==> HTTP(request)
    url: ${config.url}
    method: ${config.method}
    data: `, config.data, '\n    param: ', config.params)

  // 根据请求方式添加信息
  switch (config.method) {
    case HTTP_METHOD.POST:
      config.data.createBy = store.getters.id

    // eslint-disable-next-line no-fallthrough
    case HTTP_METHOD.PUT:
      config.data.updateBy = store.getters.id
      break
    default:
      break
  }
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  console.log(
    `==> HTTP(response)
    url: ${response.config.url}
    status: ${response.status}
    content-type: ${response.headers['content-type']}
    headers: ${JSON.stringify(response.headers)}
    data: `, response.data)

  return response
}, error => {
  console.error(
    `===> HTTP(error)
    url: ${error.config.url}
    status: ${error.response.status}
    response: ${error.response.data ? JSON.stringify(error.response.data) : error.response.data}`)

  // 处理错误
  if (error.response.status === 401) {
    router.push({ name: 'login' })
  }

  // 尝试报错
  const data = error.response.data
  if (data.message && data.code) {
    Message.error(`${data.message} (${data.code})`)
  } else {
    console.error('===> error(response)', error.response)
  }

  return Promise.reject(error)
})

http.$get = function (url, params) {
  const method = HTTP_METHOD.GET
  return http({ url, params, method })
}

http.$post = function (url, data) {
  const method = HTTP_METHOD.POST
  return http({ url, data, method })
}

http.$put = function (url, data) {
  console.log('put')
  const method = HTTP_METHOD.PUT
  return http({ url, data, method })
}

http.$delete = function (url, data) {
  const method = HTTP_METHOD.DELETE
  return http({ url, data, method })
}

export default http
