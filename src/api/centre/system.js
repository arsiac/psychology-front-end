import http       from '@/utils/http'
import { SERVER } from '@/utils/constant'

const SYSTEM_URL = `${SERVER.USER_CENTRE}/system`

/**
 * 根据用户id获取资源
 *
 * @param id 用户id
 * */
function getResourceByUserId (id) {
  return http.$get(`${SYSTEM_URL}/menu/${id}`)
}

export default {
  getResourceByUserId
}
