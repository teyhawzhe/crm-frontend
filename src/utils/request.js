import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (String(res.status) === 'EXCEPTION') {
      if (String(res.message) === 'INVALID_CREDENTIALS') {
        Message({
          message: '帳號或密碼錯誤!',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject()
      } else if (String(res.message) === 'USER_DISABLED') {
        Message({
          message: '帳號被鎖，請聯絡系統負責人!',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
      } else if (String(res.message) === 'DISALLOWED_API') {
        Message({
          message: '您沒有此API的權限!',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }

    if (String(res.status) === 'valid') {
      Message({
        message: res.message,
        showClose: true,
        type: 'error',
        duration: 5 * 1000,
        dangerouslyUseHTMLString: true
      })
    }

    return res
  },
  error => {
    const status = error.response.status
    console.log('errors ', errors)
    if (String(status) === '401') {
      var errors = error.response
      if (String(errors.data.message) === 'expired') {
        MessageBox.confirm('帳號登入已經逾期了，請重新登入', '請重新登入', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (String(errors.data.message) === 'Unauthorized') {
        Message({
          message: '帳號或密碼錯誤!',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
      }
    }

    return Promise.reject(error)
  }
)

export default service
