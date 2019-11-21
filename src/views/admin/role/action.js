import request from '@/utils/request'

const path = '/api/setting/role/'

export function query(params) {
  return request({
    url: path,
    method: 'get',
    params
  })
}

export function insert(data) {
  return request({
    url: path,
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: path,
    method: 'put',
    data
  })
}

export function deleteRole(data) {
  return request({
    url: path,
    method: 'delete',
    data
  })
}
