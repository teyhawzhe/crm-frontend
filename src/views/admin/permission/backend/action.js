import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/api/apiPermission/findAll',
    method: 'get',
    params
  })
}

export function save(data) {
  return request({
    url: '/api/apiPermission/save',
    method: 'post',
    data
  })
}

export function findCheckApi(params) {
  return request({
    url: '/api/apiPermission/findCheckApi',
    method: 'get',
    params
  })
}
