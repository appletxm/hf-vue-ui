<template>
  <div
    :class="[
      cfg.prefix + '-table',
      fit ? cfg.prefix + '-table--fit' : '',
      stripe ? cfg.prefix + '-table--striped' : '',
      border || isGroup ? cfg.prefix + '-table--border' : '',
      isHidden ? cfg.prefix + '-table--hidden' : '',
      isGroup ? cfg.prefix + '-table--group' : '',
      maxHeight ? cfg.prefix + '-table--fluid-height' : '',
      layout.scrollX ? cfg.prefix + '-table--scrollable-x' : '',
      layout.scrollY ? cfg.prefix + '-table--scrollable-y' : '',
      !store.states.isComplex ? cfg.prefix + '-table--enable-row-hover' : '',
      (store.states.data || []).length !== 0 && (store.states.data || []).length < 100 ? cfg.prefix + '-table--enable-row-transition' : '',
      tableSize ? `${cfg.prefix}-table--${ tableSize }` : '']"
    @mouseleave="handleMouseLeave($event)"
  >
    <div ref="hiddenColumns" class="hidden-columns">
      <slot></slot>
    </div>
    <div
      v-if="showHeader"
      ref="headerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      :class="[cfg.prefix + '-table__header-wrapper']"
    >
      <table-header
        ref="tableHeader"
        :store="store"
        :border="border"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"
      >
      </table-header>
    </div>
    <div
      ref="bodyWrapper"
      :class="[cfg.prefix + '-table__body-wrapper', layout.scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']"
      :style="[bodyHeight]"
    >
      <table-body
        ref="tableBody"
        :context="context"
        :store="store"
        :stripe="stripe"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :highlight="highlightCurrentRow"
        :style="{
          width: bodyWidth
        }"
      >
      </table-body>
      <div
        v-if="!data || data.length === 0"
        ref="emptyBlock"
        :class="[cfg.prefix + '-table__empty-block']"
        :style="emptyBlockStyle"
      >
        <span :class="[cfg.prefix + '-table__empty-text']">
          <slot name="empty">{{ emptyText || t('el.table.emptyText') }}</slot>
        </span>
      </div>
      <div
        v-if="$slots.append"
        ref="appendWrapper"
        :class="[cfg.prefix + '-table__append-wrapper']"
      >
        <slot name="append"></slot>
      </div>
    </div>
    <div
      v-if="showSummary"
      v-show="data && data.length > 0"
      ref="footerWrapper"
      v-mousewheel="handleHeaderFooterMousewheel"
      :class="[cfg.prefix + '-table__footer-wrapper']"
    >
      <table-footer
        :store="store"
        :border="border"
        :sum-text="sumText || t('el.table.sumText')"
        :summary-method="summaryMethod"
        :default-sort="defaultSort"
        :style="{
          width: layout.bodyWidth ? layout.bodyWidth + 'px' : ''
        }"
      >
      </table-footer>
    </div>
    <div
      v-if="fixedColumns.length > 0"
      ref="fixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      :class="[cfg.prefix + '-table__fixed']"
      :style="[{
                 width: layout.fixedWidth ? layout.fixedWidth + 'px' : ''
               },
               fixedHeight]"
    >
      <div
        v-if="showHeader"
        ref="fixedHeaderWrapper"
        :class="[cfg.prefix + '-table__fixed-header-wrapper']"
      >
        <table-header
          ref="fixedTableHeader"
          fixed="left"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"
        ></table-header>
      </div>
      <div
        ref="fixedBodyWrapper"
        :class="[cfg.prefix + '-table__fixed-body-wrapper']"
        :style="[{
                   top: layout.headerHeight + 'px'
                 },
                 fixedBodyHeight]"
      >
        <table-body
          fixed="left"
          :store="store"
          :stripe="stripe"
          :highlight="highlightCurrentRow"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :style="{
            width: bodyWidth
          }"
        >
        </table-body>
        <div
          v-if="$slots.append"
          :class="[cfg.prefix + '-table__append-gutter']"
          :style="{ height: layout.appendHeight + 'px'}"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        ref="fixedFooterWrapper"
        :class="[cfg.prefix + '-table__fixed-footer-wrapper']"
      >
        <table-footer
          fixed="left"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"
        ></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      ref="rightFixedWrapper"
      v-mousewheel="handleFixedMousewheel"
      :class="[cfg.prefix + '-table__fixed-right']"
      :style="[{
                 width: layout.rightFixedWidth ? layout.rightFixedWidth + 'px' : '',
                 right: layout.scrollY ? (border ? layout.gutterWidth : (layout.gutterWidth || 0)) + 'px' : ''
               },
               fixedHeight]"
    >
      <div v-if="showHeader"
           ref="rightFixedHeaderWrapper"
           :class="[cfg.prefix + '-table__fixed-header-wrapper']"
      >
        <table-header
          ref="rightFixedTableHeader"
          fixed="right"
          :border="border"
          :store="store"
          :style="{
            width: bodyWidth
          }"
        ></table-header>
      </div>
      <div
        ref="rightFixedBodyWrapper"
        :class="[cfg.prefix + '-table__fixed-body-wrapper']"
        :style="[{
                   top: layout.headerHeight + 'px'
                 },
                 fixedBodyHeight]"
      >
        <table-body
          fixed="right"
          :store="store"
          :stripe="stripe"
          :row-class-name="rowClassName"
          :row-style="rowStyle"
          :highlight="highlightCurrentRow"
          :style="{
            width: bodyWidth
          }"
        >
        </table-body>
        <div
          v-if="$slots.append"
          :class="[cfg.prefix + '-table__append-gutter']"
          :style="{ height: layout.appendHeight + 'px' }"
        ></div>
      </div>
      <div
        v-if="showSummary"
        v-show="data && data.length > 0"
        ref="rightFixedFooterWrapper"
        :class="[cfg.prefix + '-table__fixed-footer-wrapper']"
      >
        <table-footer
          fixed="right"
          :border="border"
          :sum-text="sumText || t('el.table.sumText')"
          :summary-method="summaryMethod"
          :store="store"
          :style="{
            width: bodyWidth
          }"
        ></table-footer>
      </div>
    </div>
    <div
      v-if="rightFixedColumns.length > 0"
      ref="rightFixedPatch"
      :class="[cfg.prefix + '-table__fixed-right-patch']"
      :style="{
        width: layout.scrollY ? layout.gutterWidth + 'px' : '0',
        height: layout.headerHeight + 'px'
      }"
    ></div>
    <div v-show="resizeProxyVisible" ref="resizeProxy" :class="[cfg.prefix + '-table__column-resize-proxy']"></div>
  </div>
</template>

<script type="text/babel">
import { debounce, throttle } from 'throttle-debounce';
import { addResizeListener, removeResizeListener } from '../../utils/resize-event';
import Mousewheel from '../../directives/mousewheel';
import Locale from '../../mixins/locale';
import Migrating from '../../mixins/migrating';
import { createStore } from './store/helper';
import TableLayout from './table-layout';
import TableBody from './table-body';
import TableHeader from './table-header';
import TableFooter from './table-footer';
import { parseHeight } from './util';

let tableIdSeed = 1;

export default {
  name: 'Table',

  directives: {
    Mousewheel
  },

  components: {
    TableHeader,
    TableFooter,
    TableBody,
  },

  mixins: [Locale, Migrating],

  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      }
    },

    size: String,

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    context: {
      type: Object,
      default: () => ({})
    },

    showHeader: {
      type: Boolean,
      default: true
    },

    showSummary: Boolean,

    sumText: String,

    summaryMethod: Function,

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    cellClassName: [String, Function],

    cellStyle: [Object, Function],

    headerRowClassName: [String, Function],

    headerRowStyle: [Object, Function],

    headerCellClassName: [String, Function],

    headerCellStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    spanMethod: Function,

    selectOnIndeterminate: {
      type: Boolean,
      default: true
    },

    indent: {
      type: Number,
      default: 16
    },

    treeProps: {
      type: Object,
      default() {
        return {
          hasChildren: 'hasChildren',
          children: 'children'
        };
      }
    },

    lazy: Boolean,

    load: Function
  },

  data() {
    const { hasChildren = 'hasChildren', children = 'children' } = this.treeProps;
    this.store = createStore(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll,
      selectOnIndeterminate: this.selectOnIndeterminate,
      // TreeTable 的相关配置
      indent: this.indent,
      lazy: this.lazy,
      lazyColumnIdentifier: hasChildren,
      childrenColumnName: children
    });

    const layout = new TableLayout({
      store: this.store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });

    return {
      layout,
      isHidden: false,
      renderExpanded: null,
      resizeProxyVisible: false,
      resizeState: {
        width: null,
        height: null
      },
      // 是否拥有多级表头
      isGroup: false,
      scrollPosition: 'left',
      columns: [],
      selection: [],
      tableData: [],
      fixedColumns: [],
      rightFixedColumns: [],
    };
  },

  computed: {
    tableSize() {
      return this.size || (this.$ELEMENT || {}).size;
    },

    bodyWrapper() {
      return this.$refs.bodyWrapper;
    },

    shouldUpdateHeight() {
      return this.height
          || this.maxHeight
          || this.fixedColumns.length > 0
          || this.rightFixedColumns.length > 0;
    },

    bodyWidth() {
      const { bodyWidth, scrollY, gutterWidth } = this.layout;
      const item1 = bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
      console.log(`bodyWidth: ${item1}`)
      return item1;
    },

    bodyHeight() {
      const { headerHeight = 0, bodyHeight, footerHeight = 0 } = this.layout;
      if (this.height) {
        return {
          height: bodyHeight ? bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        const maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === 'number') {
          return {
            'max-height': (maxHeight - footerHeight - (this.showHeader ? headerHeight : 0)) + 'px'
          };
        }
      }
      return {};
    },

    fixedBodyHeight() {
      if (this.height) {
        return {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        let maxHeight = parseHeight(this.maxHeight);
        if (typeof maxHeight === 'number') {
          maxHeight = this.layout.scrollX ? maxHeight - this.layout.gutterWidth : maxHeight;
          if (this.showHeader) {
            maxHeight -= this.layout.headerHeight;
          }
          maxHeight -= this.layout.footerHeight;
          return {
            'max-height': maxHeight + 'px'
          };
        }
      }
      return {};
    },

    fixedHeight() {
      if (this.maxHeight) {
        if (this.showSummary) {
          return {
            bottom: 0
          };
        }
        return {
          bottom: (this.layout.scrollX && this.data.length) ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        if (this.showSummary) {
          return {
            height: this.layout.tableHeight ? this.layout.tableHeight + 'px' : ''
          };
        }
        return {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }
    },

    emptyBlockStyle() {
      if (this.data && this.data.length) return null;
      let height = '100%';
      if (this.layout.appendHeight) {
        height = `calc(100% - ${this.layout.appendHeight}px)`;
      }
      return {
        width: this.bodyWidth,
        height
      };
    },
  },

  watch: {
    height: {
      immediate: true,
      handler(value) {
        this.layout.setHeight(value);
      }
    },

    maxHeight: {
      immediate: true,
      handler(value) {
        this.layout.setMaxHeight(value);
      }
    },

    currentRowKey: {
      immediate: true,
      handler(value) {
        if (!this.rowKey) return;
        this.store.setCurrentRowKey(value);
      }
    },

    data: {
      immediate: true,
      handler(value) {
        this.store.commit('setData', value);
      }
    },

    expandRowKeys: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.store.setExpandRowKeysAdapter(newVal);
        }
      }
    }
  },

  created() {
    this.tableId = `${this.cfg.prefix}-table_` + tableIdSeed++;
    this.debouncedUpdateLayout = debounce(50, () => this.doLayout());
  },

  mounted() {
    this.bindEvents();
    this.store.updateColumns();
    // this.showHeader = this.doLayout(); // TODO
    this.doLayout();
    this.resizeState = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };

    this.columns = this.store.states.columns;
    this.selection = this.store.states.selection;
    this.tableData = this.store.states.data;
    this.fixedColumns = this.store.states.fixedColumns;
    this.rightFixedColumns = this.store.states.rightFixedColumns;

    // init filters
    this.store.states.columns.forEach((column) => {
      if (column.filteredValue && column.filteredValue.length) {
        this.store.commit('filterChange', {
          column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;

    // TODO why the computed props not working as expected, need use the force update solution
    this.forceUpdateChildren()
  },

  destroyed() {
    this.unbindEvents();
  },

  methods: {
    getMigratingConfig() {
      return {
        events: {
          expand: 'expand is renamed to expand-change'
        }
      };
    },

    setCurrentRow(row) {
      this.store.commit('setCurrentRow', row);
    },

    toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected, false);
      this.store.updateAllSelected();
    },

    toggleRowExpansion(row, expanded) {
      this.store.toggleRowExpansionAdapter(row, expanded);
    },

    clearSelection() {
      this.store.clearSelection();
    },

    clearFilter(columnKeys) {
      this.store.clearFilter(columnKeys);
    },

    clearSort() {
      this.store.clearSort();
    },

    handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },

    updateScrollY() {
      const changed = this.layout.updateScrollY();
      if (changed) {
        this.layout.updateColumnsWidth();
      }
    },

    handleFixedMousewheel(event, data) {
      const bodyWrapper = this.bodyWrapper;
      if (Math.abs(data.spinY) > 0) {
        const currentScrollTop = bodyWrapper.scrollTop;
        if (data.pixelY < 0 && currentScrollTop !== 0) {
          event.preventDefault();
        }
        if (data.pixelY > 0 && bodyWrapper.scrollHeight - bodyWrapper.clientHeight > currentScrollTop) {
          event.preventDefault();
        }
        bodyWrapper.scrollTop += Math.ceil(data.pixelY / 5);
      } else {
        bodyWrapper.scrollLeft += Math.ceil(data.pixelX / 5);
      }
    },

    handleHeaderFooterMousewheel(event, data) {
      const { pixelX, pixelY } = data;
      if (Math.abs(pixelX) >= Math.abs(pixelY)) {
        this.bodyWrapper.scrollLeft += data.pixelX / 5;
      }
    },

    // TODO 使用 CSS transform
    syncPostion: throttle(20, function () {
      const { scrollLeft, scrollTop, offsetWidth, scrollWidth } = this.bodyWrapper;
      const { headerWrapper, footerWrapper, fixedBodyWrapper, rightFixedBodyWrapper } = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
      if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
      if (fixedBodyWrapper) fixedBodyWrapper.scrollTop = scrollTop;
      if (rightFixedBodyWrapper) rightFixedBodyWrapper.scrollTop = scrollTop;
      const maxScrollLeftPosition = scrollWidth - offsetWidth - 1;
      if (scrollLeft >= maxScrollLeftPosition) {
        this.scrollPosition = 'right';
      } else if (scrollLeft === 0) {
        this.scrollPosition = 'left';
      } else {
        this.scrollPosition = 'middle';
      }
    }),

    bindEvents() {
      this.bodyWrapper.addEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        addResizeListener(this.$el, this.resizeListener);
      }
    },

    unbindEvents() {
      this.bodyWrapper.removeEventListener('scroll', this.syncPostion, { passive: true });
      if (this.fit) {
        removeResizeListener(this.$el, this.resizeListener);
      }
    },

    resizeListener() {
      if (!this.$ready) return;
      let shouldUpdateLayout = false;
      const el = this.$el;
      const { width: oldWidth, height: oldHeight } = this.resizeState;

      const width = el.offsetWidth;
      if (oldWidth !== width) {
        shouldUpdateLayout = true;
      }

      const height = el.offsetHeight;
      if ((this.height || this.shouldUpdateHeight) && oldHeight !== height) {
        shouldUpdateLayout = true;
      }

      if (shouldUpdateLayout) {
        this.resizeState.width = width;
        this.resizeState.height = height;
        this.doLayout();
      }
    },

    doLayout() {
      if (this.shouldUpdateHeight) {
        this.layout.updateElsHeight();
      }
      this.layout.updateColumnsWidth();
    },

    sort(prop, order) {
      this.store.commit('sort', { prop, order });
    },

    toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },

    forceUpdateChildren() {
      this.$nextTick(() => {
        this.$refs.tableHeader.$forceUpdate()
        this.$refs.tableBody.$forceUpdate()
      })
    },
  }
};
</script>
