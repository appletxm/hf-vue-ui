<template>
  <div :class="[$store.state.appPrefix + '-c-footer']">
    <router-link v-if="prev.path" :class="[$store.state.appPrefix + '-c-footer' + '__link']" :to="prev.path">
      <span class="hf-ui-icon ui-icon-arrowup"></span>
      {{ prev.label }}
    </router-link>
    <router-link v-if="next.path" :class="[$store.state.appPrefix + '-c-footer' + '__link']" :to="next.path">
      {{ next.label }}
      <span class="hf-ui-icon ui-icon-arrowup"></span>
    </router-link>
  </div>
</template>

<script>
import { matchedPosItems } from './models'
import { matchModuleFromUrl } from '../../app/models'

export default {
  components: {},
  props: {
    skipGideList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      next: {
        label: '',
        path: ''
      },
      prev: {
        label: '',
        path: ''
      }
    }
  },
  computed: {},

  watch: {
    '$route.path'(val) {
      const { moduleList } = matchModuleFromUrl(val, this.$store.state.navigatorList)
      this.$findPosItems(moduleList)
    }
  },

  created() {},

  mounted() {},

  methods: {
    $findPosItems(moduleList) {
      const currentItem = moduleList[moduleList.length - 1]
      const { next, prev } = currentItem
      const navList = this.$store.state.navigatorList
      const nextItem = matchedPosItems(next, navList)
      const prevItem = matchedPosItems(prev, navList)
      this.next.label = nextItem.label
      this.next.path = nextItem.path
      this.prev.label = prevItem.label
      this.prev.path = prevItem.path
    }
  }
}
</script>
