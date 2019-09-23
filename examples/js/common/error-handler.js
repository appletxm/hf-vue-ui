/* global Vue */
import { removeAllCookie } from 'common/auth'
import globals from 'common/globals'

export const errorPopMsg = {
  showTimeoutErrConfrim(errorObj) {
    Vue.$messagebox.alert('请重新登录', '登录过期').then(() => {
      const url = `${window.location.origin}${window.location.pathname} #/login?timeOut=1`
      removeAllCookie()
      window.location.href = url
    }).catch(() => {
      if (errorObj) {
        throw (errorObj)
      }
    })
  }
}

export const errorCodeMatch = {
  '-1'(resData) {
    const errorObj = { code: resData.code, message: resData.detailMessage || resData.message }
    errorPopMsg.showTimeoutErrConfrim(errorObj)
    throw (errorObj)
  },

  '401'(resData) {
    const errorObj = { code: resData.code, message: resData.detailMessage || resData.message }
    throw (errorObj)
  }
}
