import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/api/path/add',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/api/path/list',
    method: 'get',
    params
  })
}

export function sort(data) {
  return request({
    url: '/api/path/sort',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/api/path/update',
    method: 'put',
    data
  })
}

export function path(params) {
  return request({
    url: '/api/path/path',
    method: 'get',
    params
  })
}

export function deletePath(data) {
  return request({
    url: '/api/path/delete',
    method: 'delete',
    data
  })
}
