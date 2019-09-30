<script>
  import scssGlobals from 'theme/variables.scss'
  import { getColorsForColorPanel, getMainColors, getSubColors, getNormalColors } from './models'
  console.info('=======', scssGlobals)

  const darkFonts = ['#DDDDDD', '#EEEEEE', '#F6F6F6', '#F8F8F8', '#FFFFFF']

  export default {
    created() {},
    mounted() {
    },
    methods: {
      $isInDarkFontList(color) {
        return darkFonts.indexOf(color) >= 0
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
        colorPanel: getColorsForColorPanel(scssGlobals),
        mainColor: getMainColors(scssGlobals),
        subColor: getSubColors(scssGlobals),
        normalColor: getNormalColors(scssGlobals)
      }
    },
    watch: {
    }
  }
</script>

## 色彩 Color
为确保页面和组件统一性，建议设计和开发使用以下色板。因为需要考虑后续换肤问题，会存在多套皮肤的情况。为保证后续开发便捷性，规范组件颜色标注以及开发命名可参照下方命名规则。目的希望可根据下方定义只改样式色值就可实现全局换肤。<br/><br/>

换肤定义：在不改变布局情况下改变页面颜色。<br/>
主题定义：可改变布局以及颜色。<br/>

### 色彩方案一
<p class="hf-ui-color-theme-color">方案命名：color_v1</p><br/>

#### 色板
整套页面皮肤所使用到的颜色总概况
<ul class="hf-ui-doc-color-panel">
  <li v-for="color in colorPanel" :style="{backgroundColor: color}" :class="[$isInDarkFontList(color) ? 'dark-font': '']">{{color}}</li>
</ul>

#### 主色
金色为产品品牌色，主色调使用顺序从左至右，优先使用.clr_main01。
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

#### 辅助色
辅助色作用多用于辅助按钮以及提示成功、警示或失败。
<ul class="hf-ui-doc-color-main">
  <li v-for="item in subColor">
    <span :style="{backgroundColor: item['color']}">
      <i>.{{item.key}}</i>
      <i>{{item.color}}</i>
    </span>
    <b>{{item.label}}</b>
  </li>
</ul>

#### 常用色
多用于文字、图标、边框、背景、阴影等可以体现的页面的层次结构
<ul class="hf-ui-doc-color-main">
  <li v-for="item in normalColor">
    <span :style="{backgroundColor: item['color'], opacity: $getNormalColorOpacity(item.key)}" :class="[$isInDarkFontList(item.color) ? 'dark-font': '']">
      <i>.{{item.key}}</i>
      <i>{{item.color}}{{item.key === 'clr_mask' ? '70':''}}{{item.key === 'clr_projection' ? '10':''}}</i>
    </span>
    <b>{{item.label}}</b>
  </li>
</ul>
