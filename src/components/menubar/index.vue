<template>
  <div :class="[
         cfg.prefix + '-menubar',
         cfg.prefix + '-menubar--'+ mode,
         collapse ? cfg.prefix + '-menubar--collapse' : ''
       ]"
       :style="{'min-width': minWidthC, 'max-width': maxWidth + 'px', 'width': width + 'px'}"
  >
    <div v-if="mode === 'horizontal'" :class="[cfg.prefix + '-menubar__wrap']" :style="{'width': contentWidth ? contentWidth +'px' : contentWidth}">
      <slot v-if="$slots.logo" name="logo"></slot>
      <template v-else>
        <div v-if="logoSrc" :class="[cfg.prefix + '-menubar__logo']">
          <a :class="[cfg.prefix + '-menubar__logo--a']" target="_blank">
            <img :class="[cfg.prefix + '-menubar__logo--img']" :src="logoSrc">
          </a>
        </div>
      </template>
      <div :class="[cfg.prefix + '-menubar__right']">
        <slot></slot>
        <slot v-if="$slots.userinfo" name="userinfo"></slot>
        <template v-else>
          <div :class="[cfg.prefix + '-menubar__right--userinfo']">
            <img :src="avatarSrc" :class="[cfg.prefix + '-menubar__right--userinfo--avatar']">
            <slot name="usermenu"></slot>
          </div>
        </template>
      </div>
    </div>
    <div v-else :class="[cfg.prefix + '-menubar__wrap']">
      <div :class="[cfg.prefix + '-menubar__wrap--menus']" ignore-scroll="true">
        <slot></slot>
      </div>
      <slot v-if="$slots.collapseIcon" name="collapseIcon"></slot>
      <template v-else>
        <div :class="[cfg.prefix + '-menubar__wrap--foldicon']" @click="setCollapse">
          <i :class="[cfg.prefix + '-icon', collapse ? collapseOpenIcon : collapseCloseIcon]"></i>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menubar',
  componentName: 'Menubar',
  props: {
    logoSrc: String,
    avatarSrc: String,
    contentWidth: [String, Number],
    minWidth: [String, Number],
    maxWidth: [String, Number],
    width: [String, Number],
    mode: {
      type: String,
      default: 'horizontal'
    },
    collapse: {
      type: Boolean,
      default: false
    },
    collapseOpenIcon: {
      type: String,
      default: 'ui-icon-line-currency-expand',
    },
    collapseCloseIcon: {
      type: String,
      default: 'ui-icon-line-currency-collapse',
    }
  },
  computed: {
    minWidthC() {
      let minWidthVal;
      if (this.minWidth) {
        minWidthVal = `${this.minWidth}px`;
      } else {
        minWidthVal = this.contentWidth ? `${parseInt(this.contentWidth, 10) + 48}px` : '';
      }
      return minWidthVal;
    },
  },
  methods: {
    setCollapse() {
      this.$emit('toggleCollapse');
    },
  }
};
</script>
