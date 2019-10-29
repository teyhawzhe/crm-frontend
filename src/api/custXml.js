import request from '@/utils/requestXml'

export function queryXml(params) {
  return request({
    url: '/api/cust/xml',
    method: 'get',
    params
  })
}
