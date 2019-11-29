<template>
  <button
    :disabled="buttonDisabled"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      cfg.prefix + '-button',
      buttonSize ? cfg.prefix + '-button' + '--' + buttonSize : '',
      type ? cfg.prefix + '-button' + '--' + type : '',
      {
        'is-disabled': buttonDisabled,
      }
    ]"
    @click="handleClick"
  >
    <i v-if="icon" :class="[cfg.prefix + '-icon', icon]"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    disabled: Boolean,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    autofocus: Boolean,
  },
  computed: {
    buttonSize() {
      return this.size;
    },
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
}
</script>
