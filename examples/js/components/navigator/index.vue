<template>
  <ul :class="[$store.state.appPrefix + '-c-navigator']">
    <li
      v-for="item in $store.state.navigatorList"
      :key="item.id"
      :class="[$store.state.currentModule === item.module ? 'actived' : '']"
      @click="(event) => { $gotoPage(event, item) }"
    >
      <span class="text-inner">
        <span :class="[item.icon]"></span>{{ item.label }}
      </span>
    </li>
  </ul>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},

  watch: {
    // '$store.state.currentModule'(val) {
    //   console.info('====', val)
    // }
  },

  created() {},

  mounted() {
  },

  methods: {
    $gotoPage(event, item) {
      event.stopPropagation()

      if (item.module === this.$store.state.currentModule) {
        return false
      }

      this.$router.push({
        path: item.path
      })
    }
  }
}
</script>
