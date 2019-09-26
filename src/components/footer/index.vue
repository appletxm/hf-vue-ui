<template>
  <footer :class="[cfg.prefix + '-footer']" :style="{ height }">
    <slot></slot>
  </footer>
</template>

<script>
const defaultH = 60
export default {
  name: 'Footer',
  componentName: 'Footer',
  props: {
    height: {
      type: String,
      default: `${defaultH}px`
    }
  }
};
</script>
