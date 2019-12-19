import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params
  })
}
