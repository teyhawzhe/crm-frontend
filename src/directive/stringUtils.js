import Vue from 'vue'

Vue.directive('upperCase', function(el, _, vnode) {
  el.addEventListener('input', async function(e) {
    e.target.value = e.target.value.toUpperCase()
    vnode.componentInstance.$emit('input', e.target.value)
  })
})

Vue.directive('lowerCase', function(el, _, vnode) {
  el.addEventListener('input', async function(e) {
    e.target.value = e.target.value.toLowerCase()
    vnode.componentInstance.$emit('input', e.target.value)
  })
})

Vue.directive('number', function(el, _, vnode) {
  el.addEventListener('input', async function(e) {
    e.target.value = e.target.value.replace(/[^\d]/, '')
    vnode.componentInstance.$emit('input', e.target.value)
  })
})

Vue.directive('noChinese', function(el, _, vnode) {
  el.addEventListener('input', async function(e) {
    e.target.value = e.target.value.replace(/[^\w\.\/]/gi, '')
    vnode.componentInstance.$emit('input', e.target.value)
  })
})
