import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + contextPath + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  timeout: 1000 * 60 * 15, // request timeout
  responseType: 'blob'
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
    if (response.headers['content-type'] === 'application/json;charset=UTF-8') {
      const fr = new FileReader()

      fr.onload = function() {
        const data = JSON.parse(this.result)
        if (String(data.status) === 'EXCEPTION') {
          if (String(data.message) === 'INVALID_CREDENTIALS') {
            Message({
              message: '帳號或密碼錯誤!',
              showClose: true,
              type: 'error',
              duration: 5 * 1000
            })
            return Promise.reject()
          } else if (String(data.message) === 'USER_DISABLED') {
            Message({
              message: '帳號被鎖，請聯絡系統負責人!',
              showClose: true,
              type: 'error',
              duration: 5 * 1000
            })
          } else if (String(data.message) === 'DISALLOWED_API') {
            Message({
              message: '沒有API的權限!',
              showClose: true,
              type: 'error',
              duration: 5 * 1000
            })
          } else if (String(data.message) === 'LOGIN_ATTEMPT') {
            Message({
              message: res.data,
              showClose: true,
              type: 'error',
              duration: 5 * 1000
            })
          } else if (String(data.message) === 'TOKEN_EXPIRED') {
            MessageBox.confirm('帳號登入已經逾期了，請重新登入', '請重新登入', {
              confirmButtonText: '重新登入',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            })
          } else {
            Message({
              message: res.message,
              showClose: true,
              type: 'error',
              duration: 5 * 1000
            })
          }
          return Promise.reject(res)
        }
      }
      fr.readAsText(res)
    }
    return response
  },
  error => {
    const status = error.response.status
    if (String(status) === '401') {
      var response = error.response
      if (String(response.data.message) === 'expired') {
        MessageBox.confirm('帳號登入已經逾期了，請重新登入', '請重新登入', {
          confirmButtonText: '重新登入',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (String(response.data.message) === 'Unauthorized') {
        Message({
          message: '帳號或密碼錯誤!',
          showClose: true,
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      console.error(error.response)
    }

    return Promise.reject(error)
  }
)

export default service
