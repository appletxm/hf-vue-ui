<template>
  <section
    :class="[
      (cfg.prefix + '-layout'),
      type ? 'is-has-type' : '',
      type ? (cfg.prefix + '-layout-'+type) : '',
      isVertical ? 'is-vertical': '']"
    :style="{'min-width': minWidth ? minWidth+'px' : minWidthC}"
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
    minWidth: {
      type: Number,
      default: 0,
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
          const tagValue = tag === `${this.cfg.prefix}-header` || tag === `${this.cfg.prefix}-footer`;
          return tagValue;
        })

        : false;
    },
    minWidthC() {
      let widthValue = '';
      if (this.$slots && this.$slots.default) {
        this.$slots.default.some((vnode) => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag;
          const tagValue = tag === `${this.cfg.prefix}-content`;
          if (tagValue) {
            const width = vnode.componentOptions && vnode.componentOptions.propsData && vnode.componentOptions.propsData.width;
            widthValue = width ? `${parseInt(width, 10) + 48}px` : '';
          }
          return tagValue;
        })
      }
      return widthValue;
    }

  },
};
</script>
