<template>
  <aside :class="[cfg.prefix + '-aside']" :style="{ width }">
    <slot></slot>
  </aside>
</template>

<script>
const defaultW = 200
export default {
  name: 'Aside',
  componentName: 'Aside',
  props: {
    width: {
      type: String,
      default: `${defaultW}px`
    }
  }
};
</script>
