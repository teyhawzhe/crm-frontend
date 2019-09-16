import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/api/cust/add',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/api/cust/list',
    method: 'get',
    params
  })
}
