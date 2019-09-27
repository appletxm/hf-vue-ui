<template>
  <button :class="[
    cfg.prefix + '-button',
    buttonSize ? cfg.prefix + '-button' + '--' + buttonSize : '',
    type ? cfg.prefix + '-button' + '--' + type : '']"
  >
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
  },
  computed: {
    buttonSize() {
      return this.size;
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
