<template>
  <div :class="[$store.state.appPrefix + '-my-app', 'page-container', 'page-component']">
    <navigator></navigator>
    <div :class="[$store.state.appPrefix + '-module-all']">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigator from 'components-biz/navigator'

import {
  checkUserLogin
} from 'common/auth'
import { NAVIGATOR_LIST } from 'store/mutation-types'
import {
  getNavigatorList,
  runEventQueue
} from './models'

export default {
  components: {
    navigator
  },
  data() {
    return {
      isPopLoginShow: false,
      dialogVisible: true
    }
  },
  watch: {
    // '$store.state.needShowLoginPop'(val) {
    //   console.info('====', val)
    // }
  },
  created() {
    const navigatorList = getNavigatorList()
    this.$store.commit(NAVIGATOR_LIST, navigatorList)
  },
  mounted() {
  },
  methods: {
  }
}
</script>
