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
    }
  },

  computed: {
    classList() {
      return `${cfg.prefix}-breadcrumb`;
    },
  },

  provide() {
    return {
      breadcrumb: this
    };
  }
};
</script>
