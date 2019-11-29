<template>
  <li :class="[cfg.prefix+'-menu-item-group']">
    <div :class="[cfg.prefix+'-menu-item-group__title']" :style="{paddingLeft: levelPadding + 'px'}">
      <template v-if="!$slots.title">
        {{ title }}
      </template>
      <slot v-else name="title"></slot>
    </div>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  name: 'MenuItemGroup',

  componentName: 'MenuItemGroup',

  inject: ['rootMenu'],
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      paddingLeft: 24
    };
  },
  computed: {
    levelPadding() {
      let padding = 24;
      let parent = this.$parent;
      if (this.rootMenu.collapse || this.rootMenu.type === 'popup') return 24;
      while (parent && parent.$options.componentName !== 'Menu') {
        if (parent.$parent.$options.componentName === 'Menu' && parent.$options.componentName === 'Submenu') {
          padding += 32;
        } else if (parent.$options.componentName === 'Submenu') {
          padding += 14;
        }
        parent = parent.$parent;
      }
      return padding;
    }
  }
};
</script>
