import request from '@/utils/request'

export function getAllPath(params) {
  return request({
    url: '/setting/path/allPath',
    method: 'get',
    params
  })
}

export function save(data) {
  return request({
    url: '/setting/path/permission',
    method: 'post',
    data
  })
}

export function query(params) {
  return request({
    url: '/setting/path/permission',
    method: 'get',
    params
  })
}
