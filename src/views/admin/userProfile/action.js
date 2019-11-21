import request from '@/utils/request'

export function queryRole(params) {
  return request({
    url: '/api/setting/role/',
    method: 'get',
    params
  })
}

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

export function deleteUser(params) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    params
  })
}

export function update(data) {
  return request({
    url: '/api/user/update',
    method: 'post',
    data
  })
}
