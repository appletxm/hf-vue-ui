<template>
  <div :class="[cfg.prefix+'-button-group']">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroup'
};
</script>
