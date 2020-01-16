<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div ref="meta" class="meta">
      <div v-if="$slots.default" class="description">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      ref="control"
      class="demo-block-control"
      :class="{ 'is-fixed': fixedControl }"
      @click="isExpanded = !isExpanded"
    >
      <i :class="[iconClass, { 'hovering': hovering }]"></i>
      <span>{{ controlText }}</span>

      <!-- <hf-ui-tooltip effect="dark" :content="langConfig['tooltip-text']" placement="right">
        <transition name="text-slide">
          <hf-ui-button
            v-show="hovering || isExpanded"
            size="small"
            type="text"
            class="control-button"
            @click.stop="goCodepen"
          >
            {{ langConfig['button-text'] }}
          </hf-ui-button>
        </transition>
      </hf-ui-tooltip> -->
    </div>
  </div>
</template>

<script type="text/babel">
/* eslint-disable */
import { stripScript, stripStyle, stripTemplate } from 'utils/util';
import compoLang from '../i18n/component.json';
const { version } = '1.0.0';

export default {
  data() {
    return {
      codepen: {
        script: '',
        html: '',
        style: ''
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null
    };
  },

  methods: {
    goCodepen() {
      const { script, html, style } = this.codepen;
      const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>' +
      '\n<scr' + `ipt src="//unpkg.com/element-ui@${ version }/lib/index.js"></scr` + 'ipt>';
      let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
      let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
      let cssTpl = `@import url("//unpkg.com/element-ui@${ version }/lib/theme-chalk/index.css");\n${(style || '').trim()}\n`;
      jsTpl = jsTpl
        ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
        : 'new Vue().$mount(\'#app\')';
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: htmlTpl
      };
      const form = document.getElementById('fiddle-form') || document.createElement('form');
      while (form.firstChild) {
        form.removeChild(form.firstChild);
      }
      form.method = 'POST';
      form.action = 'https://codepen.io/pen/define/';
      form.target = '_blank';
      form.style.display = 'none';

      const input = document.createElement('input');
      input.setAttribute('name', 'data');
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', JSON.stringify(data));

      form.appendChild(input);
      document.body.appendChild(form);

      form.submit();
    },

    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect();
      this.fixedControl = bottom > document.documentElement.clientHeight && top + 44 <= document.documentElement.clientHeight;
      this.$refs.control.style.left = this.fixedControl ? `${ left }px` : '0';
    },

    removeScrollHandler() {
      this.scrollParent && this.scrollParent.removeEventListener('scroll', this.scrollHandler);
    }
  },

  computed: {
    lang() {
      // return this.$route.path.split('/')[1];
      return 'zh-CN'
    },

    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['demo-block'];
    },

    blockClass() {
      return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
    },

    iconClass() {
      return this.isExpanded ? 'hf-ui-icon ui-icon-fill-direction-up' : 'hf-ui-icon ui-icon-fill-direction-down';
    },

    controlText() {
      return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    }
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
      if (!val) {
        this.fixedControl = false;
        this.$refs.control.style.left = '0';
        this.removeScrollHandler();
        return;
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector('.router-content');
        this.scrollParent && this.scrollParent.addEventListener('scroll', this.scrollHandler);
        this.scrollHandler();
      }, 200);
    }
  },

  created() {
    const highlight = this.$slots.highlight;
    if (highlight && highlight[0]) {
      let code = '';
      let cur = highlight[0];
      if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
        cur = cur.children[0];
        if (cur.tag === 'code') {
          code = cur.children[0].text;
        }
      }
      if (code) {
        this.codepen.html = stripTemplate(code);
        this.codepen.script = stripScript(code);
        this.codepen.style = stripStyle(code);
      }
    }
  },

  mounted() {
    this.$nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0];
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%';
        highlight.borderRight = 'none';
      }
    });
  },

  beforeDestroy() {
    this.removeScrollHandler();
  }
};
/* eslint-enable */
</script>
