<template>
  <div :class="[
         type === 'textarea' ? `${cfg.prefix}-textarea` : `${cfg.prefix}-input`,
         inputSize ? `${cfg.prefix}-input--${inputSize}` : '',
         {
           'is-disabled': inputDisabled,
           'is-exceed': inputExceed,
           'is-error': error,
           [`${cfg.prefix}-input-group`]: $slots.prepend || $slots.append,
           [`${cfg.prefix}-input-group--append`]: $slots.append,
           [`${cfg.prefix}-input-group--prepend`]: $slots.prepend,
           [`${cfg.prefix}-input--prefix`]: $slots.prefix || prefixIcon,
           [`${cfg.prefix}-input--suffix`]: $slots.suffix || suffixIcon || clearable || showPassword
         }
       ]"
       :style="{width: `${inputWidth}px`}"
       @mouseenter="hovering = true"
       @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" :class="[`${cfg.prefix}-input-group__prepend`]">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        ref="input"
        :tabindex="tabindex"
        :class="[`${cfg.prefix}-input__inner`]"
        v-bind="$attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : type"
        :disabled="inputDisabled"
        :readonly="readonly"
        :autocomplete="autoComplete || autocomplete"
        :aria-label="label"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
      >
      <!-- 前置内容 -->
      <span v-if="$slots.prefix || prefixIcon" :class="[`${cfg.prefix}-input__prefix`]">
        <slot name="prefix"></slot>
        <i v-if="prefixIcon"
           :class="[`${cfg.prefix}-input__icon`, `${cfg.prefix}-icon`, prefixIcon]"
        >
        </i>
      </span>
      <!-- 后置内容 -->
      <span
        v-if="getSuffixVisible()"
        ref="input__suffix"
        :class="[`${cfg.prefix}-input__suffix`]"
      >
        <span :class="[`${cfg.prefix}-input__suffix-inner`]">
          <template v-if="!showClear || !showPwdVisible || !isWordLimitVisible">
            <slot name="suffix"></slot>
            <i v-if="suffixIcon"
               :class="[`${cfg.prefix}-input__icon`, `${cfg.prefix}-icon`, suffixIcon]"
            >
            </i>
          </template>
          <i v-if="showClear"
             :class="[`${cfg.prefix}-input__icon ${cfg.prefix}-icon ui-icon-line-currency-failure ${cfg.prefix}-input__clear`]"
             @mousedown.prevent
             @click="clear"
          ></i>
          <i v-if="showPwdVisible"
             :class="[`${cfg.prefix}-input__icon ${cfg.prefix}-icon ${passwordIcon} ${cfg.prefix}-input__clear`]"
             @click="handlePasswordVisible"
          ></i>
          <span v-if="isWordLimitVisible" :class="[`${cfg.prefix}-input__count`]">
            <span :class="[`${cfg.prefix}-input__count-inner`]">
              {{ textLength }}/{{ upperLimit }}
            </span>
          </span>
          <span v-if="isWordVisible" :class="[`${cfg.prefix}-input__count`]">
            <span :class="[`${cfg.prefix}-input__count-inner`]">
              {{ textLength }}个字
            </span>
          </span>
        </span>
        <!-- <i v-if="validateState"
           :class="[`${cfg.prefix}-input__icon`,`${cfg.prefix}-input__validateIcon`, validateIcon]"
        ></i> -->
      </span>
      <!-- 后置元素 -->
      <div v-if="$slots.append" :class="[`${cfg.prefix}-input-group__append`]">
        <slot name="append"></slot>
      </div>
      <!-- 校验状态图标 -->
      <div v-if="validateState" :class="[`${cfg.prefix}-input__validateIcon`]">
        <i v-if="validateState !== 'validating'"
           :class="[`${cfg.prefix}-input__icon`, validateIcon]"
        ></i>
        <div v-if="validateState === 'validating'" v-loading="true"></div>
      </div>
      <!-- 错误提示 -->
      <div v-if="error && errorMsg" :class="[`${cfg.prefix}-input__error`]">
        {{ errorMsg }}
      </div>
    </template>
    <textarea
      v-else
      ref="textarea"
      :tabindex="tabindex"
      :class="[`${cfg.prefix}-textarea__inner`]"
      v-bind="$attrs"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autoComplete || autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >
    </textarea>
    <span v-if="isWordLimitVisible && type === 'textarea'" :class="[`${cfg.prefix}-input__count`]">{{ textLength }}/{{ upperLimit }}个字</span>
    <span v-if="isWordVisible && type === 'textarea'" :class="[`${cfg.prefix}-input__count`]">{{ textLength }}个字</span>
  </div>
</template>
<script>
import emitter from '../../mixins/emitter';
import Migrating from '../../mixins/migrating';
import merge from '../../utils/merge';
import { isKorean } from '../../utils/shared';
import calcTextareaHeight from './calcTextareaHeight';

export default {
  name: 'Input',

  componentName: 'Input',

  mixins: [emitter, Migrating],

  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  props: {
    value: [String, Number],
    size: String,
    resize: String,
    form: String,
    disabled: Boolean,
    readonly: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    autosize: {
      type: [Boolean, Object],
      default: false
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator() {
        process.env.NODE_ENV !== 'production'
        && console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    showWord: {
      type: Boolean,
      default: false
    },
    tabindex: String,
    error: Boolean,
    errorMsg: String,
    width: [String, Number],
    height: [String, Number],
    showPhone: {
      type: Boolean,
      default: false
    },
    showTelephone: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      textareaCalcStyle: {},
      hovering: false,
      focused: false,
      isComposing: false,
      passwordVisible: false,
      inputWidth: this.width,
      passwordIcon: 'ui-icon-line-currency-hide',
      inputEventType: ''
    };
  },

  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    validateState() {
      return this.elFormItem ? this.elFormItem.validateState : '';
    },
    needStatusIcon() {
      return this.elForm ? this.elForm.statusIcon : false;
    },
    validateIcon() {
      return {
        validating: 'ui-icon-line-currency-loading',
        success: 'ui-icon-line-currency-success',
        error: 'ui-icon-line-currency-failure'
      }[this.validateState];
    },
    textareaStyle() {
      return merge({}, this.textareaCalcStyle, { resize: this.resize });
    },
    inputSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },
    inputDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    nativeInputValue() {
      let valueT = '';
      if (this.value === null || this.value === undefined) {
        valueT = '';
      } else {
        valueT = String(this.value);
        this.inputEventType = this.inputEventType ? this.inputEventType : '';
        if (this.showPhone && valueT && this.inputEventType.indexOf('deleteContent') === -1) {
          valueT = valueT.replace(/\s+/g, '').replace(/\D+/g, '').substring(0, 11);
          if (valueT.length >= 3 && valueT.length < 7) {
            valueT = valueT.replace(/^(.{3})?(.*)?$/, '$1 $2');
          } else if (valueT.length >= 7) {
            valueT = valueT.replace(/^(.{3})?(.{4})?(.*)?$/, '$1 $2 $3');
          }
        } else if (this.showTelephone && valueT && this.inputEventType.indexOf('deleteContent') === -1) {
          valueT = valueT.replace(/\s+/g, '');
          if (valueT.length >= 4) {
            valueT = valueT.replace(/^(.{4})?(.*)?$/, '$1 $2');
          }
        }
      }
      return valueT;
    },
    showClear() {
      return this.clearable
      && !this.inputDisabled
      && !this.readonly
      && this.nativeInputValue
      && (this.focused || this.hovering);
    },
    showPwdVisible() {
      return this.showPassword
      && !this.inputDisabled
      && !this.readonly
      && (!!this.nativeInputValue || this.focused);
    },
    isWordVisible() {
      return this.showWord
      && this.type === 'textarea'
      && !this.inputDisabled
      && !this.readonly
      && !this.showPassword
      && !this.showPhone
      && !this.showTelePhone;
    },
    isWordLimitVisible() {
      return this.showWordLimit
      && this.$attrs.maxlength
      && (this.type === 'text' || this.type === 'textarea')
      && !this.inputDisabled
      && !this.readonly
      && !this.showPassword
      && !this.showPhone
      && !this.showTelePhone;
    },
    upperLimit() {
      return this.$attrs.maxlength;
    },
    textLength() {
      const ele = this.$refs.input__suffix;
      const eleInput = this.$refs.input;
      if (ele && ele.clientWidth && eleInput) {
        eleInput.style.paddingRight = `${ele.clientWidth}px`;
      }
      if (typeof this.value === 'number') {
        return String(this.value).length;
      }
      return (this.value || '').length;
    },
    inputExceed() {
      // show exceed style if length of initial value greater then maxlength
      return this.isWordLimitVisible
      && (this.textLength > this.upperLimit);
    }
  },

  watch: {
    value(val) {
      this.$nextTick(this.resizeTextarea);
      if (this.validateEvent) {
        this.dispatch('FormItem', 'form.change', [val]);
      }
    },
    nativeInputValue() {
      this.setNativeInputValue();
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
        this.resizeTextarea();
        this.updateIconOffset();
      });
    }
  },

  created() {
    this.$on('inputSelect', this.select);
  },

  mounted() {
    this.setNativeInputValue();
    this.resizeTextarea();
    this.updateIconOffset();
    this.calcStyle();
  },

  updated() {
    this.$nextTick(this.updateIconOffset);
  },

  methods: {
    focus() {
      this.getInput().focus();
    },
    blur() {
      this.getInput().blur();
    },
    getMigratingConfig() {
      return {
        props: {
          icon: 'icon is removed, use suffix-icon / prefix-icon instead.',
          'on-icon-click': 'on-icon-click is removed.'
        },
        events: {
          click: 'click is removed.'
        }
      };
    },
    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('FormItem', 'form.blur', [this.value]);
      }
    },
    select() {
      this.getInput().select();
    },
    resizeTextarea() {
      if (this.$isServer) return;
      const { autosize, type } = this;
      if (type !== 'textarea') return;
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        };
        if (this.height) {
          this.textareaCalcStyle.height = `${this.height}px`;
        }
        return;
      }
      const minRows = autosize.minRows;
      const maxRows = autosize.maxRows;

      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows);
      if (this.textareaCalcStyle.height && this.height) {
        if (parseInt(this.textareaCalcStyle.height, 10) < parseInt(this.height, 10)) {
          this.textareaCalcStyle.height = `${this.height}px`;
        }
      }
    },
    setNativeInputValue() {
      const input = this.getInput();
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },
    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },
    handleCompositionStart() {
      this.isComposing = true;
    },
    handleCompositionUpdate(event) {
      const text = event.target.value;
      const lastCharacter = text[text.length - 1] || '';
      this.isComposing = !isKorean(lastCharacter);
    },
    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },
    handleInput(event) {
      this.inputEventType = event.inputType;
      if (this.isComposing) return;

      if (event.target.value === this.nativeInputValue) return;

      this.$emit('input', event.target.value);

      this.$nextTick(this.setNativeInputValue);
    },
    handleChange(event) {
      this.inputEventType = event.inputType;
      this.$emit('change', event.target.value);
    },
    calcIconOffset(place) {
      const elList = [].slice.call(this.$el.querySelectorAll(`.${this.cfg.prefix}-input__${place}`) || []);
      if (!elList.length) return;
      let el = null;
      for (let i = 0; i < elList.length; i++) {
        if (elList[i].parentNode === this.$el) {
          el = elList[i];
          break;
        }
      }
      if (!el) return;
      const pendantMap = {
        suffix: 'append',
        prefix: 'prepend'
      };

      const pendant = pendantMap[place];
      if (this.$slots[pendant]) {
        el.style.transform = `translateX(${place === 'suffix' ? '-' : ''}${this.$el.querySelector(`.${this.cfg.prefix}-input-group__${pendant}`).offsetWidth}px)`;
      } else {
        el.removeAttribute('style');
      }
    },
    updateIconOffset() {
      this.calcIconOffset('prefix');
      this.calcIconOffset('suffix');
    },
    clear() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    },
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      if (this.passwordVisible) {
        this.passwordIcon = 'ui-icon-line-currency-display';
      } else {
        this.passwordIcon = 'ui-icon-line-currency-hide';
      }
      this.focus();
    },
    getInput() {
      return this.$refs.input || this.$refs.textarea;
    },
    getSuffixVisible() {
      // ${cfg.prefix}-input__suffix
      return this.$slots.suffix
      || this.suffixIcon
      || this.showClear
      || this.showPassword
      || this.isWordLimitVisible;
      // || (this.validateState && this.needStatusIcon);
    },
    calcStyle() {
      const eleInput = this.$refs.input;
      // 有字数限制时input的padding-right
      const ele = this.$refs.input__suffix;
      if (ele && ele.clientWidth && eleInput) {
        eleInput.style.paddingRight = `${ele.offsetWidth}px`;
      }
      // 有前缀后缀时，并且有默认宽度时，input的宽度
      if (eleInput && this.width && (this.$slots.prepend || this.$slots.append)) {
        let w = parseInt(this.width, 10);
        if (eleInput.previousElementSibling && eleInput.previousElementSibling.classList.contains(`${this.cfg.prefix}-input-group__prepend`)) {
          w = w + eleInput.previousElementSibling.offsetWidth;
        }
        if (eleInput.nextElementSibling && eleInput.nextElementSibling.classList.contains(`${this.cfg.prefix}-input-group__append`)) {
          w = w + eleInput.nextElementSibling.offsetWidth;
        }
        this.inputWidth = w;
      }
    }
  },

};
</script>
