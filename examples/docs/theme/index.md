<script>
import scssGlobals from 'theme/variables.scss'
import { getColorPanelMap } from 'docs/color/models'

const darkFonts = ['#DDDDDD', '#EEEEEE', '#F6F6F6', '#F8F8F8', '#FFFFFF', '#fff']

export default {
  created() {
    this.$initColor()
  },
  mounted() {},
  methods: {
    $isInDarkFontList(color) {
      return darkFonts.indexOf(color) >= 0
    },
    $changeColor(eve, index) {
      this.colorPanelMap[index]['color'] = eve.target.value.toUpperCase()
      axios.post('/api/defineTheme', this.colorPanelMap).then(res => {
        console.info(res)
      }).catch(err => {
        console.info('$changeColor:', err)
      })
    },
    $initColor() {
      this.globals = JSON.parse(JSON.stringify(scssGlobals))
      this.colorPanelMap = getColorPanelMap(this.globals)
    }
  },
  data() {
    return {
      globals: {},
      colorPanelMap: [],
      themeName: 'theme-'
    }
  },
  watch: {
  }
}
</script>

<template>
  <section class="hf-ui-doc-theme-define">
    <div class="them-define-left">
      <h2>自定义主题</h2>
      <p>如果您感觉我们的配色方案不满足您的需求，您可以自定配色方案。</p>
      <h3>色板</h3>
      <p>整套页面皮肤所使用到的颜色总概况</p>
      <ul class="hf-ui-doc-color-panel">
        <li v-for="(colorHex, index) in colorPanelMap" :key="index" :style="{backgroundColor: colorHex.color}" :class="[$isInDarkFontList(colorHex.color) ? 'dark-font': '']">
          {{colorHex.color}}
        </li>
      </ul>
      <h3>Button</h3>
      <div class="hf-doc-button-demo">
        <hf-ui-button>默认按钮</hf-ui-button>
        <hf-ui-button type="primary">主要按钮</hf-ui-button>
        <hf-ui-button type="secondary">次要按钮</hf-ui-button>
        <hf-ui-button type="commonly">次次要按钮</hf-ui-button>
        <hf-ui-button type="light">次次次要按钮</hf-ui-button>
        <hf-ui-button type="warning">警示按钮</hf-ui-button>
      </div>
    </div>
    <div class="theme-define-right">
      <p>用户自定义配色方案</p>
      <div class="right-btn-row">
        <hf-ui-button type="default" size="medium">重置</hf-ui-button>
        <hf-ui-button type="secondary" size="medium">保存方案</hf-ui-button>
      </div>
      <ul class="hf-ui-doc-color-panel">
        <li v-for="(colorHex, index) in colorPanelMap" :key="index" :style="{backgroundColor: colorHex.color}" :class="[$isInDarkFontList(colorHex.color) ? 'dark-font': '']">
          {{colorHex.color}}
          <input type="color" :value="colorHex.color" @change="function(event){$changeColor(event, index)}">
        </li>
      </ul>
    </div>
  </section>
</template>
