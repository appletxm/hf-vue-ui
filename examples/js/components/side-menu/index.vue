<template>
  <section :class="[$store.state.appPrefix + '-c-side-menu']">
    <ul v-if="sideMenuData.length > 0">
      <li
        v-for="tItem in sideMenuData"
        :key="tItem.id" class="level-top"
      >
        <a
          :class="[tItem.path ? 'alive' : '', $store.state.currentSubModule === tItem.module ? 'actived' : '']"
          @click="$gotoPage(tItem)"
        >
          {{ tItem.label }}
        </a>
        <ul v-if="tItem.children && tItem.children.length > 0">
          <li
            v-for="sItem in tItem.children"
            :key="sItem.id"
            class="level-second"
          >
            <a
              :class="[sItem.path ? 'alive' : '', $store.state.currentSubModule === sItem.module ? 'actived' : '']"
              @click="$gotoPage(sItem)"
            >
              {{ sItem.label }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </section>
</template>

<script>
/* eslint-disable vue/require-valid-default-prop */
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
    // '$store.state.currentSubModule'(val) {
    //   console.info('*******', val)
    // }
  },

  created() {},

  mounted() {
  },

  methods: {
    $gotoPage(item) {
      if (!item.path) {
        return false
      }

      if (item.module === this.$store.state.currentModule) {
        return false
      }

      this.$router.push({
        path: item.path
      })
    }
  }
}
/* eslint-enable vue/require-valid-default-prop */
</script>
