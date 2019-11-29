## Poptip 气泡提示

当用户与被说明对象（文字，图片，输入框等）发生交互行为的action开始时, 即刻跟随动作出现一种辅助或帮助的提示信息。

### 基础用法
Poptip 基于`Vue-popper`开发的。

:::demo `trigger`属性用于设置何时触发 Poptip，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。对于触发 Poptip 的元素，有两种写法：使用 `slot="reference"` 的具名插槽，或使用自定义指令`v-pop-tip`指向 Poptip 的索引`ref`。
```html
<div class="hf-ui-poptip-demo">
  <div class="row">
    <div class="col">
      <p>基本</p>
      <hf-ui-pop-tip
        placement="bottom-start"
        trigger="hover"
        content="提示文案">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
    <div class="col">
      <p>最大宽度为300px</p>
      <hf-ui-pop-tip
        placement="bottom-start"
        max-width="300"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
    <div class="col">
      <p>最大高度为296px</p>
      <hf-ui-pop-tip
        placement="bottom-start"
        max-width="300"
        max-height="296"
        trigger="hover"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容,这是一段内容,这是一段内容,这是一段内容,这是一段内容
        这是一段内容,这是一段内容,这是一段内容,这是一段内容这是一段内容,这是一段内容这是一段内容,这是一段内容这是一段内容,这是一段内容,最大高度为296px,最大高度为296px,最大高度为296px,最大高度为296px,最大高度为296px最后的内容。">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
  </div>
   <div class="row">
    <div class="col">
      <p>上左</p>
      <hf-ui-pop-tip
        placement="top-end"
        trigger="hover"
        content="提示文案">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
   <div class="col">
      <p>上右</p>
      <hf-ui-pop-tip
        placement="top-start"
        trigger="hover"
        content="提示文案">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
    <div class="col">
      <p>下左</p>
      <hf-ui-pop-tip
        placement="bottom-end"
        trigger="hover"
        content="提示文案">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
    <div class="col">
      <p>下右</p>
      <hf-ui-pop-tip
        placement="bottom-start"
        trigger="hover"
        content="提示文案">
        <i class="hf-ui-icon ui-icon-line-currency-question" slot="reference"></i>
      </hf-ui-pop-tip>
    </div>
  </div>
</div>
<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::

### 不同触发方式
Poptip 基于`Vue-popper`开发的。

:::demo `trigger`属性用于设置何时触发 Poptip，支持四种触发方式：`hover`，`click`，`focus` 和 `manual`。对于触发 Poptip 的元素，有两种写法：使用 `slot="reference"` 的具名插槽，或使用自定义指令`v-pop-tip`指向 Poptip 的索引`ref`。
```html
<hf-ui-pop-tip
  placement="top-start"
  title="标题"
  width="200"
  trigger="hover"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  <hf-ui-button slot="reference">hover 激活</hf-ui-button>
</hf-ui-pop-tip>

<hf-ui-pop-tip
  placement="bottom"
  title="标题"
  width="200"
  trigger="click"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
  <hf-ui-button slot="reference">click 激活</hf-ui-button>
</hf-ui-pop-tip>
<hf-ui-pop-tip
  ref="popover"
  placement="right"
  title="标题"
  width="200"
  trigger="focus"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
</hf-ui-pop-tip>
<hf-ui-button v-pop-tip:popover>focus 激活</hf-ui-button>
<hf-ui-pop-tip
  placement="bottom"
  title="标题"
  width="200"
  trigger="manual"
  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  v-model="visible">
  <hf-ui-button slot="reference" @click="visible = !visible">手动激活</hf-ui-button>
</hf-ui-pop-tip>
<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>
```
:::

<!-- ### 嵌套信息

可以在 Popover 中嵌套多种类型信息，以下为嵌套表格的例子。

:::demo 利用分发取代`content`属性
```html
<hf-ui-pop-tip
  placement="right"
  width="400"
  trigger="click">
  <hf-ui-table :data="gridData">
    <hf-ui-table-column width="150" property="date" label="日期"></hf-ui-table-column>
    <hf-ui-table-column width="100" property="name" label="姓名"></hf-ui-table-column>
    <hf-ui-table-column width="300" property="address" label="地址"></hf-ui-table-column>
  </hf-ui-table>
  <hf-ui-button slot="reference">click 激活</hf-ui-button>
</hf-ui-pop-tip>

<script>
  export default {
    data() {
      return {
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
      };
    }
  };
</script>
```
::: -->

### 嵌套操作

当然，你还可以嵌套操作，这相比 Dialog 更为轻量：

:::demo
```html
<hf-ui-pop-tip
  placement="top"
  width="160"
  v-model="visible">
  <p>这是一段内容这是一段内容确定删除吗？</p>
  <div style="text-align: right; margin: 0">
    <hf-ui-button size="mini" type="text" @click="visible = false">取消</hf-ui-button>
    <hf-ui-button type="primary" size="mini" @click="visible = false">确定</hf-ui-button>
  </div>
  <hf-ui-button slot="reference">删除</hf-ui-button>
</hf-ui-pop-tip>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    }
  }
</script>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| trigger | 触发方式 | String  | click/focus/hover/manual |    click    |
|  title              | 标题 | String | — | — |
|  content        |  显示的内容，也可以通过 `slot` 传入 DOM   | String            | — | — |
|  width        |  宽度  | String, Number            | — | 最小宽度 150px |
|  max-width        |  最大宽度  | String, Number            | — |
|  max-height        |  最大高度  | String, Number            | — |
|  placement        |  出现位置  | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end |  bottom |
|  disabled       |  Popover 是否可用  | Boolean           | — |  false |
|  value / v-model        |  状态是否可见  | Boolean           | — |  false |
|  offset        |  出现位置的偏移量  | Number           | — |  0 |
|  transition     |  定义渐变动画      | String             | — | fade-in-linear |
|  visible-arrow   |  是否显示 Tooltip 箭头，更多参数可见[Vue-popper](https://github.com/element-component/vue-popper) | Boolean | — | true |
|  popper-options        | [popper.js](https://popper.js.org/documentation.html) 的参数 | Object            | 参考 [popper.js](https://popper.js.org/documentation.html) 文档 | `{ boundariesElement: 'body', gpuAcceleration: false }` |
| popper-class | 为 popper 添加类名 | String | — | — |
| open-delay | 触发方式为 hover 时的显示延迟，单位为毫秒 | Number | — | — |
| close-delay | 触发方式为 hover 时的隐藏延迟，单位为毫秒 | number | — | 200 |
| tabindex   | Popover 组件的 [tabindex](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex) | number | — | 0 |

### Slot
| 参数 | 说明 |
|--- | ---|
| — | Popover 内嵌 HTML 文本 |
| reference | 触发 Popover 显示的 HTML 元素 |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| show | 显示时触发 | — |
| after-enter | 显示动画播放完毕后触发 | — |
| hide | 隐藏时触发 | — |
| after-leave | 隐藏动画播放完毕后触发 | — |
