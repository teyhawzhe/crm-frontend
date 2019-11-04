import Vue from 'vue'

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
