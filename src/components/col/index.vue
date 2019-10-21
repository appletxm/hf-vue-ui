<template>
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>
<script>
const cfg = require('component-cfg')

export default {
  name: 'Col',
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  data() {
    return {
      cfg,
    };
  },
  computed: {
    gutter() {
      let parent = this.$parent;
      while (parent && parent.$options.componentName !== 'Row') {
        parent = parent.$parent;
      }
      return parent ? parent.gutter : 0;
    },
    style() {
      let style = {};
      if (this.gutter) {
        style.paddingLeft = this.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }
      return style;
    },
    classList() {
      let classList = [];

      ['span', 'offset', 'pull', 'push'].forEach(prop => {
        if (this[prop] || this[prop] === 0) {
          classList.push(
            prop !== 'span'
              ? `${cfg.prefix}-col-${prop}-${this[prop]}`
              : `${cfg.prefix}-col-${this[prop]}`
          );
        }
      });

      ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
        if (typeof this[size] === 'number') {
          classList.push(`${cfg.prefix}-col-${size}-${this[size]}`);
        } else if (typeof this[size] === 'object') {
          let props = this[size];
          Object.keys(props).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `${cfg.prefix}-col-${size}-${prop}-${props[prop]}`
                : `${cfg.prefix}-col-${size}-${props[prop]}`
            );
          });
        }
      });

      return [`${cfg.prefix}-col`, classList];
    },
  },
};
</script>

