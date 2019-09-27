## 布局 Layout
产品体系中、常用到的布局规范。

### 上中下布局
该布局内容显示范围固定在 1200px内，并且居中显示。整个页面排版稳定，不受用户终端显示器影响。

:::demo 中部左右布局

```html
<hf-ui-layout class="hf-ui-doc-layout-demo-0">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <hf-ui-layout>
    <hf-ui-aside width="206px">Aside</hf-ui-aside>
    <hf-ui-main>Main</hf-ui-main>
  </hf-ui-layout>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::

:::demo 中部带Tab并左右布局
```html
<hf-ui-layout class="hf-ui-doc-layout-demo-1">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <ul class="hf-ui-tab">
    <li>tab1</li>
    <li>tab2</li>
    <li>tab2</li>
  </ul>
  <hf-ui-layout>
    <hf-ui-aside width="206px">Aside</hf-ui-aside>
    <hf-ui-main>Main</hf-ui-main>
  </hf-ui-layout>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::

:::demo 中部整合布局
```html
<hf-ui-layout class="hf-ui-doc-layout-demo-2">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::

:::demo 中部带Tab并整合布局
```html
<hf-ui-layout class="hf-ui-doc-layout-demo-3">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <ul class="hf-ui-tab">
    <li>tab1</li>
    <li>tab2</li>
    <li>tab2</li>
  </ul>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::

### 顶部侧边栏布局
该布局主要用于应用类型产品或项目。
限制：页面适应最少尺寸为1200px，（如浏览器伸缩范围小于1200px, 页面内容保持1200px正常显示, 内容超出部分在浏览器上出现滚动条。）

:::demo 基础侧边栏布局
```html
<hf-ui-layout class="hf-ui-doc-layout-demo-4">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <hf-ui-layout>
    <hf-ui-aside width="200px">Aside</hf-ui-aside>
    <hf-ui-layout>
      <div class="hf-ui-crumbread">Home > nav > Subnav</div>
      <hf-ui-main>Main</hf-ui-main>
    </hf-ui-layout>
  </hf-ui-layout>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::


### Layout Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| direction | 子元素的排列方向 | string | horizontal / vertical | 子元素中有 `el-header` 或 `el-footer` 时为 vertical，否则为 horizontal |

### Header Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 顶栏高度 | string | — | 60px |

### Aside Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| width | 侧边栏宽度 | string | — | 300px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |
