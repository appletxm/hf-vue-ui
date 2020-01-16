<script>
import scssGlobals from 'theme/variables.scss'
import { parseGlobals, getMainColors, getSubColors, getNormalColors, darkFonts, getTopMenuColor, getSideMenuColors, isInDarkFontList, getRegbaColor, getNormalColorOpacity } from 'docs/color/models'
import { getChangeColorFile } from './models'

import DemoButton from './demo-button'
import DemoMenu from './demo-menu'
import DemoBreadCrumb from './demo-breadcrumb'
import DemoSwitch from './demo-switch'
import DemoTab from './demo-tab'
import DemoTooltip from './demo-tooltip'
import DemoPagination from './demo-pagination'
import DemoCarousel from './demo-carousel'
import DemoRadio from './demo-radio'
import DemoSpinner from './demo-spinner'
import DemoCheckbox from './demo-checkbox'
import DemoInput from './demo-input'
import DemoTree from './demo-tree'

const globalColors = parseGlobals(scssGlobals)

export default {
  data() {
    return {
      mainColor: [],
      subColor: [],
      normalColor: [],
      topMenuColor: [],
      sideMenuColor: [],
      globals: {},
      themeName: 'theme-',

      isInDarkFontList, 
      getRegbaColor, 
      getNormalColorOpacity,
      isLoading: false
    }
  },
  watch: {},
  components: {
    DemoButton,
    DemoMenu,
    DemoBreadCrumb,
    DemoSwitch,
    DemoTab,
    DemoTooltip,
    DemoPagination,
    DemoCarousel,
    DemoRadio,
    DemoSpinner,
    DemoCheckbox,
    DemoInput,
    DemoTree
  },
  methods: {
    $isInDarkFontList(color) {
      return darkFonts.indexOf(color) >= 0
    },
    $changeColor(color, index, colorType) {
      let params
      let colors = []

      this[colorType][index]['color'] = color ? color.toUpperCase() : ''
      colors = colors.concat(this.mainColor, this.subColor, this.normalColor, this.topMenuColor, this.sideMenuColor)
      params = getChangeColorFile(colors)

      this.isLoading = true

      axios.post('/api/defineTheme/change', params).then(res => {
        if (res.data.cssFilePath) {
          document.querySelector('#js-user-define-theme').setAttribute('href', res.data.cssFilePath)
        }
        this.isLoading = false
      }).catch(err => {
        console.info('$changeColor:', err)
        this.isLoading = false
      })
    },
    $initColor() {
      this.globals = JSON.parse(JSON.stringify(globalColors))
      this.mainColor = getMainColors(globalColors)
      this.subColor = getSubColors(globalColors)
      this.normalColor = getNormalColors(globalColors)
      this.topMenuColor = getTopMenuColor(globalColors)
      this.sideMenuColor = getSideMenuColors(globalColors)
    },
    $resetTheme() {
      this.$initColor()
      document.querySelector('#js-user-define-theme').removeAttribute('href')
    },
    $saveTheme() {
      let colors = []
      colors = colors.concat(this.mainColor, this.subColor, this.normalColor, this.topMenuColor, this.sideMenuColor)
      this.isLoading = true
      axios.post('/api/defineTheme/save', getChangeColorFile(colors)).then(res => {
        const { data } = res
        this.isLoading = false
        if (data && data.zipFilePath) {
          let a = document.createElement('a')
          a.href = data.zipFilePath
          // a.download = this.$store.state.appPrefix
          a.click()
        }
      }).catch(err => {
        this.isLoading = false
        console.info('$changeColor:', err)
      })
    }
  },
  created() {
    this.$initColor()
  },
  mounted() {}
}
</script>

<template>
  <section class="hf-ui-doc-theme-define" v-loading="isLoading" type="area" element-loading-spinner="ui-icon-line-currency-loading">
    <div class="theme-define-right">
      <p>用户自定义配色方案</p>
      <div class="btn-row">
        <hf-ui-button type="default" size="medium" @click="$resetTheme">重置</hf-ui-button>
        <hf-ui-button type="secondary" size="medium" @click="$saveTheme">保存方案</hf-ui-button>
      </div>
      <div class="hf-ui-doc-change">
        <h5>主色</h5>
        <ul class="hf-ui-doc-color-panel">
          <li v-for="(item, index) in mainColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[isInDarkFontList(item.color) ? 'dark-font': '']">
            <span>
              <i>.{{item.key}}</i>
              <i>{{item.color}}</i>
            </span>
            <hf-ui-color-picker v-model="item.color" :color-format="'hex'" popper-class="disable-clear-btn" @change="function(color){$changeColor(color, index, 'mainColor')}" />
          </li>
        </ul>
        <h5>辅助色</h5>
        <ul class="hf-ui-doc-color-panel">
          <li v-for="(item, index) in subColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[isInDarkFontList(item.color) ? 'dark-font': '']">
            <span>
              <i>.{{item.key}}</i>
              <i>{{item.color}}</i>
            </span>
            <hf-ui-color-picker v-model="item.color" :color-format="'hex'" popper-class="disable-clear-btn" @change="function(color){$changeColor(color, index, 'subColor')}" />
          </li>
        </ul>
        <h5>常用色</h5>
        <ul class="hf-ui-doc-color-panel">
          <li v-for="(item, index) in normalColor" :key="index + item.key" :style="getRegbaColor(item.key, item['color'], getNormalColorOpacity(item.key))" :class="[isInDarkFontList(item.color) ? 'dark-font': '']">
            <span>
              <i>.{{item.key}}</i>
              <i>{{item.color}}{{item.key === 'clr_mask' ? '70':''}}</i>
            </span>
            <hf-ui-color-picker v-model="item.color" :color-format="'hex'" popper-class="disable-clear-btn" @change="function(color){$changeColor(color, index, 'normalColor')}" />
          </li>
        </ul>
        <h5>导航用色(顶部导航)</h5>
        <ul class="hf-ui-doc-color-panel">
          <li v-for="(item, index) in topMenuColor" :key="index + item.key" :style="getRegbaColor(item.key, item['color'], getNormalColorOpacity(item.key))" :class="[isInDarkFontList(item.color) || item.key === 'clr_menu_top_projection' ? 'dark-font': '']">
            <span>
              <i>.{{item.key}}</i>
              <i>{{item.color}}{{item.key === 'clr_menu_top_projection' ? '05':''}}</i>
            </span>
            <hf-ui-color-picker v-model="item.color" :color-format="'hex'" popper-class="disable-clear-btn" @change="function(color){$changeColor(color, index, 'topMenuColor')}" />
          </li>
        </ul>
        <h5>导航用色(侧边导航)</h5>
        <ul class="hf-ui-doc-color-panel">
          <li v-for="(item, index) in sideMenuColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[isInDarkFontList(item.color) ? 'dark-font': '']">
            <span>
              <i>.{{item.key}}</i>
              <i>{{item.color}}</i>
            </span>
            <hf-ui-color-picker v-model="item.color" :color-format="'hex'" popper-class="disable-clear-btn" @change="function(color){$changeColor(color, index, 'sideMenuColor')}" />
          </li>
        </ul>
      </div>
    </div> 
    <div class="theme-define-left">
      <h2>自定义主题</h2>
      <p>如果您感觉我们的配色方案不满足您的需求，您可以自定配色方案。</p>
      <h3>Button</h3>
      <demo-button />
      <h3>Menu</h3>
      <demo-menu />
      <h3>Breadcrumb</h3>
      <demo-bread-crumb />
      <h3>Tabs</h3>
      <demo-tab />
      <h3>Switch</h3>
      <demo-switch />
      <h3>Radio</h3>
      <demo-radio />
      <h3>CheckBox</h3>
      <demo-checkbox />
      <h3>Input</h3>
      <demo-input />
      <h3>Poptip</h3>
      <demo-tooltip />
      <h3>Pagination</h3>
      <demo-pagination />
      <h3>Carousel</h3>
      <demo-carousel />
      <h3>Spin</h3>
      <demo-spinner />
      <h3>Tree</h3>
      <demo-tree />
    </div> 
  </section>
</template>
