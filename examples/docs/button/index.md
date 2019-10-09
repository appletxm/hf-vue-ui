## Button 按钮
常用的操作按钮。

### 基础用法

基础的按钮用法。

:::demo 类型：`primary`、`secondary`、`commonly`、`light`、`important` 通过设置`type`属性来配置它们。

```html
<div class="hf-doc-button-demo">
  <hf-ui-button>默认按钮</hf-ui-button>
  <hf-ui-button type="primary">主要按钮</hf-ui-button>
  <hf-ui-button type="secondary">次要按钮</hf-ui-button>
  <hf-ui-button type="commonly">次次要按钮</hf-ui-button>
  <hf-ui-button type="light">次次次要按钮</hf-ui-button>
  <hf-ui-button type="important">重要按钮</hf-ui-button>
</div>

```
:::

### 禁用状态

按钮不可用状态。

:::demo 使用`disabled` 属性来定义 Button 的禁用状态。

```html
<div class="hf-doc-button-demo">
  <hf-ui-button disabled>默认按钮</hf-ui-button>
  <hf-ui-button type="primary" disabled>主要按钮</hf-ui-button>
  <hf-ui-button type="secondary" disabled>次要按钮</hf-ui-button>
  <hf-ui-button type="commonly" disabled>次次要按钮</hf-ui-button>
  <hf-ui-button type="light" disabled>次次次要按钮</hf-ui-button>
  <hf-ui-button type="important" disabled>重要按钮</hf-ui-button>
</div>

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

### 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

:::demo 设置icon属性即可，icon 的列表可以参考 icon 组件，也可以设置在文字右边的 icon ，只要使用i标签即可，可以使用自定义图标。

```html
<div class="hf-doc-button-demo">
  <hf-ui-button icon="ui-icon-arrowdown">默认按钮</hf-ui-button>
  <hf-ui-button size="big" icon="ui-icon-arrowdown">大型按钮</hf-ui-button>
  <hf-ui-button size="medium" icon="ui-icon-arrowdown">中等按钮</hf-ui-button>
  <hf-ui-button size="small" icon="ui-icon-arrowdown">小型按钮</hf-ui-button>
  <hf-ui-button size="big" icon="ui-icon-arrowdown" type="light"></hf-ui-button>
  <hf-ui-button>默认按钮<i class="hf-ui-icon ui-icon-arrowdown"></i></hf-ui-button>
</div>
```
:::

### Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   big / medium / small            |    —     |
| type     | 类型   | string    |   primary / secondary / commonly / light / important |     —    |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |
