<script>
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
// import TransferPanel from './transfer-panel.vue';
import Migrating from '../../mixins/migrating';

export default {
  name: 'TransferCombine',

  components: {
    // TransferPanel
  },

  mixins: [Emitter, Locale, Migrating],

  props: {
    loadingFn: {
      type: Function,
      default: null
    },
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
    filterable: Boolean,
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
    }
  },

  render() {
    /* eslint-disable */
    const css = this.cfg.prefix + '-transfer' + ' ' + this.cfg.prefix + '-transfer-combine'
    return (
      <div className={css}>
        999999999999999
      </div>
    )
    /* eslint-enable */
  }
};
</script>
