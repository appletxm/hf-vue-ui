<script>
import CollapseTransition from '../../transitions/collapse-transition';
import PopTip from '../pop-tip';
import menuMixin from '../menu/menu-mixin';
import Emitter from '../../mixins/emitter';
import Popper from '../../utils/vue-popper';

const poperMixins = {
  props: {
    transformOrigin: {
      type: [Boolean, String],
      default: false
    },
    offset: Popper.props.offset,
    boundariesPadding: Popper.props.boundariesPadding,
    popperOptions: Popper.props.popperOptions
  },
  data: Popper.data,
  methods: Popper.methods,
  beforeDestroy: Popper.beforeDestroy,
  deactivated: Popper.deactivated
};

export default {
  name: 'Submenu',

  componentName: 'Submenu',

  components: { CollapseTransition, PopTip },

  mixins: [menuMixin, Emitter, poperMixins],

  props: {
    index: {
      type: String,
      required: true
    },
    showTimeout: {
      type: Number,
      default: 300
    },
    hideTimeout: {
      type: Number,
      default: 300
    },
    popperClass: String,
    disabled: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: undefined
    },
    popperOptions: {
      type: Object,
      default() {
        return {
          gpuAcceleration: false,
          onUpdate: () => {
            if (this.rootMenu.type === 'popup' && this.rootMenu.isFixSubmenu) {
              this.updateTopEle(this.referenceElm);
            }
          }
        };
      }
    },
    paddingBase: Number,
    paddingStep: Number
  },

  data() {
    return {
      popperJS: null,
      timeout: null,
      items: {},
      submenus: {},
      mouseInChild: false
    };
  },
  computed: {
    // popper option
    appendToBody() {
      return this.popperAppendToBody === undefined
        ? this.isFirstLevel
        : this.popperAppendToBody;
    },
    menuTransitionName() {
      return this.rootMenu.collapse || this.rootMenu.type === 'popup' ? `${this.cfg.prefix}-zoom-in-left` : `${this.cfg.prefix}-zoom-in-top`;
    },
    opened() {
      return this.rootMenu.openedMenus.indexOf(this.index) > -1;
    },
    active() {
      let isActive = false;
      const submenus = this.submenus;
      const items = this.items;
      Object.keys(items).forEach((index) => {
        if (items[index].active) {
          isActive = true;
        }
      });
      Object.keys(submenus).forEach((index) => {
        if (submenus[index].active) {
          isActive = true;
        }
      });
      if (this.opened && this.type === 'popup') {
        isActive = true;
      }
      if (this.type === 'popup') {
        const oldIndexArr = this.rootMenu.activeIndex.split('-');
        const currentIndexArr = this.index.split('-');
        let currentActiveCount = 0;
        for (let i = 0; i < currentIndexArr.length; i++) {
          if (currentIndexArr[i] === oldIndexArr[i]) {
            currentActiveCount++;
          }
        }
        if (currentActiveCount && currentActiveCount === currentIndexArr.length) {
          isActive = true;
        }
      }
      return isActive;
    },
    hoverBackground() {
      return this.rootMenu.hoverBackground;
    },
    backgroundColor() {
      return this.rootMenu.backgroundColor || '';
    },
    activeTextColor() {
      return this.rootMenu.activeTextColor || '';
    },
    textColor() {
      return this.rootMenu.textColor || '';
    },
    mode() {
      return this.rootMenu.mode;
    },
    type() {
      return this.rootMenu.type;
    },
    isMenuPopup() {
      return this.rootMenu.isMenuPopup;
    },
    titleStyle() {
      let borderBottomColor;
      let color = this.textColor;
      if (this.mode !== 'horizontal') {
        return { color };
      }
      if (this.active) {
        borderBottomColor = this.rootMenu.activeTextColor ? this.activeTextColor : '';
        color = this.activeTextColor;
      } else {
        borderBottomColor = 'transparent';
        color = this.textColor;
      }
      return { borderBottomColor, color };
    },
    isFirstLevel() {
      let isFirstLevel = true;
      let parent = this.$parent;
      while (parent && parent !== this.rootMenu) {
        if (['Submenu', 'MenuItemGroup'].indexOf(parent.$options.componentName) > -1) {
          isFirstLevel = false;
          break;
        } else {
          parent = parent.$parent;
        }
      }
      return isFirstLevel;
    },
  },
  watch: {
    opened() {
      if (this.isMenuPopup) {
        this.$nextTick(() => {
          this.updatePopper();
        });
      }
    },
  },
  created() {
    this.$on('toggle-collapse', this.handleCollapseToggle);
    this.$on('mouse-enter-child', () => {
      this.mouseInChild = true;
      clearTimeout(this.timeout);
    });
    this.$on('mouse-leave-child', () => {
      this.mouseInChild = false;
      clearTimeout(this.timeout);
    });
  },
  mounted() {
    this.parentMenu.addSubmenu(this);
    this.rootMenu.addSubmenu(this);
    this.initPopper();
  },
  beforeDestroy() {
    this.parentMenu.removeSubmenu(this);
    this.rootMenu.removeSubmenu(this);
  },
  methods: {
    getParentNode(el, className) {
      const parentNode = el.parentNode;
      if (!parentNode) {
        return;
      }
      if (!className) {
        return parentNode;
      }
      if (parentNode.classList && parentNode.classList.contains(className)) {
        return parentNode;
      }
      return this.getParentNode(parentNode, className);
    },
    updateTopEle(el) {
      let parentEle;
      if (this.isFirstLevel) {
        parentEle = this.getParentNode(el, `${this.cfg.prefix}-menubar--vertical`);
      }
      if (!parentEle) {
        parentEle = el.parentNode;
      }
      const parentRect = parentEle.getBoundingClientRect();
      if (parentRect.height) {
        this.popperElm.style.height = `${parentRect.height}px`;
      }
      if (this.isFirstLevel) {
        this.popperElm.style.top = `${parentRect.top}px`;
      } else {
        this.popperElm.style.left = `${parseInt(this.popperElm.style.left, 10) - 1}px`;
        if (this.popperAppendToBody) {
          this.popperElm.style.top = `${parentRect.top}px`;
        } else {
          if (this.popperElm.style.position === 'fixed') {
            this.popperElm.style.top = `${parentRect.top}px`;
          } else {
            this.popperElm.style.top = '0px';
          }
        }
      }
    },
    handleCollapseToggle(value) {
      if (value) {
        this.initPopper();
      } else {
        this.doDestroy();
        if (this.rootMenu.type === 'popup') {
          this.rootMenu.closeMenu(this.index);
        }
      }
    },
    addItem(item) {
      this.$set(this.items, item.index, item);
    },
    removeItem(item) {
      delete this.items[item.index];
    },
    addSubmenu(item) {
      this.$set(this.submenus, item.index, item);
    },
    removeSubmenu(item) {
      delete this.submenus[item.index];
    },
    handleClick() {
      const { rootMenu, disabled } = this;
      // if ((rootMenu.menuTrigger === 'hover' && rootMenu.mode === 'horizontal')
      // || (rootMenu.collapse && rootMenu.mode === 'vertical')
      // || disabled) {
      //   return;
      // }
      if (rootMenu.menuTrigger === 'hover' || disabled) {
        return;
      }
      this.dispatch('Menu', 'submenu-click', this);
    },
    handleMouseenter(event, showTimeout = this.showTimeout) {

      if (!('ActiveXObject' in window) && event.type === 'focus' && !event.relatedTarget) {
        return;
      }
      const { rootMenu, disabled } = this;
      // if ((rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal')
      // || (!rootMenu.collapse && rootMenu.mode === 'vertical')
      // || disabled) {
      //   return;
      // }
      if (rootMenu.menuTrigger === 'click' || disabled) {
        return;
      }
      this.dispatch('Submenu', 'mouse-enter-child');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.rootMenu.openMenu(this.index, this.indexPath);
      }, showTimeout);

      if (this.appendToBody) {
        this.$parent.$el.dispatchEvent(new MouseEvent('mouseenter'));
      }
    },
    handleMouseleave(deepDispatch = false) {
      const { rootMenu } = this;
      // if (
      //   (rootMenu.menuTrigger === 'click' && rootMenu.mode === 'horizontal')
      //   || (!rootMenu.collapse && rootMenu.mode === 'vertical')
      // ) {
      //   return;
      // }
      if (rootMenu.menuTrigger === 'click') {
        return;
      }
      this.dispatch('Submenu', 'mouse-leave-child');
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        !this.mouseInChild && this.rootMenu.closeMenu(this.index);
      }, this.hideTimeout);

      if (this.appendToBody && deepDispatch) {
        if (this.$parent.$options.name === 'Submenu') {
          this.$parent.handleMouseleave(true);
        }
      }
    },
    handleTitleMouseenter() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      const title = this.$refs['submenu-title'];
      title && (title.style.backgroundColor = this.rootMenu.hoverBackground);
    },
    handleTitleMouseleave() {
      if (this.mode === 'horizontal' && !this.rootMenu.backgroundColor) return;
      const title = this.$refs['submenu-title'];
      title && (title.style.backgroundColor = this.rootMenu.backgroundColor || '');
    },
    updatePlacement() {
      this.currentPlacement = this.mode === 'horizontal' && this.isFirstLevel
        ? 'bottom-start'
        : 'right-start';
    },
    initPopper() {
      this.referenceElm = this.$el;
      this.popperElm = this.$refs.menu;
      this.updatePlacement();
    }
  },
  render() {
    const {
      active,
      opened,
      paddingStyle,
      titleStyle,
      backgroundColor,
      rootMenu,
      currentPlacement,
      menuTransitionName,
      mode,
      disabled,
      popperClass,
      $slots,
      isFirstLevel,
      type,
    } = this;
    let navName;
    let theLastTitleSlot;
    if ($slots.title.length === 3) {
      theLastTitleSlot = [$slots.title[2]];
    }
    if ($slots.title[0] && $slots.title[0].text) {
      navName = $slots.title[0].text;
    }
    if (theLastTitleSlot && theLastTitleSlot[0] && theLastTitleSlot[0].elm) {
      navName = theLastTitleSlot[0].elm.innerText;
    }

    const popupMenu = (
      <transition name={menuTransitionName}>
        <div
          ref="menu"
          v-show={opened}
          class={[`${this.cfg.prefix}-menu--${mode}`, `${this.cfg.prefix}-menu--fix-submenu`, `${this.cfg.prefix}-submenu--content`, popperClass]}
          on-mouseenter={($event) => this.handleMouseenter($event, 100)}
          on-mouseleave={() => this.handleMouseleave(true)}
          on-focus={($event) => this.handleMouseenter($event, 100)}>
          <ul
            role="menu"
            class={[`${this.cfg.prefix}-menu ${this.cfg.prefix}-menu--popup`, `${this.cfg.prefix}-menu--popup-${currentPlacement}`]}
            style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
            <li class={`${this.cfg.prefix}-menu--popup-title`} v-show={mode === 'vertical' && type === 'popup' && navName}>{navName}</li>
            {$slots.default}
          </ul>
        </div>
      </transition>
    );

    const inlineMenu = (
      <collapse-transition>
        <ul
          role="menu"
          class={`${this.cfg.prefix}-menu ${this.cfg.prefix}-menu--inline ${this.cfg.prefix}-submenu--content`}
          v-show={opened}
          style={{ backgroundColor: rootMenu.backgroundColor || '' }}>
          {$slots.default}
        </ul>
      </collapse-transition>
    );

    const submenuTitleIcon = (
      rootMenu.mode === 'horizontal' && isFirstLevel
      || rootMenu.mode === 'vertical' && !rootMenu.collapse && rootMenu.type !== 'popup'
    ) ? `${this.cfg.prefix}-icon ui-icon-line-direction-down` : `${this.cfg.prefix}-icon ui-icon-line-direction-right`;

    const popperTitleTip = (
      <pop-tip
        trigger="hover"
        placement="right"
        class="collapse-icon"
        visible-arrow={false}
        popper-class={`${this.cfg.prefix}-menu-item--popover`}
      >
        {theLastTitleSlot}
        <div slot="reference" style="outline:none; position: absolute;left: 0;top: 0;height: 100%;width: 100%;display: inline-block;box-sizing: border-box;padding: 0 24px;">
          {$slots.title}
        </div>
      </pop-tip>
    );
    return (
      <li
        class={[
          `${this.cfg.prefix}-submenu`,
          active ? 'is-active' : '',
          opened ? 'is-opened' : '',
          rootMenu.type === 'popup' ? 'is-popup' : '',
          rootMenu.mode === 'vertical' && !rootMenu.collapse && rootMenu.type !== 'popup' ? 'is-tree' : '',
          disabled ? 'is-disabled' : ''
        ].join(' ')}
        role="menuitem"
        aria-haspopup="true"
        aria-expanded={opened}
        on-mouseenter={this.handleMouseenter}
        on-mouseleave={() => this.handleMouseleave(false)}
        on-focus={this.handleMouseenter}
      >
        <div
          class={[
            `${this.cfg.prefix}-submenu__title`,
            isFirstLevel ? 'is-first-level' : '',
          ]}
          ref="submenu-title"
          on-click={this.handleClick}
          on-mouseenter={this.handleTitleMouseenter}
          on-mouseleave={this.handleTitleMouseleave}
          style={[paddingStyle, titleStyle, { backgroundColor }]}
        >
          {this.parentMenu.$options.componentName === 'Menu' && rootMenu.collapse && $slots.title && rootMenu.menuTrigger === 'click' ? popperTitleTip : (
            <div>
              {$slots.title}
              <i class={[`${this.cfg.prefix}-submenu__icon-arrow`, submenuTitleIcon]}></i>
            </div>
          )}
        </div>
        {this.isMenuPopup ? popupMenu : inlineMenu}
      </li>
    );
  }
};
</script>
