<script>
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from '../../mixins/migrating';

export default {
  name: 'TransferCombine',

  components: {
    TransferPanel
  },

  mixins: [Emitter, Locale, Migrating],

  props: {
    menuData: {
      type: Array,
      default() {
        return []
      }
    },
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    titles: {
      type: Array,
      default() {
        return [];
      }
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function,
    leftDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    rightDefaultChecked: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Array,
      default() {
        return [];
      }
    },
    format: {
      type: Object,
      default() {
        return {};
      }
    },
    props: {
      type: Object,
      default() {
        return {
          label: 'label',
          key: 'key',
          disabled: 'disabled'
        };
      }
    },
    targetOrder: {
      type: String,
      default: 'original'
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      leftChecked: [],
      rightChecked: []
    };
  },

  computed: {
    dataObj() {
      /* eslint-disable */
      const key = this.props.key;
      return this.data.reduce((o, cur) => (o[cur[key]] = cur) && o, {});
      /* eslint-enable */
    },

    sourceData() {
      return this.data.filter((item) => this.value.indexOf(item[this.props.key]) === -1);
    },

    targetData() {
      if (this.targetOrder === 'original') {
        return this.data.filter((item) => this.value.indexOf(item[this.props.key]) > -1);
      } else {
        return this.value.reduce((arr, cur) => {
          const val = this.dataObj && this.dataObj[cur];
          if (val) {
            arr.push(val);
          }
          return arr;
        }, []);
      }
    }
  },

  watch: {
    value(val) {
      this.dispatch('FormItem', 'form.change', val);
    }
  },

  methods: {
    onSourceCheckedChange(val, movedKeys) {
      this.leftChecked = val;
      if (movedKeys === undefined) return;
      this.addToRight()
      this.$emit('left-check-change', val, movedKeys);
    },

    onTargetCheckedChange(val, movedKeys) {
      this.rightChecked = val;
      if (movedKeys === undefined) return;
      this.addToLeft()
      this.$emit('right-check-change', val, movedKeys);
    },

    addToLeft() {
      const currentValue = this.value.slice();
      this.rightChecked.forEach((item) => {
        const index = currentValue.indexOf(item);
        if (index > -1) {
          currentValue.splice(index, 1);
        }
      });
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'left', this.rightChecked);
    },

    addToRight() {
      let currentValue = this.value.slice();
      const itemsToBeMoved = [];
      const key = this.props.key;
      this.data.forEach((item) => {
        const itemKey = item[key];
        if (
          this.leftChecked.indexOf(itemKey) > -1
            && this.value.indexOf(itemKey) === -1
        ) {
          itemsToBeMoved.push(itemKey);
        }
      });
      currentValue = this.targetOrder === 'unshift'
        ? itemsToBeMoved.concat(currentValue)
        : currentValue.concat(itemsToBeMoved);
      this.$emit('input', currentValue);
      this.$emit('change', currentValue, 'right', this.leftChecked);
    },

    clearQuery(which) {
      if (which === 'left') {
        this.$refs.leftPanel.query = '';
      } else if (which === 'right') {
        this.$refs.rightPanel.query = '';
      }
    },

    leftMenuSelectHandler(...args) {
      console.info(args[0], this.$emit)
      this.$emit('loading-data')
    },

    getMenuCircleNodes(menuData, nodeIndex) {
      return menuData.map((item, subIndex) => {
        let vNode = null
        const subIndexLabel = subIndex + 1
        if (!Array.isArray(nodeIndex) || item.isTopLevel === true) {
          nodeIndex = [subIndexLabel]
        } else {
          nodeIndex.push(subIndexLabel)
        }
        const nodeIndexStr = nodeIndex.join('-')

        // console.info('nodeIndexStr:', nodeIndexStr)

        if (item.children && item.children.length > 0) {
          vNode = (
            <hf-ui-submenu index={nodeIndexStr}>
              <span slot="title">{item.label}</span>
              { this.getMenuCircleNodes(item.children, nodeIndex) }
            </hf-ui-submenu>
          )
        } else {
          nodeIndex.pop()
          vNode = (<hf-ui-menu-item index={nodeIndexStr}>{item.label}</hf-ui-menu-item>)
        }

        if (subIndex === menuData.length - 1) {
          nodeIndex.pop()
        }

        return vNode
      })
    },

    getMenuNodes() {
      return (
        <hf-ui-menu default-active={'2-2-1'} on-select={this.leftMenuSelectHandler}>
        {this.getMenuCircleNodes(this.menuData)}
        </hf-ui-menu>
      )
    }
  },

  render(h) {
    /* eslint-disable */
    const css = this.cfg.prefix + '-transfer' + ' ' + this.cfg.prefix + '-transfer-combine'
    const leftMenuCss = this.cfg.prefix + '-transfer-combine__left-menu'
    const transferPanelCss = this.cfg.prefix + '-transfer-combine__transfer-panel'

    return (
      <div class={css} v-loading={this.isLoading}>
        <section class={leftMenuCss}>{ this.getMenuNodes() }</section>
        <section class={transferPanelCss}>
          { h('transfer-panel', {
            props: {
              ...this.$props,
              data: this.sourceData,
              title: this.titles[0],
              defaultChecked: this.leftDefaultChecked,
              placeholder: this.filterPlaceholder || this.t('el.transfer.filterPlaceholder'),
              transferType: 'source'
            },
            nativeOn: {
              checkedChange: this.onSourceCheckedChange
            },
            ref: 'leftPanel'
          }) }

          { h('transfer-panel', {
            props: {
              ...this.$props,
              data: this.targetData,
              title: this.titles[1],
              defaultChecked: this.rightDefaultChecked,
              placeholder: this.filterPlaceholder || this.t('el.transfer.filterPlaceholder'),
              transferType: 'target'
            },
            nativeOn: {
              checkedChange: this.onTargetCheckedChange
            },
            scopedSlots: {
              default: () => this['$slots']['right-footer']
            },
            ref: 'rightPanel'
          }) }
        </section>
      </div>
    )
    /* eslint-enable */
  }
};
</script>
