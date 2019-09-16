import { Message } from 'element-ui'

export function responseHander(response, okFunction) {
  if (String(response.status) === 'valid') {
    Message({
      message: response.message,
      showClose: true,
      type: 'error',
      dangerouslyUseHTMLString: true
    })
    okFunction(response)
  } else if (String(response.status) === 'ok') {
    okFunction(response)
  }
}
