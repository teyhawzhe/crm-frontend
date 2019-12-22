import request from '@/utils/request'

export function sendEmail(data) {
  return request({
    url: '/example/email',
    method: 'post',
    data
  })
}
