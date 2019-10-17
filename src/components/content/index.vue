<template>
  <div :class="[cfg.prefix + '-content']" :style="{ width: width ? width+'px' : '' }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Content',
  componentName: 'Content',
  props: {
    width: {
      type: Number,
      default: 0
    }
  }
};
</script>
