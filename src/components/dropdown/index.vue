<script>
import Clickoutside from '../../utils/clickoutside';
import Emitter from '../../mixins/emitter';
import Migrating from '../../mixins/migrating';
import UiButton from '../button';
import ButtonGroup from '../button-group';
import { generateId } from '../../utils/util';

export default {
  name: 'Dropdown',

  componentName: 'Dropdown',

  directives: { Clickoutside },

  components: {
    UiButton,
    ButtonGroup
  },

  mixins: [Emitter, Migrating],

  provide() {
    return {
      dropdown: this
    };
  },

  props: {
    trigger: {
      type: String,
      default: 'hover'
    },
    type: String,
    size: {
      type: String,
      default: ''
    },
    splitButton: Boolean,
    hideOnClick: {
      type: Boolean,
      default: true
    },
    placement: {
      type: String,
      default: 'bottom-end'
    },
    visibleArrow: {
      type: Boolean,
      default: false
    },
    showTimeout: {
      type: Number,
      default: 250
    },
    hideTimeout: {
      type: Number,
      default: 150
    },
    tabindex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      timeout: null,
      visible: false,
      triggerElm: null,
      menuItems: null,
      menuItemsArray: null,
      dropdownElm: null,
      focusing: false,
      listId: `dropdown-menu-${generateId()}`,
      openIcon: '',
    };
  },

  computed: {
    dropdownSize() {
      return this.size || (this.$ELEMENT || {}).size;
    }
  },

  watch: {
    visible(val) {
      this.broadcast('DropdownMenu', 'visible', val);
      this.$emit('visible-change', val);
    },
    focusing(val) {
      const selfDefine = this.$el.querySelector(`.${this.cfg.prefix}-dropdown-selfdefine`);
      if (selfDefine) { // 自定义
        if (val) {
          selfDefine.className += ' focusing';
        } else {
          selfDefine.className = selfDefine.className.replace('focusing', '');
        }
      }
    }
  },

  mounted() {
    this.$on('menu-item-click', this.handleMenuItemClick);
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'menu-align': 'menu-align is renamed to placement.'
        }
      };
    },
    show() {
      if (this.triggerElm.disabled) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.triggerElm) {
          // 展开状态增加样式
          this.triggerElm.parentNode.classList.add('is-expand');
        }
        this.visible = true;
      }, this.trigger === 'click' ? 0 : this.showTimeout);
    },
    hide() {
      if (this.triggerElm.disabled) return;
      this.removeTabindex();
      if (this.tabindex >= 0) {
        this.resetTabindex(this.triggerElm);
      }
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if (this.triggerElm) {
          this.triggerElm.parentNode.classList.remove('is-expand');
        }
        this.visible = false;
      }, this.trigger === 'click' ? 0 : this.hideTimeout);
    },
    handleClick() {
      if (this.triggerElm.disabled) return;
      if (this.visible) {
        this.hide();
      } else {
        this.show();
      }
    },
    handleTriggerKeyDown(ev) {
      const keyCode = ev.keyCode;
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        this.removeTabindex();
        this.resetTabindex(this.menuItems[0]);
        this.menuItems[0].focus();
        ev.preventDefault();
        ev.stopPropagation();
      } else if (keyCode === 13) { // space enter选中
        this.handleClick();
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab || esc
        this.hide();
      }
    },
    handleItemKeyDown(ev) {
      const keyCode = ev.keyCode;
      const target = ev.target;
      const currentIndex = this.menuItemsArray.indexOf(target);
      const max = this.menuItemsArray.length - 1;
      let nextIndex;
      if ([38, 40].indexOf(keyCode) > -1) { // up/down
        if (keyCode === 38) { // up
          nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
        } else { // down
          nextIndex = currentIndex < max ? currentIndex + 1 : max;
        }
        this.removeTabindex();
        this.resetTabindex(this.menuItems[nextIndex]);
        this.menuItems[nextIndex].focus();
        ev.preventDefault();
        ev.stopPropagation();
      } else if (keyCode === 13) { // enter选中
        this.triggerElmFocus();
        target.click();
        if (this.hideOnClick) { // click关闭
          this.visible = false;
        }
      } else if ([9, 27].indexOf(keyCode) > -1) { // tab // esc
        this.hide();
        this.triggerElmFocus();
      }
    },
    resetTabindex(ele) { // 下次tab时组件聚焦元素
      this.removeTabindex();
      ele.setAttribute('tabindex', '0'); // 下次期望的聚焦元素
    },
    removeTabindex() {
      this.triggerElm.setAttribute('tabindex', '-1');
      this.menuItemsArray.forEach((item) => {
        item.setAttribute('tabindex', '-1');
      });
    },
    initAria() {
      this.dropdownElm.setAttribute('id', this.listId);
      this.triggerElm.setAttribute('aria-haspopup', 'list');
      this.triggerElm.setAttribute('aria-controls', this.listId);

      if (!this.splitButton) { // 自定义
        this.triggerElm.setAttribute('role', 'button');
        this.triggerElm.setAttribute('tabindex', this.tabindex);
        this.triggerElm.setAttribute('class', (this.triggerElm.getAttribute('class') || '') + ` ${this.cfg.prefix}-dropdown-selfdefine`); // 控制
      }
    },
    initEvent() {
      const { trigger, show, hide, handleClick, splitButton, handleTriggerKeyDown, handleItemKeyDown } = this;
      this.triggerElm = splitButton
        ? this.$refs.trigger.$el
        : this.$slots.default[0].elm;

      const dropdownElm = this.dropdownElm;
      this.triggerElm.addEventListener('keydown', handleTriggerKeyDown); // triggerElm keydown
      dropdownElm.addEventListener('keydown', handleItemKeyDown, true); // item keydown
      // 控制自定义元素的样式
      if (!splitButton) {
        this.triggerElm.addEventListener('focus', () => {
          this.focusing = true;
        });
        this.triggerElm.addEventListener('blur', () => {
          this.focusing = false;
        });
        this.triggerElm.addEventListener('click', () => {
          this.focusing = false;
        });
      }
      if (trigger === 'hover') {
        this.triggerElm.addEventListener('mouseenter', show);
        this.triggerElm.addEventListener('mouseleave', hide);
        dropdownElm.addEventListener('mouseenter', show);
        dropdownElm.addEventListener('mouseleave', hide);
      } else if (trigger === 'click') {
        this.triggerElm.addEventListener('click', handleClick);
      }
    },
    handleMenuItemClick(command, instance) {
      if (this.hideOnClick) {
        this.visible = false;
      }
      this.$emit('command', command, instance);
    },
    triggerElmFocus() {
      this.triggerElm.focus && this.triggerElm.focus();
    },
    initDomOperation() {
      this.dropdownElm = this.popperElm;
      this.menuItems = this.dropdownElm.querySelectorAll("[tabindex='-1']");
      this.menuItemsArray = [].slice.call(this.menuItems);

      this.initEvent();
      this.initAria();
    }
  },

  render() {
    const { hide, splitButton, type, dropdownSize } = this;

    const handleMainButtonClick = (event) => {
      this.$emit('click', event);
      hide();
    };
    const triggerElm = !splitButton
      ? this.$slots.default
      : (<button-group>
        <ui-button type={type} size={dropdownSize} nativeOn-click={handleMainButtonClick}>
          {this.$slots.default}
        </ui-button>
        <ui-button ref="trigger" type={type} size={dropdownSize} class={`${this.cfg.prefix}-dropdown__caret-button`}>
          <i class={`${this.cfg.prefix}-icon ${this.cfg.prefix}-dropdown__icon ui-icon-line-direction-down`}></i>
        </ui-button>
      </button-group>);
    return (
      <div class={`${this.cfg.prefix}-dropdown`} v-clickoutside={hide}>
        {triggerElm}
        {this.$slots.dropdown}
      </div>
    );
  }
};
</script>
