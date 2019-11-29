<template>
  <li
    role="menuitem"
    tabindex="-1"
    :style="[paddingStyle, itemStyle, { backgroundColor }]"
    :class="[
      cfg.prefix + '-menu-item',
      {
        'is-active': active,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
    @mouseenter="onMouseEnter"
    @focus="onMouseEnter"
    @blur="onMouseLeave"
    @mouseleave="onMouseLeave"
  >
    <pop-tip
      v-if="parentMenu.$options.componentName === 'Menu' && rootMenu.collapse && $slots.title"
      trigger="hover"
      placement="right"
      class="collapse-icon"
      :visible-arrow="false"
      :popper-class="[cfg.prefix + '-menu-item--popover']"
    >
      <slot name="title"></slot>
      <div slot="reference" style="outline:none; position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 24px;">
        <slot></slot>
      </div>
    </pop-tip>
    <template v-else>
      <slot></slot>
      <slot name="title"></slot>
    </template>
  </li>
</template>
<script>
import Menu from '../menu/menu-mixin';
import PopTip from '../pop-tip';
import Emitter from '../../mixins/emitter';

export default {
  name: 'MenuItem',

  componentName: 'MenuItem',

  components: { PopTip },

  mixins: [Menu, Emitter],

  props: {
    index: {
      default: null,
      validator: (val) => typeof val === 'string' || val === null
    },
    route: [String, Object],
    disabled: Boolean
  },
  computed: {
    active() {
      return this.index === this.rootMenu.activeIndex;
    },
    hoverBackground() {
      return this.rootMenu.hoverBackground;
    },
    backgroundColor() {
      return this.rootMenu.backgroundColor || '';
    },
    activeTextColor() {
      return this.rootMenu.activeTextColor || '';
    },
    textColor() {
      return this.rootMenu.textColor || '';
    },
    mode() {
      return this.rootMenu.mode;
    },
    itemStyle() {
      const style = {
        color: this.active ? this.activeTextColor : this.textColor
      };
      if (this.mode === 'horizontal' && !this.isNested) {
        if (this.active) {
          style.borderBottomColor = this.rootMenu.activeTextColor ? this.activeTextColor : '';
        } else {
          style.borderBottomColor = 'transparent';
        }
      }
      return style;
    },
    isNested() {
      return this.parentMenu !== this.rootMenu;
    }
  },
  mounted() {
    this.parentMenu.addItem(this);
    this.rootMenu.addItem(this);
  },
  beforeDestroy() {
    this.parentMenu.removeItem(this);
    this.rootMenu.removeItem(this);
  },
  methods: {
    onMouseEnter() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      this.$el.style.backgroundColor = this.hoverBackground;
    },
    onMouseLeave() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      this.$el.style.backgroundColor = this.backgroundColor;
    },
    handleClick() {
      if (!this.disabled) {
        this.dispatch('Menu', 'item-click', this);
        this.$emit('click', this);
      }
    }
  },
};
</script>
