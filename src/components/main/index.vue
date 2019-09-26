<template>
  <main :class="[cfg.prefix + '-main']">
    <slot></slot>
  </main>
</template>

<script>
export default {
  name: 'Main',
  componentName: 'Main'
};
</script>
