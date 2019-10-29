import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/api/user/list',
    method: 'get',
    params
  })
}
