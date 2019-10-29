import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// font awesome
import 'vue-awesome/icons/flag'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('v-icon', Icon)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
/**
 * import { mockXHR } from '../mock'
 * if (process.env.NODE_ENV === 'production') {
 * mockXHR()
}
*/
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(require('vue-shortkey'))
Vue.config.productionTip = false

Vue.directive('test', {
  bind(el, binding, vnode) {
    el.addEventListener(
      'click',
      binding.value
      // console.log(vnode.context.$route)

      // alert(vnode.context.$router)
    )

    window.addEventListener('keydown', binding.value)
  },
  unbind: function(el, binding, vnode) {
    console.log(el)
    console.log('5 - unbind')
    window.removeEventListener('keydown', binding.value)
    window.removeEventListener('click', binding.value)
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
