import Vue from 'vue'
import store from '@/store'
Vue.directive('permission', {
  inserted: function(el, binding, vnode) {
    const nowPath = vnode.context.$route.path
    const nowPermission = binding.value
    const legalFunc = store.getters.legalFunc
    let checkPermission = false
    for (var i = 0; i < legalFunc.length; i++) {
      if (legalFunc[i].PATH === nowPath) {
        if (legalFunc[i].FUNC === nowPermission) {
          checkPermission = true
        }
      }
    }
    if (!checkPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
})
