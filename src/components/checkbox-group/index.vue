<template>
  <div :class="[cfg.prefix + '-button-group']">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'CheckboxGroup',
  componentName: 'CheckboxGroup',

  mixins: [Emitter],

  inject: {
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    disabled: Boolean,
    min: Number,
    max: Number,
    size: String,
    fill: String,
    textColor: String
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    checkboxGroupSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    value(value) {
      this.dispatch('FormItem', 'form.change', [value]);
    }
  }
};
</script>
