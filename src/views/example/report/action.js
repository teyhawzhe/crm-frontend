import download from '@/utils/download'

export function report(params) {
  return download({
    url: '/example/report',
    method: 'post',
    params
  })
}
