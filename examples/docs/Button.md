## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

```html
<div>
  <hf-ui-button size="big">默认按钮</hf-ui-button>
  <hf-ui-button size="medium" type="primary">主要按钮</hf-ui-button>
  <hf-ui-button size="small" type="success">成功按钮</hf-ui-button>
</div>

<script>
  export default {
    data() {
      return {
        value: new Date()
      }
    }
  }
</script>
```
:::

### 不同尺寸

Button 组件提供大中小的三种尺寸，可以在不同场景下选择合适的按钮尺寸。

:::demo 尺寸：`big`、`medium`、`small`通过设置`size`属性来配置它们。

```html
<div class="hf-doc-button-demo">
  <hf-ui-button>默认按钮</hf-ui-button>
  <hf-ui-button size="big">大型按钮</hf-ui-button>
  <hf-ui-button size="medium">中等按钮</hf-ui-button>
  <hf-ui-button size="small">小型按钮</hf-ui-button>
</div>
```
:::

:::tip 这是tip信息
这是不对的哈
:::

:::warning 这是tip信息
这是不对的哈
:::

:::danger 这是tip信息
这是不对的哈
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
