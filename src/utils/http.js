import axios from 'axios';
import router from '@/router';
import store from '@/store';
import { Message } from 'element-ui';

const http = axios.create({
  timeout: 1000 * 30,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  baseURL: 'http://47.110.247.139:8010/'
});

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    // 加入token
    config.headers.authorization = store.getters.token;

    console.log(
      `==> HTTP(request)
    url: ${config['url']}
    method: ${config['method']}
    data: `, config['data']);

    // 根据请求方式添加信息
    const method = config.method.toLowerCase();
    switch (method) {
      case 'post':
        config.data.createBy = store.getters.id;

      // eslint-disable-next-line no-fallthrough
      case 'put':
        config.data.updateBy = store.getters.id;
        break;
      default:
        break;
    }
    return config;
  }
  , error => {
    return Promise.reject(error);
  });

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  console.log(
    `==> HTTP(response)
    url: ${response['config']['url']}
    status: ${response['status']}
    content-type: ${response['headers']['content-type']}
    headers: ${JSON.stringify(response['headers'])}
    data: `, response['data']);

  // 401, token失效/无token
  if (response.data && response.data.code === 401) {
    router.push({ name: 'login' });
  }

  return response;
}, error => {
  console.error(
    `===> HTTP(error)
    url: ${error['config']['url']}
    status: ${error['response']['status']}
    response: ${error['response']['data'] ? JSON.stringify(error['response']['data']) : error['response']['data']}`);

  // 尝试报错
  const response = error['response']
  console.log(response['data'])
  const data = error['response']['data'];
  debugger
  if (data) {
    Message.error(`${data['message']} (${data['code']})`);
  }

  return Promise.reject(error);
});

export default http;
