<template>
  <div :class="classList" aria-label="Breadcrumb" role="navigation">
    <slot></slot>
  </div>
</template>

<script>
const cfg = require('component-cfg')

export default {
  name: 'Breadcrumb',

  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    },
    theme: {
      // 可选值 white
      type: String,
    },
  },

  computed: {
    classList() {
      return [`${cfg.prefix}-breadcrumb`, this.theme || ''];
    },
  },

  provide() {
    return {
      breadcrumb: this
    };
  }
};
</script>
