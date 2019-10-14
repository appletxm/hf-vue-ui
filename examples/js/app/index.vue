<template>
  <div :class="[$store.state.appPrefix + '-my-app', 'page-container', 'page-component']">
    <app-navigator />
    <div :class="[$store.state.appPrefix + '-module-all', sildeMenuData.length === 0 ? 'no-left-menu' : '']">
      <side-menu v-if="sildeMenuData.length >= 1" :side-menu-data="sildeMenuData"></side-menu>
      <div class="router-content">
        <router-view></router-view>
        <app-footer :skip-gide-list="skipGideIndexList" />
      </div>
    </div>
  </div>
</template>

<script>
import AppNavigator from 'components-biz/navigator'
import SideMenu from 'components-biz/side-menu'
import AppFooter from 'components-biz/footer'
import { NAVIGATOR_LIST, CURRENT_MODULE, CURRENT_SUB_MODULE } from 'store/mutation-types'
import { getNavigatorList, matchedNavItem, matchModuleFromUrl } from './models'

export default {
  components: {
    AppNavigator,
    SideMenu,
    AppFooter
  },
  data() {
    return {
      isPopLoginShow: false,
      dialogVisible: true,
      sildeMenuData: [],
      skipGideIndexList: []
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
    this.$getSubData(this.$store.state.currentModule)
  },
  mounted() {},
  methods: {
    $initModuleInfo(path) {
      const res = matchModuleFromUrl(path, this.$store.state.navigatorList)
      this.skipGideIndexList = res.indexList
      this.$store.commit(CURRENT_MODULE, res.currentModuleName)
      this.$store.commit(CURRENT_SUB_MODULE, res.currentSubModuleName)
      this.$getSubData(res.currentModuleName)
    },

    $getSubData(moduleName) {
      this.sildeMenuData = matchedNavItem(moduleName, this.$store.state.navigatorList)
    }
  }
}
</script>
