<!-- <script>
  import scssGlobals from 'theme/variables.scss'

  export default {
    created() {},
    mounted() {},
    methods: {
    },
    data() {
      return {
        fontFamily: scssGlobals['fontFamily']
      }
    },
    watch: {
    }
  }
</script> -->

## 文字 Font
产品体系中常用到的文字

### 字体家族
为维护产品在不同平台以及浏览器显示的易读性和可读性，定义font-family如下：
:::tip
"Helvetica Neue", "Helvetica", "Arial", "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Source Han Sans SC", "Source Han Sans CN", "Source Han Sans TC","WenQuanYi Micro Hei", "sans-serif"
:::

### 字号
定义常用字号参考
:::demo
```html
<table class="hf-ui-doc-font">
  <thead>
    <tr>
      <th>层级</th>
      <th>font-size</th>
      <th>line-height</th>
      <th>举例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><hf-ui-h :size="1" :font-weight="400">H1</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="400">20px</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="400">30px</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="400">我们的使命是：<br/>为下一代打造更好的教育</hf-ui-h></td>
    </tr>
    <tr>
      <td><hf-ui-h :size="2" :font-weight="400">H2</hf-ui-h></td>
      <td><hf-ui-h :size="2" :font-weight="400">18px</hf-ui-h></td>
      <td><hf-ui-h :size="2" :font-weight="400">28px</hf-ui-h></td>
      <td><hf-ui-h :size="2" :font-weight="400">我们的使命是：<br/>为下一代打造更好的教育</hf-ui-h></td>
    </tr>
    <tr>
      <td><hf-ui-h :size="3" :font-weight="400">H3</hf-ui-h></td>
      <td><hf-ui-h :size="3" :font-weight="400">16px</hf-ui-h></td>
      <td><hf-ui-h :size="3" :font-weight="400">24px</hf-ui-h></td>
      <td><hf-ui-h :size="3" :font-weight="400">我们的使命是：<br/>为下一代打造更好的教育</hf-ui-h></td>
    </tr>
    <tr>
      <td><hf-ui-h :size="4" :font-weight="400">H4</hf-ui-h></td>
      <td><hf-ui-h :size="4" :font-weight="400">14px</hf-ui-h></td>
      <td><hf-ui-h :size="4" :font-weight="400">22px</hf-ui-h></td>
      <td><hf-ui-h :size="4" :font-weight="400">我们的使命是：<br/>为下一代打造更好的教育</hf-ui-h></td>
    </tr>
     <tr>
      <td><hf-ui-h :size="5" :font-weight="400">H5</hf-ui-h></td>
      <td><hf-ui-h :size="5" :font-weight="400">12px</hf-ui-h></td>
      <td><hf-ui-h :size="5" :font-weight="400">20px</hf-ui-h></td>
      <td><hf-ui-h :size="5" :font-weight="400">我们的使命是：<br/>为下一代打造更好的教育</hf-ui-h></td>
    </tr>
  </tbody>
</table>
```
:::

### 字重
定义常用字重
:::demo
```html
<table class="hf-ui-doc-font">
  <thead>
    <tr>
      <th>类型</th>
      <th>font-weight</th>
      <th>举例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><hf-ui-h :size="1" :font-weight="400">Regular</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="400">400</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="400">为下一代打造更好的教育</hf-ui-h></td>
    </tr>
     <tr>
      <td><hf-ui-h :size="1" :font-weight="600">Medium/Semibold</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="600">600</hf-ui-h></td>
      <td><hf-ui-h :size="1" :font-weight="600">为下一代打造更好的教育</hf-ui-h></td>
    </tr>
  </tbody>
</table>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | H1~H5 html元素的模拟   | number  |   1~5的数字            |   2     |
| font-weight     | 字体的blod值   | number    |   100~1000的数字 |     400    |
