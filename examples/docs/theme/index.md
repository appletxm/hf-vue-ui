<script>
import scssGlobals from 'theme/variables.scss'
import { getMainColors, getSubColors, getNormalColors, darkFonts } from 'docs/color/models'
import { getChangeColorFile } from './models'

export default {
  created() {
    this.$initColor()
  },
  mounted() {},
  methods: {
    $isInDarkFontList(color) {
      return darkFonts.indexOf(color) >= 0
    },
    $changeColor(eve, index, colorType) {
      let params

      this[colorType][index]['color'] = eve.target.value.toUpperCase()
      params = getChangeColorFile(this.mainColor, this.subColor, this.normalColor)

      axios.post('/api/defineTheme/change', params).then(res => {
        if (res.data.cssFilePath) {
          document.querySelector('#js-user-define-theme').setAttribute('href', res.data.cssFilePath)
        }
      }).catch(err => {
        console.info('$changeColor:', err)
      })
    },
    $initColor() {
      this.globals = JSON.parse(JSON.stringify(scssGlobals))
      this.mainColor = getMainColors(scssGlobals)
      this.subColor = getSubColors(scssGlobals)
      this.normalColor = getNormalColors(scssGlobals)
    },
    $resetTheme() {
      this.$initColor()
      document.querySelector('#js-user-define-theme').removeAttribute('href')
    },
    $saveTheme() {
      axios.post('/api/defineTheme/save', getChangeColorFile(this.mainColor, this.subColor, this.normalColor)).then(res => {
        const { data } = res
        if (data && data.zipFilePath) {
          let a = document.createElement('a')
          a.href = data.zipFilePath
          // a.download = this.$store.state.appPrefix
          a.click()
        }
      }).catch(err => {
        console.info('$changeColor:', err)
      })
    },
    $getNormalColorOpacity(key) {
      if (key === 'clr_mask') {
        return 0.7
      } else if (key === 'clr_projection') {
        return 0.1
      } else {
        return 1
      }
    }
  },
  data() {
    return {
      mainColor: [],
      subColor: [],
      normalColor: [],
      globals: {},
      themeName: 'theme-'
    }
  },
  watch: {}
}
</script>

<template>
  <section class="hf-ui-doc-theme-define">
    <div class="theme-define-right">
      <p>用户自定义配色方案</p>
      <div class="btn-row">
        <hf-ui-button type="default" size="medium" @click="$resetTheme">重置</hf-ui-button>
        <hf-ui-button type="secondary" size="medium" @click="$saveTheme">保存方案</hf-ui-button>
      </div>
      <ul class="hf-ui-doc-color-panel hf-ui-doc-change">
        <li v-for="(item, index) in mainColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[$isInDarkFontList(item.color) ? 'dark-font': '']">
          <span :style="{backgroundColor: item['color']}">
            <i>.{{item.key}}</i>
            <i>{{item.color}}</i>
          </span>
          <input type="color" :value="item.color" @change="function(event){$changeColor(event, index, 'mainColor')}">
        </li>
        <li v-for="(item, index) in subColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[$isInDarkFontList(item.color) ? 'dark-font': '']">
          <span :style="{backgroundColor: item['color']}">
            <i>.{{item.key}}</i>
            <i>{{item.color}}</i>
          </span>
          <input type="color" :value="item.color" @change="function(event){$changeColor(event, index, 'subColor')}">
        </li>
        <li v-for="(item, index) in normalColor" :key="index + item.key" :style="{backgroundColor: item.color}" :class="[$isInDarkFontList(item.color) ? 'dark-font': '']">
          <span :style="{backgroundColor: item['color']}">
            <i>.{{item.key}}</i>
            <i>{{item.color}}</i>
          </span>
          <input type="color" :value="item.color" @change="function(event){$changeColor(event, index, 'normalColor')}">
        </li>
      </ul>
    </div> 
    <div class="theme-define-left">
      <h2>自定义主题</h2>
      <p>如果您感觉我们的配色方案不满足您的需求，您可以自定配色方案。</p>
      <h3>主色</h3>
      <p>金色为产品品牌色，主色调使用顺序从左至右，优先使用.clr_main01。</p>
      <ul class="hf-ui-doc-color-main">
        <li v-for="item in mainColor">
          <span :style="{backgroundColor: item['color']}">
            <i>.{{item.key}}</i>
            <i>{{item.color}}</i>
          </span>
          <p :style="{backgroundColor: item['color'], opacity: '0.2'}">20%</p>
          <p :style="{backgroundColor: item['color'], opacity: '0.4'}">40%</p>
          <p :style="{backgroundColor: item['color'], opacity: '0.6'}">60%</p>
          <p :style="{backgroundColor: item['color'], opacity: '0.8'}">80%</p>
          <p :style="{backgroundColor: item['color']}">100%</p>
          <b>{{item.label}}</b>
        </li>
      </ul>
      <h3>辅助色</h3>
      <p>辅助色作用多用于辅助按钮以及提示成功、警示或失败。</p>
      <ul class="hf-ui-doc-color-main">
        <li v-for="item in subColor">
          <span :style="{backgroundColor: item['color']}">
            <i>.{{item.key}}</i>
            <i>{{item.color}}</i>
          </span>
          <b>{{item.label}}</b>
        </li>
      </ul>
      <h3>常用色</h3>
      <p>多用于文字、图标、边框、背景、阴影等可以体现的页面的层次结构</p>
      <ul class="hf-ui-doc-color-main">
        <li v-for="item in normalColor">
          <span :style="{backgroundColor: item['color'], opacity: $getNormalColorOpacity(item.key)}" :class="[$isInDarkFontList(item.color) ? 'dark-font': '']">
            <i>.{{item.key}}</i>
            <i>{{item.color}}{{item.key === 'clr_mask' ? '70':''}}{{item.key === 'clr_projection' ? '10':''}}</i>
          </span>
          <b>{{item.label}}</b>
        </li>
      </ul>
      <h3>Button</h3>
      <div class="hf-doc-button-demo">
        <hf-ui-button>默认按钮</hf-ui-button>
        <hf-ui-button type="primary">主要按钮</hf-ui-button>
        <hf-ui-button type="secondary">次要按钮</hf-ui-button>
        <hf-ui-button type="commonly">次次要按钮</hf-ui-button>
        <hf-ui-button type="light">次次次要按钮</hf-ui-button>
        <hf-ui-button type="important">重要按钮</hf-ui-button>
      </div>
    </div> 
  </section>
</template>
