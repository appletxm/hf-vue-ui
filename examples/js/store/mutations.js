import * as actionTypes from './mutation-types'

export default {
  [actionTypes.NAVIGATOR_LIST](state, value) {
    state.navigatorList = value
  },

  [actionTypes.CURRENT_MODULE](state, value) {
    state.currentModule = value
  },

  [actionTypes.CURRENT_SUB_MODULE](state, value) {
    state.currentSubModule = value
  }
}
