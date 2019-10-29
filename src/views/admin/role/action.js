import request from '@/utils/request'

export function query(params) {
  return request({
    url: '/api/role/list',
    method: 'get',
    params
  })
}

export function insert(data) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data
  })
}
