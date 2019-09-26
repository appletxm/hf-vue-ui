<template>
  <header :class="[cfg.prefix + '-header']" :style="{ height }">
    <slot></slot>
  </header>
</template>

<script>
const defaultH = 60
export default {
  name: 'Header',
  componentName: 'Header',
  props: {
    height: {
      type: String,
      default: `${defaultH}px`
    }
  }
};
</script>
