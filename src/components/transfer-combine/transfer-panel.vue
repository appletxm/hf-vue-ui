<template>
  <div :class="[cfg.prefix + '-transfer-panel']">
    <p v-if="filterable" :class="[cfg.prefix + '-transfer-panel__filter']">
      <hf-ui-input
        v-model="query"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
      >
        <i slot="prefix"
           :class="[cfg.prefix + '-input__icon', inputIcon]"
           @click="clearQuery"
        ></i>
      </hf-ui-input>
    </p>
    <p v-if="title" :class="[cfg.prefix + '-transfer-panel__header']">
      {{ title }}
      <span :style="{display: none}">{{ checkedSummary }}</span>
    </p>

    <div :class="[cfg.prefix + '-transfer-panel__body', hasFooter ? 'is-with-footer' : '', columns && columns.length ? (cfg.prefix + '-tc-grid') : '']">
      <label :class="[cfg.prefix + '-tc-grid__header']">
        <span v-for="column in columns" :key="column.field" :class="[cfg.prefix + '-tc-grid__cell']" :style="{width:(column.width + 'px')}">
          {{ column.label }}
        </span>
        <span :class="[cfg.prefix + '-tc-grid__cell', cfg.prefix + '-tc-grid__empty-cell']"></span>
      </label>

      <hf-ui-checkbox-group
        v-show="!hasNoMatch && data.length > 0"
        v-model="checked"
        :class="[cfg.prefix + '-transfer-panel__list', { 'is-filterable': filterable }]"
      >
        <hf-ui-checkbox
          v-for="item in filteredData"
          :key="item[keyProp]"
          :class="[cfg.prefix + '-transfer-panel__item', transferType === 'source' ? 'is-source' :'is-target']"
          :label="item[keyProp]"
          :disabled="item[disabledProp]"
        >
          <option-content :columns="columns" :option="item"></option-content>
          <span v-if="transferType === 'target'" class="ui-icon-line-currency-failure"></span>
          <span v-if="transferType === 'source'" class="ui-icon-line-currency-tick"></span>
        </hf-ui-checkbox>
      </hf-ui-checkbox-group>

      <p
        v-show="hasNoMatch"
        :class="[cfg.prefix + '-transfer-panel__empty']"
      >
        {{ t('el.transfer.noMatch') }}
      </p>
      <p
        v-show="data.length === 0 && !hasNoMatch"
        :class="[cfg.prefix + '-transfer-panel__empty']"
      >
        {{ t('el.transfer.noData') }}
      </p>
    </div>

    <div v-if="hasFooter" :class="[cfg.prefix + '-transfer-panel__footer']">
      <span :class="[cfg.prefix + '-transfer-panel__opt']">
        <hf-ui-button
          type="secondary"
          :class="[cfg.prefix + '-transfer__button']"
          :disabled="disabledCheckAll"
          @click="selectedAllItems"
        >
          {{ transferType === 'source' ? '全部选择' : '全部移除' }}
        </hf-ui-button>
      </span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import HfUiCheckboxGroup from '../checkbox-group';
import HfUiCheckbox from '../checkbox';
import HfUiInput from '../input';
import Locale from '../../mixins/locale';

export default {

  name: 'TransferPanel',

  components: {
    HfUiCheckboxGroup,
    HfUiCheckbox,
    HfUiInput,
    OptionContent: {
      props: {
        option: Object,
        columns: Object
      },
      render() {
        // console.info(h, this.option, this.columns)
        const rowCss = this.cfg.prefix + '-tc-grid__row'
        const cellCss = this.cfg.prefix + '-tc-grid__cell '
        return (
          <div class={rowCss}>
          {
            this.columns.map((column) => (<span class={cellCss} style={{ width: column.width + 'px' }}>{this['option'][column.field]}</span>))
          }
          </div>
        )
      }
    }
  },
  mixins: [Locale],

  componentName: 'TransferPanel',

  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    renderContent: Function,
    placeholder: String,
    title: String,
    filterable: Boolean,
    format: Object,
    filterMethod: Function,
    defaultChecked: Array,
    props: Object,
    transferType: {
      type: String,
      default: 'source'
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  },

  data() {
    return {
      checked: [],
      allChecked: false,
      query: '',
      inputHover: false,
      checkChangeByUser: true
    };
  },

  computed: {
    filteredData() {
      const filerData = this.data.filter((item) => {
        if (typeof this.filterMethod === 'function') {
          return this.filterMethod(this.query, item);
        } else {
          const keys = Object.keys(item)
          let str = ''
          keys.forEach((key) => {
            str += item[key]
          })
          return str.toLowerCase().indexOf(this.query.toLowerCase()) > -1
        }
      });
      return filerData
    },

    checkableData() {
      return this.filteredData.filter((item) => !item[this.disabledProp]);
    },

    checkedSummary() {
      const checkedLength = this.checked.length;
      const dataLength = this.data.length;
      const { noChecked, hasChecked } = this.format;
      if (noChecked && hasChecked) {
        return checkedLength > 0
          ? hasChecked.replace(/\${checked}/g, checkedLength).replace(/\${total}/g, dataLength)
          : noChecked.replace(/\${total}/g, dataLength);
      } else {
        return `${checkedLength}/${dataLength}`;
      }
    },

    isIndeterminate() {
      const checkedLength = this.checked.length;
      return checkedLength > 0 && checkedLength < this.checkableData.length;
    },

    hasNoMatch() {
      return this.query.length > 0 && this.filteredData.length === 0;
    },

    inputIcon() {
      return this.query.length > 0 && this.inputHover
        ? 'ui-icon-line-currency-failure'
        : 'ui-icon-line-currency-search';
    },

    // labelProp() {
    //   return this.props.label || 'label';
    // },

    keyProp() {
      return this.props.key || 'key';
    },

    disabledProp() {
      return this.props.disabled || 'disabled';
    },

    hasFooter() {
      // return !!this.$slots.default;
      return true
    },

    disabledCheckAll() {
      return this.checkableData.length === 0 || this.checked.length === this.checkableData.length
    }
  },

  watch: {
    checked(val, oldVal) {
      this.updateAllChecked();
      if (this.checkChangeByUser) {
        const movedKeys = val.concat(oldVal)
          .filter((v) => val.indexOf(v) === -1 || oldVal.indexOf(v) === -1);
        this.$emit('checked-change', val, movedKeys);
      } else {
        this.$emit('checked-change', val);
        this.checkChangeByUser = true;
      }
    },

    data() {
      const checked = [];
      const filteredDataKeys = this.filteredData.map((item) => item[this.keyProp]);
      this.checked.forEach((item) => {
        if (filteredDataKeys.indexOf(item) > -1) {
          checked.push(item);
        }
      });
      this.checkChangeByUser = false;
      this.checked = checked;
    },

    checkableData() {
      this.updateAllChecked();
    },

    defaultChecked: {
      immediate: true,
      handler(val, oldVal) {
        if (oldVal && val.length === oldVal.length
            && val.every((item) => oldVal.indexOf(item) > -1)) return;
        const checked = [];
        const checkableDataKeys = this.checkableData.map((item) => item[this.keyProp]);
        val.forEach((item) => {
          if (checkableDataKeys.indexOf(item) > -1) {
            checked.push(item);
          }
        });
        this.checkChangeByUser = false;
        this.checked = checked;
      }
    }
  },

  methods: {
    updateAllChecked() {
      const checkableDataKeys = this.checkableData.map((item) => item[this.keyProp]);
      this.allChecked = checkableDataKeys.length > 0
          && checkableDataKeys.every((item) => this.checked.indexOf(item) > -1);
    },

    selectedAllItems() {
      this.allChecked = !this.allChecked
      this.handleAllCheckedChange(true)
    },

    handleAllCheckedChange(value) {
      this.checked = value
        ? this.checkableData.map((item) => item[this.keyProp])
        : [];
    },

    clearQuery() {
      if (this.inputIcon === 'ui-icon-line-currency-failure') {
        this.query = '';
      }
    }
  }
};
</script>
