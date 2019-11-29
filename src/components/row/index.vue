<template>
  <div :class="classList" :style="style">
    <slot></slot>
  </div>
</template>
<script>
const cfg = require('component-cfg')

export default {
  name: 'Row',

  componentName: 'Row',

  props: {
    gutter: Number,
    type: String,
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'top'
    }
  },
  data() {
    return {
      cfg,
    };
  },
  computed: {
    style() {
      const ret = {};

      if (this.gutter) {
        ret.marginLeft = `-${this.gutter / 2}px`;
        ret.marginRight = ret.marginLeft;
      }

      return ret;
    },
    classList() {
      const classList = [
        `${cfg.prefix}-row`,
        this.justify !== 'start' ? `is-justify-${this.justify}` : '',
        this.align !== 'top' ? `is-align-${this.align}` : '',
        { [`${cfg.prefix}-row--flex`]: this.type === 'flex' }
      ];
      return classList;
    },
  },
};

</script>
