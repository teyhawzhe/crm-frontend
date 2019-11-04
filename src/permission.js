import router from './router'
import { constantRoutes } from '@/router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { path } from '@/views/admin/path/subMenu/action'
import { routerMap } from '@/router/routerMap'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          await path()
            .then(res => {
              if (res.status === 'ok') {
                console.log(res.data)
                const filer = JSON.parse(res.data)

                const paths = []
                for (var j = 0; j < filer.length; j++) {
                  if (filer[j].component === 'LAYOUT' && !filer[j].children) {
                    continue
                  }
                  paths.push(filer[j])
                }
                const json = JSON.parse(JSON.stringify(paths), (key, value) => {
                  if (key === 'component') {
                    return routerMap[value]
                  }
                  return value
                })
                router.addRoutes(json)
                for (var i = 0; i < json.length; i++) {
                  constantRoutes.push(json[i])
                }
                next({ ...to, replace: true })
              } else {
                next()
              }
            })
            .catch(error => {
              console.log(error)
              next()
            })
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
