<template>
  <label
    :id="id"
    :class="[
      cfg.prefix + '-checkbox',
      border && checkboxSize ? cfg.prefix + '-checkbox--' + checkboxSize : '',
      { 'is-disabled': isDisabled },
      { 'is-bordered': border },
      { 'is-checked': isChecked }
    ]"
  >
    <span
      :class="[
        cfg.prefix + '-checkbox__input',
        { 'is-disabled': isDisabled },
        { 'is-checked': isChecked },
        { 'is-indeterminate': indeterminate },
        { 'is-focus': focus }
      ]"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span :class="[`${cfg.prefix}-checkbox__inner`]"></span>
      <input
        v-if="trueLabel || falseLabel"
        v-model="model"
        :class="[`${cfg.prefix}-checkbox__original`]"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :name="name"
        :disabled="isDisabled"
        :true-value="trueLabel"
        :false-value="falseLabel"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
      <input
        v-else
        v-model="model"
        :class="[`${cfg.prefix}-checkbox__original`]"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      >
    </span>
    <span v-if="$slots.default || label" :class="[`${cfg.prefix}-checkbox__label`]">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>
<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'Checkbox',

  mixins: [Emitter],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  componentName: 'Checkbox',

  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    label: [String, Object],
    indeterminate: Boolean,
    disabled: Boolean,
    checked: Boolean,
    name: String,
    trueLabel: [String, Number],
    falseLabel: [String, Number],
    id: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
    controls: String, /* 当indeterminate为真时，为controls提供相关连的checkbox的id，表明元素间的控制关系 */
    border: Boolean,
    size: String
  },

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false
    };
  },

  computed: {
    model: {
      get() {
        if (this.isGroup) {
          return this.store;
        } else if (this.value !== undefined) {
          return this.value;
        } else {
          return this.selfModel;
        }
      },

      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          (this._checkboxGroup.min !== undefined
              && val.length < this._checkboxGroup.min
              && (this.isLimitExceeded = true));

          (this._checkboxGroup.max !== undefined
              && val.length > this._checkboxGroup.max
              && (this.isLimitExceeded = true));

          this.isLimitExceeded === false
            && this.dispatch('CheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked() {
      if ({}.toString.call(this.model) === '[object Boolean]') {
        return this.model;
      } else if (Array.isArray(this.model)) {
        return this.model.indexOf(this.label) > -1;
      } else if (this.model !== null && this.model !== undefined) {
        return this.model === this.trueLabel;
      }
      return false;
    },

    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== 'CheckboxGroup') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },

    store() {
      return this._checkboxGroup ? this._checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this._checkboxGroup;
      return !!(max || min)
          && (this.model.length >= max && !this.isChecked)
          || (this.model.length <= min && this.isChecked);
    },

    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled || (this.elForm || {}).disabled || this.isLimitDisabled
        : this.disabled || (this.elForm || {}).disabled;
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    checkboxSize() {
      const temCheckboxSize = this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
      return this.isGroup
        ? this._checkboxGroup.checkboxGroupSize || temCheckboxSize
        : temCheckboxSize;
    }
  },

  watch: {
    value(value) {
      this.dispatch('FormItem', 'form.change', value);
    }
  },

  created() {
    this.checked && this.addToStore();
  },
  mounted() { // 为indeterminate元素 添加aria-controls 属性
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }
  },

  methods: {
    addToStore() {
      if (
        Array.isArray(this.model)
          && this.model.indexOf(this.label) === -1
      ) {
        this.model.push(this.label);
      } else {
        this.model = this.trueLabel || true;
      }
    },
    handleChange(ev) {
      if (this.isLimitExceeded) return;
      let value;
      if (ev.target.checked) {
        value = this.trueLabel === undefined ? true : this.trueLabel;
      } else {
        value = this.falseLabel === undefined ? false : this.falseLabel;
      }
      this.$emit('change', value, ev);
      this.$nextTick(() => {
        if (this.isGroup) {
          this.dispatch('CheckboxGroup', 'change', [this._checkboxGroup.value]);
        }
      });
    }
  }
};
</script>
