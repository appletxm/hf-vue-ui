## Breadcrumb 面包屑
面包屑在界面中是一种辅助导航。它提供了一个当前页面在整个网站中位置和路径的文字描述，表明了用户的导航轨迹，设计简单，文字内容前后关联，是一种简洁、高效的导航工具。

### 基础用法
适用广泛的基础用法。

:::demo 在`hf-ui-breadcrumb`中使用`hf-ui-breadcrumb-item`标签表示从首页开始的每一级。Element 提供了一个separator属性，在`hf-ui-breadcrumb`标签中设置它来决定分隔符，它只能是字符串，默认为斜杠/。

```html
<div class="hf-doc-button-demo">
  <hf-ui-breadcrumb separator="/">
    <hf-ui-breadcrumb-item :to="{ path: '/' }">首页</hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item><a href="/">活动管理</a></hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item>活动列表</hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item>活动详情</hf-ui-breadcrumb-item>
  </hf-ui-breadcrumb>
</div>
```
:::

### 图标分隔符

:::demo 通过设置 `separator-class` 可使用相应的 `iconfont` 作为分隔符，注意这将使 `separator` 设置失效

```html
<div class="hf-doc-button-demo">
  <hf-ui-breadcrumb separator-class="hf-ui-icon ui-icon-line-direction-right">
    <hf-ui-breadcrumb-item :to="{ path: '/' }">首页</hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item>活动管理</hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item>活动列表</hf-ui-breadcrumb-item>
    <hf-ui-breadcrumb-item>活动详情</hf-ui-breadcrumb-item>
  </hf-ui-breadcrumb>
</div>
```
:::


### Breadcrumb Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| separator     | 分隔符	   | string |   -      |    斜杠'/'     |
| separator-class     | 图标分隔符 class   | string    |   - |     —    |

### Breadcrumb Item Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| to     | 路由跳转对象，同 `vue-router` 的 `to`	   | string/object |   -      |    -     |
| replace     | 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录   | boolean    |   - |   false   |