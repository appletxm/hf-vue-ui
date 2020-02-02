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

    <div :class="[cfg.prefix + '-transfer-panel__body', hasFooter ? 'is-with-footer' : '']">
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
          <option-content :option="item"></option-content>
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
        option: Object
      },
      render(h) {
        const getParent = (vm) => {
          if (vm.$options.componentName === 'TransferPanel') {
            return vm;
          } else if (vm.$parent) {
            return getParent(vm.$parent);
          } else {
            return vm;
          }
        };
        const panel = getParent(this);
        const transfer = panel.$parent || panel;
        return panel.renderContent
          ? panel.renderContent(h, this.option)
          : transfer.$scopedSlots.default
            ? transfer.$scopedSlots.default({ option: this.option })
            : <span>{ this.option[panel.labelProp] || this.option[panel.keyProp] }</span>;
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
          const label = item[this.labelProp] || item[this.keyProp].toString();
          return label.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
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

    labelProp() {
      return this.props.label || 'label';
    },

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
