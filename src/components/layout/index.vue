<template>
  <section :class="[
    (cfg.prefix + '-layout'),
    type ? 'is-has-type' : '',
    type ? (cfg.prefix + '-'+type) : '',
    isVertical ? 'is-vertical': '']"
  >
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'Layout',
  componentName: 'Layout',
  props: {
    direction: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
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
          const tagValue = tag === `${this.cfg.prefix}-header` || tag === `${this.cfg.prefix}-footer`;
          return tagValue;
        })

        : false;
    }
  },
};
</script>
