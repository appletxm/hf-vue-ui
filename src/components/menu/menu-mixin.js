export default {
  inject: ['rootMenu'],
  computed: {
    indexPath() {
      const path = [this.index];
      let parent = this.$parent;
      while (parent.$options.componentName !== 'Menu') {
        if (parent.index) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    parentMenu() {
      let parent = this.$parent;
      while (parent && ['Menu', 'Submenu'].indexOf(parent.$options.componentName) === -1) {
        parent = parent.$parent;
      }
      return parent;
    },
    paddingStyle() {
      if (this.rootMenu.mode !== 'vertical' || this.rootMenu.type === 'popup') return {};

      let padding = 24;
      let parent = this.$parent;

      if (parent.$options.componentName === 'Menu') return {};

      if (this.rootMenu.collapse) {
        padding = 24;
      } else {
        while (parent && parent.$options.componentName !== 'Menu') {
          if (parent.$parent.$options.componentName === 'Menu' && parent.$options.componentName === 'Submenu') {
            padding += 32;
          } else if (parent.$options.componentName === 'Submenu') {
            padding += 14;
          }
          parent = parent.$parent;
        }
      }
      return { paddingLeft: padding + 'px' };
    }
  }
};
