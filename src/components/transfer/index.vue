<template>
  <div :class="[cfg.prefix + '-transfer']">
    <transfer-panel
      ref="leftPanel"
      v-bind="$props"
      :data="sourceData"
      :title="titles[0]"
      :default-checked="leftDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :transfer-type="'source'"
      @checked-change="onSourceCheckedChange"
    >
      <slot name="left-footer"></slot>
    </transfer-panel>
    <!-- <div :class="[cfg.prefix + '-transfer__buttons']">
      <hf-ui-button
        type="primary"
        :class="[cfg.prefix + '-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        :disabled="rightChecked.length === 0"
        @click.native="addToLeft"
      >
        <i :class="[cfg.prefix + '-icon-arrow-left']"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </hf-ui-button>
      <hf-ui-button
        type="primary"
        :class="[cfg.prefix + '-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        :disabled="leftChecked.length === 0"
        @click.native="addToRight"
      >
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i :class="[cfg.prefix + '-icon-arrow-right']"></i>
      </hf-ui-button>
    </div> -->
    <transfer-panel
      ref="rightPanel"
      v-bind="$props"
      :data="targetData"
      :title="titles[1]"
      :default-checked="rightDefaultChecked"
      :placeholder="filterPlaceholder || t('el.transfer.filterPlaceholder')"
      :transfer-type="'target'"
      @checked-change="onTargetCheckedChange"
    >
      <slot name="right-footer"></slot>
    </transfer-panel>
  </div>
</template>

<script>
// import HfUiButton from '../button';
import Emitter from '../../mixins/emitter';
import Locale from '../../mixins/locale';
import TransferPanel from './transfer-panel.vue';
import Migrating from '../../mixins/migrating';

export default {
  name: 'Transfer',

  components: {
    TransferPanel
    // HfUiButton
  },

  mixins: [Emitter, Locale, Migrating],

  props: {
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
    buttonTexts: {
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
    renderContent: Function,
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
    },

    hasButtonTexts() {
      return this.buttonTexts.length === 2;
    }
  },

  watch: {
    value(val) {
      this.dispatch('FormItem', 'form.change', val);
    }
  },

  methods: {
    getMigratingConfig() {
      return {
        props: {
          'footer-format': 'footer-format is renamed to format.'
        }
      };
    },

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
  }
};
</script>
