<template>
  <div :class="[$store.state.appPrefix + '-my-app', 'page-container', 'page-component']">
    <navigator></navigator>
    <div :class="[$store.state.appPrefix + '-module-all']">
      <side-menu :side-menu-data="sildeMenuData"></side-menu>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navigator from 'components-biz/navigator'
import SideMenu from 'components-biz/side-menu'
import { checkUserLogin } from 'common/auth'
import { NAVIGATOR_LIST } from 'store/mutation-types'
import { getNavigatorList, matchedNavItem } from './models'

export default {
  components: {
    navigator,
    SideMenu
  },
  data() {
    return {
      isPopLoginShow: false,
      dialogVisible: true,
      sildeMenuData: []
    }
  },
  watch: {
    '$store.state.currentModule'(val) {
      this.sildeMenuData = matchedNavItem(val, this.$store.state.navigatorList)
    }
  },
  created() {
    const navigatorList = getNavigatorList()
    this.$store.commit(NAVIGATOR_LIST, navigatorList)
    this.sildeMenuData = matchedNavItem(this.$store.state.currentModule, this.$store.state.navigatorList)
  },
  mounted() {
  },
  methods: {
  }
}
</script>
