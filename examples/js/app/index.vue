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
import { NAVIGATOR_LIST, CURRENT_MODULE, CURRENT_SUB_MODULE } from 'store/mutation-types'
import { getNavigatorList, matchedNavItem, matchModuleFromUrl } from './models'

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
    '$route.path'(val) {
      this.$initModuleInfo(val)
    }
  },
  created() {
    const navigatorList = getNavigatorList()
    this.$store.commit(NAVIGATOR_LIST, navigatorList)
    // this.$getSubData(this.$store.state.currentModule)
  },
  mounted() {},
  methods: {
    $initModuleInfo (path) {
      let res = matchModuleFromUrl(path, this.$store.state.navigatorList)

      console.info('path:', path, res[0]['module'])

      if (res[0]) {
        this.$store.commit(CURRENT_MODULE, res[0]['module'])
        this.$getSubData(res[0]['module'])
      }
      if (res[1]) {
        this.$store.commit(CURRENT_SUB_MODULE, res[1]['module'])
      }
      
    },

    $getSubData (moduleName) {
       this.sildeMenuData = matchedNavItem(moduleName, this.$store.state.navigatorList)
    }
  }
}
</script>
