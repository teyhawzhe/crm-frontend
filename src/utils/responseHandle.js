import { Message } from 'element-ui'

export function responseHandler(response, okFunction) {
  if (String(response.status) === 'VALID') {
    Message({
      message: response.message,
      showClose: true,
      type: 'error',
      dangerouslyUseHTMLString: true
    })
  } else if (String(response.status) === 'OK') {
    okFunction(response)
  } /* else if (String(response.status) === 'EXCEPTION') {
    Message({
      message: response.data,
      showClose: true,
      type: 'error'
    })
  } */
}
