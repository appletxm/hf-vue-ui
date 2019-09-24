<template>
  <button :class="[cfg.prefix + '-button']">
    测试
  </button>
</template>

<script>
const cfg = require('component-cfg')

export default {
  name: 'Button',
  data() {
    return {
      cfg
    }
  },
  computed: {},

  watch: {},

  created() {},

  mounted() {
  },

  methods: {
  }
}
</script>
