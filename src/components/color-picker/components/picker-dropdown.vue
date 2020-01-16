<template>
  <transition :name="cfg.prefix + '-zoom-in-top'" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      :class="[cfg.prefix + '-color-dropdown', popperClass]"
    >
      <div :class="cfg.prefix + '-color-dropdown__main-wrapper'">
        <hue-slider ref="hue" :color="color" vertical style="float: right;"></hue-slider>
        <sv-panel ref="sl" :color="color"></sv-panel>
      </div>
      <alpha-slider v-if="showAlpha" ref="alpha" :color="color"></alpha-slider>
      <predefine v-if="predefine" :color="color" :colors="predefine"></predefine>
      <div :class="cfg.prefix + '-color-dropdown__btns'">
        <span :class="cfg.prefix + '-color-dropdown__value'">
          <hf-ui-input
            v-model="customInput"
            :validate-event="false"
            size="mini"
            @keyup.native.enter="handleConfirm"
            @blur="handleConfirm"
          >
          </hf-ui-input>
        </span>
        <hf-ui-button
          size="mini"
          type="text"
          :class="cfg.prefix + '-color-dropdown__link-btn'"
          @click="$emit('clear')"
        >
          {{ t('el.colorpicker.clear') }}
        </hf-ui-button>
        <hf-ui-button
          plain
          size="mini"
          :class="cfg.prefix + '-color-dropdown__btn'"
          @click="confirmValue"
        >
          {{ t('el.colorpicker.confirm') }}
        </hf-ui-button>
      </div>
    </div>
  </transition>
</template>

<script>
import SvPanel from './sv-panel';
import HueSlider from './hue-slider';
import AlphaSlider from './alpha-slider';
import Predefine from './predefine';
import Popper from '../../../utils/vue-popper';
import Locale from '../../../mixins/locale';
import HfUiInput from '../../input';
import HfUiButton from '../../button';

export default {
  name: 'ColorPickerDropdown',

  components: {
    SvPanel,
    HueSlider,
    AlphaSlider,
    HfUiInput,
    HfUiButton,
    Predefine
  },

  mixins: [Popper, Locale],

  props: {
    color: {
      type: Object,
      default: () => ({}),
      required: true
    },
    popperClass: {
      type: String,
      default: ''
    },
    showAlpha: Boolean,
    predefine: Array
  },

  data() {
    return {
      customInput: ''
    };
  },

  computed: {
    currentColor() {
      const parent = this.$parent;
      return !parent.value && !parent.showPanelColor ? '' : parent.color.value;
    }
  },

  watch: {
    showPopper(val) {
      if (val === true) {
        this.$nextTick(() => {
          const { sl, hue, alpha } = this.$refs;
          sl && sl.update();
          hue && hue.update();
          alpha && alpha.update();
        });
      }
    },

    currentColor: {
      immediate: true,
      handler(val) {
        this.customInput = val;
      }
    }
  },

  mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.referenceElm = this.$parent.$el;
  },

  methods: {
    confirmValue() {
      this.$emit('pick');
    },

    handleConfirm() {
      this.color.fromString(this.customInput);
    }
  }
};
</script>
