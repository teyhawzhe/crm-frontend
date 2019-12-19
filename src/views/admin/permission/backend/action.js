import request from '@/utils/request'

export function findAll(params) {
  return request({
    url: '/setting/api/permission',
    method: 'get',
    params
  })
}

export function save(data) {
  return request({
    url: '/setting/api/permission',
    method: 'post',
    data
  })
}

export function findCheckApi(params) {
  return request({
    url: '/setting/api/permission/findCheckApi',
    method: 'get',
    params
  })
}
