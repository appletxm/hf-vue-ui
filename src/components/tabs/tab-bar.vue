<template>
  <div v-if="rootTabs.type === 'ellipse'" :class="`${cfg.prefix}-tabs__active-circle is-${ rootTabs.tabPosition }`" :style="barStyle"></div>
  <div v-else :class="`${cfg.prefix}-tabs__active-bar is-${ rootTabs.tabPosition }`" :style="barStyle"></div>
</template>
<script>
import { arrayFind } from '../../utils/util';

export default {
  name: 'TabBar',

  props: {
    tabs: Array
  },

  inject: ['rootTabs'],
  data() {
    return {
      barStyle2: {},
    };
  },
  computed: {
    barStyle: {
      get() {
        const style = {};
        let offset = 0;
        let tabSize = 0;
        const sizeName = ['top', 'bottom'].indexOf(this.rootTabs.tabPosition) !== -1 ? 'width' : 'height';
        const sizeDir = sizeName === 'width' ? 'x' : 'y';
        const firstUpperCase = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
        this.tabs.every((tab) => {
          const $el = arrayFind(this.$parent.$refs.tabs || [], (t) => t.id.replace('tab-', '') === tab.paneName);
          if (!$el) { return false; }
          const tabStyles = window.getComputedStyle($el);
          if (!tab.active) {
            offset += $el[`client${firstUpperCase(sizeName)}`];
            return true;
          } else {
            if (sizeName === 'height' && this.rootTabs.type === 'ellipse') {
              tabSize = $el.querySelector(`.${this.cfg.prefix}-tabs__item--content`).offsetWidth;
              tabSize += parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
            } else {
              tabSize = $el[`client${firstUpperCase(sizeName)}`];
              if (sizeName === 'width' && this.tabs.length >= 1) {
                if (this.rootTabs.type !== 'ellipse') {
                  tabSize -= parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight);
                }
              }
              if (sizeName === 'width') {
                if (this.rootTabs.type !== 'ellipse') {
                  offset += parseFloat(tabStyles.paddingLeft);
                }
              }
            }
            return false;
          }
        });
        const transform = `translate${firstUpperCase(sizeDir)}(${offset}px)`;
        if (sizeName === 'height' && this.rootTabs.type === 'ellipse') {
          style.width = tabSize + 'px';
        } else {
          style[sizeName] = tabSize + 'px';
        }
        style.transform = transform;
        style.msTransform = transform;
        style.webkitTransform = transform;
        return style;
      }
    },
  }
};
</script>
