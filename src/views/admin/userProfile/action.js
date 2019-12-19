import request from '@/utils/request'

export function queryRole(params) {
  return request({
    url: '/setting/role/',
    method: 'get',
    params
  })
}

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

export function deleteUser(params) {
  return request({
    url: '/user/delete',
    method: 'delete',
    params
  })
}

export function update(data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
