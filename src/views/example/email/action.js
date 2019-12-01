import request from '@/utils/request'

export function sendEmail(data) {
  return request({
    url: '/api/example/email',
    method: 'post',
    data
  })
}
