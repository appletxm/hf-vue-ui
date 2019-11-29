<template>
  <span :class="`${prefix}-breadcrumb__item`">
    <span
      ref="link"
      :class="[`${prefix}-breadcrumb__inner`, to ? 'is-link' : '']"
      role="link"
    >
      <slot></slot>
    </span>
    <i v-if="separatorClass" :class="[`${prefix}-breadcrumb__separator`, separatorClass]"></i>
    <span v-else :class="`${prefix}-breadcrumb__separator`" role="presentation">{{ separator }}</span>
  </span>
</template>

<script>
const cfg = require('component-cfg')

export default {
  name: 'BreadcrumbItem',
  props: {
    to: {
      type: Object,
      default() {
        return {}
      }
    },
    replace: Boolean
  },
  computed: {
    prefix() {
      return cfg.prefix;
    },
    separator() {
      return this.breadcrumb.separator;
    },
    separatorClass() {
      return this.breadcrumb.separatorClass;
    },
  },

  inject: ['breadcrumb'],

  mounted() {
    const link = this.$refs.link;
    link.setAttribute('role', 'link');
    link.addEventListener('click', () => {
      const { to, $router } = this;
      if (!to || !$router) return;
      this.replace ? $router.replace(to) : $router.push(to);
    });
  }
};
</script>
