import request from '@/utils/request'

export function insert(data) {
  return request({
    url: '/setting/path',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/setting/path/list',
    method: 'get',
    params
  })
}

export function sort(data) {
  return request({
    url: '/setting/path/sort',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/setting/path/update',
    method: 'put',
    data
  })
}

export function path(params) {
  return request({
    url: '/setting/path/path',
    method: 'get',
    params
  })
}

export function deletePath(data) {
  return request({
    url: '/setting/path/delete',
    method: 'delete',
    data
  })
}
