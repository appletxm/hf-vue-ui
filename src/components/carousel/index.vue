<template>
  <div
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div
      v-if="type === 'column'"
      :class="[`${cfg.prefix}-carousel__indicators-wrap`]"
    >
      <span :class="[`${cfg.prefix}-carousel__indicator-title`]">
        {{ indicatorTitle }}
      </span>
      <ul
        :class="indicatorsClasses"
      >
        <li
          v-for="(item, index) in items"
          :key="index"
          :class="[
            `${cfg.prefix}-carousel__indicator`,
            `${cfg.prefix}-carousel__indicator--horizontal`,
            { 'is-active': index === activeIndex }]"
          @mouseenter="throttledIndicatorHover(index)"
          @click.stop="handleIndicatorClick(index)"
        >
          <button :class="[`${cfg.prefix}-carousel__button`]">
            <span>{{ index + 1 }}</span>
          </button>
        </li>
      </ul>
    </div>
    <div
      :class="[`${cfg.prefix}-carousel__container`]"
      :style="{ height: containerHeight }"
    >
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-left"
      >
        <button
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          type="button"
          :class="[`${cfg.prefix}-carousel__arrow ${cfg.prefix}-carousel__arrow--left`]"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
        >
          <i :class="[`${cfg.prefix}-icon ui-icon-line-direction-left`]"></i>
        </button>
      </transition>
      <transition
        v-if="arrowDisplay"
        name="carousel-arrow-right"
      >
        <button
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          type="button"
          :class="[`${cfg.prefix}-carousel__arrow ${cfg.prefix}-carousel__arrow--right`]"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <i :class="[`${cfg.prefix}-icon ui-icon-line-direction-right`]"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul
      v-if="type !== 'column' && indicatorPosition !== 'none'"
      :class="indicatorsClasses"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          `${cfg.prefix}-carousel__indicator`,
          `${cfg.prefix}-carousel__indicator--` + direction,
          { 'is-active': index === activeIndex }]"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <button :class="[`${cfg.prefix}-carousel__button`]">
          <span v-if="hasLabel">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { addResizeListener, removeResizeListener } from '../../utils/resize-event';

export default {
  name: 'Carousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'click'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 5000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'never'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      }
    },
    indicatorTitle: String,
    background: {
      type: Boolean,
      default: false,
    },
    autosize: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      containerHeight: this.height,
      timer: null,
      hover: false
    };
  },

  computed: {
    arrowDisplay() {
      return this.arrow !== 'never' && this.direction !== 'vertical';
    },

    hasLabel() {
      return this.items.some((item) => item.label.toString().length > 0);
    },
    carouselClasses() {
      const classes = [`${this.cfg.prefix}-carousel`, `${this.cfg.prefix}-carousel--` + this.direction];
      if (this.background) {
        classes.push('is-background');
      }
      if (this.type === 'card') {
        classes.push(`${this.cfg.prefix}-carousel--card`);
      }
      if (this.type === 'column') {
        classes.push(`${this.cfg.prefix}-carousel--column`);
      }
      return classes;
    },

    indicatorsClasses() {
      const classes = [`${this.cfg.prefix}-carousel__indicators`];
      if (this.type === 'column') {
        classes.push(`${this.cfg.prefix}-carousel__indicators--column`);
      } else {
        classes.push(`${this.cfg.prefix}-carousel__indicators--${this.direction}`);
        if (this.hasLabel) {
          classes.push(`${this.cfg.prefix}-carousel__indicators--labels`);
        }
        if (this.indicatorPosition === 'outside' || this.type === 'card') {
          classes.push(`${this.cfg.prefix}-carousel__indicators--outside`);
        }
      }
      return classes;
    }
  },

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit('change', val, oldVal);
      }
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    }
  },

  created() {
    this.throttledArrowClick = throttle(300, true, (index) => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, (index) => {
      this.handleIndicatorHover(index);
    });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },
  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
    this.pauseTimer();
  },

  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active
        || (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active
        || (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },

    handleButtonEnter(arrow) {
      if (this.direction === 'vertical') return;
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      if (this.direction === 'vertical') return;
      this.items.forEach((item) => {
        item.hover = false;
      });
    },

    updateItems() {
      this.items = this.$children.filter((child) => child.$options.componentName === 'CarouselItem');
    },

    resetItemPosition(oldIndex) {
      let theHeight = this.height;
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
        if (this.autosize) {
          if (item.$el && item.$el.offsetHeight && (item.$el.offsetHeight > parseInt(this.height, 10) || !this.height)) {
            theHeight = `${item.$el.offsetHeight}px`;
          }
        }
      });
      this.containerHeight = theHeight;
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay || this.timer) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (Number.isNaN(index) || index !== Math.floor(index)) {
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      const length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },

    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    }
  }
};
</script>
