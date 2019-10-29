import { Message } from 'element-ui'

export function responseHandler(response, okFunction) {
  if (String(response.status) === 'valid') {
    Message({
      message: response.message,
      showClose: true,
      type: 'error',
      dangerouslyUseHTMLString: true
    })
  } else if (String(response.status) === 'ok') {
    okFunction(response)
  } /* else if (String(response.status) === 'exception') {
    Message({
      message: response.data,
      showClose: true,
      type: 'error'
    })
  } */
}
