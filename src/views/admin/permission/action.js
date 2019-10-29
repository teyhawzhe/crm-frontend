import request from '@/utils/request'

export function getAllPath(params) {
  return request({
    url: '/api/path/allPath',
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
