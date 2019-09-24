<template>
  <ul :class="[$store.state.appPrefix + '-c-side-menu']" v-if="sideMenuData.length > 0">
    <li v-for="tItem in sideMenuData" :key="tItem.id" class="level-top">
      <a :class="[tItem.path ? 'alive' : '']">{{ tItem.label }}</a>
      <ul v-if="tItem.children && tItem.children.length > 0">
        <li v-for="sItem in tItem.children" :key="sItem.id" class="level-second">
          <a :class="[sItem.path ? 'alive' : '']">{{ sItem.label }}</a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { CURRENT_MODULE } from 'store/mutation-types'

export default {
  components: {},
  props: {
    sideMenuData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {}
  },
  computed: {},

  watch: {
    'sideMenuData'(val) {
      console.info(val)
    }
  },

  created() {},

  mounted() {
  },

  methods: {
    gotoPage(event, item) {
      event.stopPropagation()

      if (item.module === this.$store.state.currentModule) {
        return false
      }

      this.$router.push({
        path: item.url
      })

      this.$store.commit(CURRENT_MODULE, item.module)
    }
  }
}
</script>
