<template>
  <div v-if="skipGuide.next && skipGuide.pre" :class="[$store.state.appPrefix + '-c-footer']">
    <a :class="[$store.state.appPrefix + '-c-footer' + '__link']"><span class="hf-ui-icon ui-icon-arrowup"></span>文字 Font</a>
    <a :class="[$store.state.appPrefix + '-c-footer' + '__link']">栅格 Grid<span class="hf-ui-icon ui-icon-arrowup"></span></a>
  </div>
</template>

<script>
import { matchIndexListFromPath, getPreviousAndNext } from './models'

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
      skipGuide: {
        nex: '',
        pre: ''
      }
    }
  },
  computed: {},

  watch: {
    // 'skipGideList'(val) {
    //   getPreviousAndNext(val, this.$store.state.navigatorList)
    // }
    '$route.path'(val) {
      const indexList = matchIndexListFromPath(val, this.$store.state.navigatorList)
      getPreviousAndNext(indexList, this.$store.state.navigatorList)
    }
  },

  created() {},

  mounted() {},

  methods: {
  }
}
</script>
