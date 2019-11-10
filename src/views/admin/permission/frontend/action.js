import request from '@/utils/request'

export function getAllPath(params) {
  return request({
    url: '/api/path/allPath',
    method: 'get',
    params
  })
}

export function save(data) {
  return request({
    url: '/api/frontendPermission/save',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/api/frontendPermission/query',
    method: 'get',
    params
  })
}
