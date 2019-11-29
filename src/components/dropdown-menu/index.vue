<template>
  <transition :name="transitionName" @after-leave="doDestroy">
    <ul v-show="showPopper" :class="[`${cfg.prefix}-dropdown-menu`,`${cfg.prefix}-popper`,size && `${cfg.prefix}-dropdown-menu--${size}`]">
      <slot></slot>
    </ul>
  </transition>
</template>
<script>
import Popper from '../../utils/vue-popper';

export default {
  name: 'DropdownMenu',

  componentName: 'DropdownMenu',

  mixins: [Popper],

  props: {
    visibleArrow: {
      type: Boolean,
      default: false
    },
    arrowOffset: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      size: this.dropdown.dropdownSize,
      transitionName: `${this.cfg.prefix}-zoom-in-top`,
    };
  },

  inject: ['dropdown'],

  watch: {
    'dropdown.placement': {
      immediate: true,
      handler(val) {
        this.currentPlacement = val;
      }
    }
  },
  created() {
    this.$on('updatePopper', () => {
      if (this.showPopper) this.updatePopper();
    });
    this.$on('visible', (val) => {
      this.showPopper = val;
    });
  },
  mounted() {
    this.dropdown.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.dropdown.$el;
    // compatible with 2.6 new v-slot syntax
    // issue link https://github.com/ElemeFE/element/issues/14345
    this.dropdown.initDomOperation();
  },
};
</script>
