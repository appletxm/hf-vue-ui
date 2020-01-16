<template>
  <ul :class="[`${cfg.prefix}-pager`]" @click="onPagerClick">
    <li
      v-if="pageCount > 0"
      :class="{ active: currentPage === 1, disabled }"
      class="number"
    >
      <span class="num">1</span>
    </li>
    <li
      v-if="showPrevMore"
      class="more btn-quickprev"
      :class="[disabled || disabledMore ? 'disabled' : '']"
      @mouseenter="onMouseenter('left')"
      @mouseleave="quickprevIconClass = 'ui-icon-fill-currency-more'"
    >
      <span :class="[`${cfg.prefix}-icon`, quickprevIconClass, 'num']"></span>
    </li>
    <li
      v-for="pager in pagers"
      :key="pager"
      :class="{ active: currentPage === pager, disabled }"
      class="number"
    >
      <span class="num">{{ pager }}</span>
    </li>
    <li
      v-if="showNextMore"
      class="more btn-quicknext"
      :class="[disabled || disabledMore ? 'disabled' : '']"
      @mouseenter="onMouseenter('right')"
      @mouseleave="quicknextIconClass = 'ui-icon-fill-currency-more'"
    >
      <span :class="[`${cfg.prefix}-icon`, quicknextIconClass,'num']"></span>
    </li>
    <li
      v-if="pageCount > 1"
      :class="{ active: currentPage === pageCount, disabled }"
      class="number"
    >
      <span class="num">{{ pageCount }}</span>
    </li>
  </ul>
</template>

<script type="text/babel">
export default {
  name: 'Pager',

  props: {
    currentPage: Number,

    pageCount: Number,

    pagerCount: Number,

    disabled: Boolean,

    disabledMore: Boolean,
  },

  data() {
    return {
      current: null,
      showPrevMore: false,
      showNextMore: false,
      quicknextIconClass: 'ui-icon-fill-currency-more',
      quickprevIconClass: 'ui-icon-fill-currency-more',
      pagersArr: [],
    };
  },

  computed: {
    changeData() {
      const { pagerCount, currentPage, pageCount } = this;
      return {
        pagerCount,
        currentPage,
        pageCount
      }
    },
    pagers() {
      const pagerCount = this.pagerCount;
      const currentPage = Number(this.currentPage);
      const pageCount = Number(this.pageCount);

      const array = [];
      if (this.showPrevMore && !this.showNextMore) {
        const startPage = pageCount - (pagerCount - 2);
        for (let i = startPage; i < pageCount; i++) {
          array.push(i);
        }
      } else if (!this.showPrevMore && this.showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i);
        }
      } else if (this.showPrevMore && this.showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1;
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i);
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i);
        }
      }
      return array;
    }
  },

  watch: {
    showPrevMore(val) {
      if (!val) this.quickprevIconClass = 'ui-icon-fill-currency-more';
    },

    showNextMore(val) {
      if (!val) this.quicknextIconClass = 'ui-icon-fill-currency-more';
    },
    changeData: {
      handler: function (newval) {
        const pagerCount = newval.pagerCount;
        const halfPagerCount = (pagerCount - 1) / 2;

        const currentPage = Number(newval.currentPage);
        const pageCount = Number(newval.pageCount);

        let showPrevMore = false;
        let showNextMore = false;

        if (pageCount > pagerCount) {
          if (currentPage > pagerCount - halfPagerCount) {
            showPrevMore = true;
          }

          if (currentPage < pageCount - halfPagerCount) {
            showNextMore = true;
          }
        }
        this.showPrevMore = showPrevMore;
        this.showNextMore = showNextMore;
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    onPagerClick(event) {
      const target = event.target;
      if (target.tagName === 'UL' || this.disabled) {
        return;
      }
      if (this.disabledMore && target.className.indexOf('more') !== -1) {
        return;
      }

      let newPage = Number(event.target.textContent);
      const pageCount = this.pageCount;
      const currentPage = this.currentPage;
      const pagerCountOffset = this.pagerCount - 2;

      if (target.className.indexOf('more') !== -1) {
        if (target.className.indexOf('quickprev') !== -1) {
          newPage = currentPage - pagerCountOffset;
        } else if (target.className.indexOf('quicknext') !== -1) {
          newPage = currentPage + pagerCountOffset;
        }
      }

      /* istanbul ignore if */
      if (!Number.isNaN(newPage)) {
        if (newPage < 1) {
          newPage = 1;
        }

        if (newPage > pageCount) {
          newPage = pageCount;
        }
      }

      if (newPage !== currentPage) {
        this.$emit('change', newPage);
      }
    },

    onMouseenter(direction) {
      if (this.disabled || this.disabledMore) return;
      if (direction === 'left') {
        this.quickprevIconClass = 'ui-icon-line-direction-doubleleft';
      } else {
        this.quicknextIconClass = 'ui-icon-line-direction-doubleright';
      }
    }
  }
};
</script>
