<template>
  <section :class="[(cfg.prefix + '-container'), isVertical ? 'is-vertical': '']">
    <slot></slot>
  </section>
</template>

<script>
/* global cfg */
export default {
  name: 'Container',
  componentName: 'Container',
  props: {
    direction: {
      type: String,
      default: 'vertical'
    }
  },
  computed: {
    isVertical() {
      if (this.direction === 'vertical') {
        return true;
      } else if (this.direction === 'horizontal') {
        return false;
      }
      return this.$slots && this.$slots.default
        ? this.$slots.default.some((vnode) => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag;
          return tag === `${cfg.prefix}-header` || tag === `${cfg.prefix}-footer`;
        })
        : false;
    }
  }
};
</script>
