<template>
  <div
    v-clickoutside="hide"
    :class="[
      cfg.prefix + '-color-picker',
      colorDisabled ? 'is-disabled' : '',
      colorSize ? `${cfg.prefix}-color-picker--${ colorSize }` : ''
    ]"
  >
    <div v-if="colorDisabled" :class="cfg.prefix + '-color-picker__mask'"></div>
    <div :class="cfg.prefix + '-color-picker__trigger'" @click="handleTrigger">
      <span :class="[cfg.prefix + '-color-picker__color', showAlpha ? 'is-alpha' : '']">
        <span :class="cfg.prefix + '-color-picker__color-inner'"
              :style="{
                backgroundColor: displayedColor
              }"
        ></span>
        <span v-if="!value && !showPanelColor" :class="cfg.prefix + '-color-picker__empty ui-icon-line-currency-close'"></span>
      </span>
      <span v-show="value || showPanelColor" :class="cfg.prefix + '-color-picker__icon ui-icon-line-direction-down'"></span>
    </div>
    <picker-dropdown
      ref="dropdown"
      v-model="showPicker"
      :popper-class="popperClass"
      :color="color"
      :show-alpha="showAlpha"
      :predefine="predefine"
      @pick="confirmValue"
      @clear="clearValue"
    >
    </picker-dropdown>
  </div>
</template>

<script>
import Color from './color';
import PickerDropdown from './components/picker-dropdown.vue';
import Clickoutside from '../../utils/clickoutside';
import Emitter from '../../mixins/emitter';

export default {
  name: 'ColorPicker',

  directives: { Clickoutside },

  components: {
    PickerDropdown
  },

  mixins: [Emitter],

  props: {
    value: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    size: String,
    popperClass: String,
    predefine: Array
  },

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },

  data() {
    const color = new Color({
      enableAlpha: this.showAlpha,
      format: this.colorFormat
    });

    return {
      color,
      showPicker: false,
      showPanelColor: false
    };
  },

  computed: {
    displayedColor() {
      if (!this.value && !this.showPanelColor) {
        return 'transparent';
      }

      return this.displayedRgb(this.color, this.showAlpha);
    },

    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },

    colorSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    colorDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    }
  },

  watch: {
    value(val) {
      if (!val) {
        this.showPanelColor = false;
      } else if (val && val !== this.color.value) {
        this.color.fromString(val);
      }
    },
    color: {
      deep: true,
      handler() {
        this.showPanelColor = true;
      }
    },
    displayedColor(val) {
      if (!this.showPicker) return;
      const currentValueColor = new Color({
        enableAlpha: this.showAlpha,
        format: this.colorFormat
      });
      currentValueColor.fromString(this.value);

      const currentValueColorRgb = this.displayedRgb(currentValueColor, this.showAlpha);
      if (val !== currentValueColorRgb) {
        this.$emit('active-change', val);
      }
    }
  },

  mounted() {
    const value = this.value;
    if (value) {
      this.color.fromString(value);
    }
    this.popperElm = this.$refs.dropdown.$el;
  },

  methods: {
    handleTrigger() {
      if (this.colorDisabled) return;
      this.showPicker = !this.showPicker;
    },
    confirmValue() {
      const value = this.color.value;
      this.$emit('input', value);
      this.$emit('change', value);
      this.dispatch('FormItem', 'form.change', value);
      this.showPicker = false;
    },
    clearValue() {
      this.$emit('input', null);
      this.$emit('change', null);
      if (this.value !== null) {
        this.dispatch('FormItem', 'form.change', null);
      }
      this.showPanelColor = false;
      this.showPicker = false;
      this.resetColor();
    },
    hide() {
      this.showPicker = false;
      this.resetColor();
    },
    resetColor() {
      this.$nextTick(() => {
        if (this.value) {
          this.color.fromString(this.value);
        } else {
          this.showPanelColor = false;
        }
      });
    },
    displayedRgb(color, showAlpha) {
      if (!(color instanceof Color)) {
        throw Error('color should be instance of Color Class');
      }

      const { r, g, b } = color.toRgb();
      return showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
        : `rgb(${r}, ${g}, ${b})`;
    }
  }
};
</script>
