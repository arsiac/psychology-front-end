import axios            from 'axios'
import router           from '@/router'
import store            from '@/store'
import { Notification } from 'element-ui'
import { HTTP_METHOD }  from './constant'

const http = axios.create({
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: 'http://127.0.0.1:8010/'
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
    case HTTP_METHOD.GET:
      if (!config.params) {
        config.params = {}
      }
      if (config.params.createBy !== 0) {
        config.params.createBy = store.getters.id
      }
      break
    case HTTP_METHOD.POST:
      if (config.data && !config.data.createBy) {
        config.data.createBy = store.getters.id
      }

    // eslint-disable-next-line no-fallthrough
    case HTTP_METHOD.PUT:
      if (config.data && !config.data.updateBy) {
        config.data.updateBy = store.getters.id
      }
      break
    default:
      break
  }
  return config
}, error => {
  console.error('request(error))', error)
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
  if (!error || !error.response) {
    Notification.error({
      title: '错误',
      message: '请检查网络'
    })
    return Promise.reject(error)
  }
  console.error(
    `===> HTTP(response error)
    url: ${error.config.url}
    status: ${error.response.status}
    response: ${error.response.data
      ? JSON.stringify(error.response.data)
      : error.response.data}`)
  // 无权限
  if (error.response.status === 401) {
    router.push({ name: 'login' })
  } else {
    // 尝试报错
    const data = error.response.data
    if (data.message && data.code) {
      Notification.error({
        title: `代码: ${data.code}`,
        message: data.message
      })
    } else {
      console.error('===> error(response)', error.response)
    }
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
