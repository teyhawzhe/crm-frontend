import download from '@/utils/download'

export function report(params) {
  return download({
    url: '/api/example/report',
    method: 'post',
    params
  })
}
