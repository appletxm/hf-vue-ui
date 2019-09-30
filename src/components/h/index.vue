<template>
  <div :class="[componentCss]">
    <b :class="[componentCss + '__h' + size, componentCss + '--' + fontWeight]">
      <slot></slot>
    </b>
  </div>
</template>

<script>
export default {
  name: 'H',
  componentName: 'H',
  props: {
    size: {
      type: Number,
      default: 2
    },
    fontWeight: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
    }
  },
  computed: {
    componentCss() {
      return this.cfg.prefix + '-h'
    }
  }
}
</script>
