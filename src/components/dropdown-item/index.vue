<template>
  <li
    :class="[
      `${cfg.prefix}-dropdown-menu__item`,
      disabled && 'is-disabled',
      divided && `${cfg.prefix}-dropdown-menu__item--divided`
    ]"
    :aria-disabled="disabled"
    :tabindex="disabled ? null : -1"
    @click="handleClick"
  >
    <i v-if="icon" :class="[`${cfg.prefix}-icon`,icon]"></i>
    <slot></slot>
  </li>
</template>
<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'DropdownItem',

  mixins: [Emitter],

  props: {
    command: [String, Object],
    disabled: Boolean,
    divided: Boolean,
    icon: String
  },

  methods: {
    handleClick() {
      this.dispatch('Dropdown', 'menu-item-click', [this.command, this]);
    }
  }
};
</script>
