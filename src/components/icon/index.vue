<template>
  <span :class="[componentCss, iconName]">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  componentName: 'Icon',
  props: {},
  data() {
    return {
      iconName: ''
    }
  },
  computed: {
    componentCss() {
      return this.cfg.prefix + '-icon'
    }
  },
  created() {},
  mounted() {
    this.iconName = this.$el.getAttribute('icon')
  }
}
</script>
