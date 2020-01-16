## Pagination 分页

当数据量过多时，使用分页分解数据。

### 基础分页

当加载/渲染所有数据将花费很多时间时；
可切换页码浏览数据。

#### 基础用法
:::demo 设置`layout`，表示需要显示的内容，用逗号分隔，布局元素会依次显示。`prev`表示上一页，`next`为下一页，`pager`表示页码列表，除此以外还提供了`jumper`和`total`，`size`和特殊的布局符号`->`，`->`后的元素会靠右显示，`jumper`表示跳页元素，`total`表示总条目数，`size`用于设置每页显示的页码数量。
```html
<div class="block">
  <span class="demonstration">页数较少时的效果</span>
  <hf-ui-pagination
    layout="prev, pager, next, total"
    :total="60">
  </hf-ui-pagination>
</div>
<div class="block">
  <span class="demonstration">大于 6 页时的效果</span>
  <hf-ui-pagination
    layout="prev, pager, next, jumper, total"
    :total="1000">
  </hf-ui-pagination>
</div>
```
:::

#### 添加整体布局

:::demo 默认情况下，分页组件只按文档流显示，可通过添加whole-layout属性，设置组件高度为100px, 且水平垂直居中
```html
<div class="hf-ui-doc-pagination-demo-1">
  <hf-ui-pagination
    whole-layout
    layout="prev, pager, next, jumper, total"
    :total="1000">
  </hf-ui-pagination>
</div>
```
:::

#### 设置最大页码按钮数

:::demo 默认情况下，当总页数超过 6 页时，Pagination 会折叠多余的页码按钮。通过`pager-count`属性可以设置最大页码按钮数;默认情况，一页显示10条数据，可以通过`page-size`属性可以设置一页显示多少条
```html
<hf-ui-pagination
  :page-size="20"
  :pager-count="11"
  layout="prev, pager, next, jumper, total"
  :total="1000">
</hf-ui-pagination>
```
:::

#### 当只有一页时隐藏分页

当只有一页时，通过设置 `hide-on-single-page` 属性来隐藏分页。

:::demo
```html
<div>
 <hf-ui-switch v-model="value">
 </hf-ui-switch>
 <hf-ui-pagination
  :hide-on-single-page="value"
  :total="5"
  layout="prev, pager, next">
</hf-ui-pagination>
</div>

<script>
  export default {
    data() {
      return {
        value: false
      }
    }
  }
</script>
```
:::

#### 附加功能

根据场景需要，可以添加其他功能模块。

:::demo 此例是一个完整的用例，使用了`size-change`和`current-change`事件来处理页码大小和当前页变动时候触发的事件。`page-sizes`接受一个整型数组，数组元素为展示的选择每页显示个数的选项，`[100, 200, 300, 400]`表示四个选项，每页显示 100 个，200 个，300 个或者 400 个。

```html
<template>
  <div class="block">
    <span class="demonstration">只显示页码</span>
    <hf-ui-pagination
      layout="prev, pager, next"
      :total="60">
    </hf-ui-pagination>
  </div>
  <div class="block">
    <span class="demonstration">不需要显示背景色</span>
    <hf-ui-pagination
      :background="false"
      layout="prev, pager, next"
      :total="60">
    </hf-ui-pagination>
  </div>
  <div class="block">
    <span class="demonstration">显示总数</span>
    <hf-ui-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-size="100"
      layout="prev, pager, next, total"
      :total="1000">
    </hf-ui-pagination>
  </div>
  <!-- <div class="block">
    <span class="demonstration">调整每页显示条数</span>
    <hf-ui-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage2"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </hf-ui-pagination>
  </div> -->
  <div class="block">
    <span class="demonstration">显示跳转</span>
    <hf-ui-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </hf-ui-pagination>
  </div>
  <div class="block">
    <span class="demonstration">完整功能</span>
    <hf-ui-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="prev, pager, next, jumper, total"
      :total="400">
    </hf-ui-pagination>
  </div>
</template>
<script>
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      };
    }
  }
</script>
```
:::

### 栏目分页
模块空间受限，可以切换页码浏览数据， 更多用法请看走马灯 Carousel组件
:::demo 更多用法请看走马灯 `Carousel` 组件
```html
<div class="hf-ui-doc-pagination-demo-1">
  <hf-ui-carousel type="column" background autosize indicator-title="优秀工作室空间">
    <hf-ui-carousel-item v-for="item in 4" :key="item">
      <dl class="card">
        <dt>Image</dt>
        <dd>
          <hf-ui-h :size="3" class="title">杨坤{{item}}</hf-ui-h>
          <hf-ui-h :size="4" class="text">语文</hf-ui-h>
          <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
          <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
        </dd>
      </dl>
      <dl class="card">
        <dt>Image</dt>
        <dd>
          <hf-ui-h :size="3" class="title">欧阳娜娜{{item}}</hf-ui-h>
          <hf-ui-h :size="4" class="text">语文</hf-ui-h>
          <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
          <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
        </dd>
      </dl>
      <dl class="card">
        <dt>Image</dt>
        <dd>
          <hf-ui-h :size="3" class="title">李冰冰{{item}}</hf-ui-h>
          <hf-ui-h :size="4" class="text">语文</hf-ui-h>
          <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
          <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
        </dd>
      </dl>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</div>
```
:::

### Attributes
| 参数               | 说明                                                     | 类型              | 可选值      | 默认值 |
|--------------------|----------------------------------------------------------|-------------------|-------------|--------|
| small | 是否使用小型分页样式 | boolean | — | false |
| background | 是否为分页按钮添加背景色 | boolean | — | true |
| page-size | 每页显示条目个数，支持 .sync 修饰符 | number | — | 10 |
| total | 总条目数 | number | — | — |
| page-count | 总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性 | Number | — | — |
| pager-count | 页码按钮的数量，当总页数超过该值时会折叠 | number | 大于等于 5 且小于等于 21 的奇数 | 7 |
| current-page | 当前页数，支持 .sync 修饰符 | number | — | 1 |
| layout | 组件布局，子组件名用逗号分隔| String | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot` | 'prev, pager, next, jumper, ->, total'  |
| page-sizes | 每页显示个数选择器的选项设置 | number[] | — |  [10, 20, 30, 40, 50, 100] |
| popper-class | 每页显示个数选择器的下拉框类名 | string | — | — |
| prev-text | 替代图标显示的上一页文字 | string | — | — |
| next-text | 替代图标显示的下一页文字 | string | — | — |
| disabled | 是否禁用 | boolean | — | false |
| hide-on-single-page | 只有一页时是否隐藏 | boolean | — | - |
| whole-layout | 是否为分页组件添加整体布局 | boolean | — | false |
| disabled-more | 是否禁止更多按钮点击 | boolean | — | true |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| size-change | pageSize 改变时会触发 | 每页条数 |
| current-change | currentPage 改变时会触发 | 当前页 |
| prev-click | 用户点击上一页按钮改变当前页后触发 | 当前页 |
| next-click | 用户点击下一页按钮改变当前页后触发 | 当前页 |

### Slot
| name | 说明 |
|------|--------|
| — | 自定义内容，需要在 `layout` 中列出 `slot` |
