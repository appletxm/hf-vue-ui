## 布局 Layout
产品体系中、常用到的布局规范。

### 上中下布局

该布局内容显示范围固定在 1200px内，并且居中显示。整个页面排版稳定，不受用户终端显示器影响。

:::demo 中部左右布局

```html
<hf-ui-container class="hf-ui-doc-layout">
  <hf-ui-header><p class="logo">LOGO</p>Header</hf-ui-header>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-container>
<style>
  .hf-ui-doc-layout {
    width: 1200px;
    position: relative;
    transform: scale(0.5);
  }
  .hf-ui-header{
    bakground
  }
  .logo {
    width: 
  }
</style>
```
:::

### Container Attributes
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
