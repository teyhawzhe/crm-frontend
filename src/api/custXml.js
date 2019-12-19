import request from '@/utils/requestXml'

export function queryXml(params) {
  return request({
    url: '/cust/xml',
    method: 'get',
    params
  })
}
