import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { getToken } from '@/utils/auth'
import { Notification } from 'element-ui'

export var stompClient = null

export function initConnection() {
  var socket = new SockJS(
    process.env.VUE_APP_BASE_API + '/myUrl?token=' + getToken()
  )
  stompClient = Stomp.over(socket)
  stompClient.debug = null
  stompClient.connect({ Authorization: getToken() }, frame => {
    console.log('Connected:' + frame)
    stompClient.subscribe('/user/queue/sendUser', function(response) {
      console.log('/user/queue/sendUser')
      Notification({
        title: '提示',
        message: '这是一条不会自动关闭的消息',
        duration: 0
      })
    })
    stompClient.subscribe('/topic/bulletin', function(response) {
      console.log('/topic/sendTopic')
      var json = JSON.parse(response.body)
      Notification.info({
        title: json.title,
        message: json.bulletin,
        duration: 0,
        position: 'bottom-right'
      })
    })
  })
}
