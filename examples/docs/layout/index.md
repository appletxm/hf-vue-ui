## 布局 Layout
产品体系中、常用到的布局规范。

### 上中下布局
该布局内容显示范围固定在 1200px内，并且居中显示。整个页面排版稳定，不受用户终端显示器影响。

#### 中部左右布局
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
<style>
  .hf-ui-header{
    background-color: rgba(#B09375, 0.3);
    text-align: center;
    position: relative;
    line-height: 60px;
    color: #FFFFFF;
    .logo {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(#B09375, 0.4);
      color: #FFFFFF;
      position: absolute;
      top: 10px;
      left: 100px;
    }

    span {
      display: inline-block;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .hf-ui-footer {
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    background-color: rgba(#B09375, 0.2);
  }
  .hf-ui-main {
    color: #FFFFFF;
    height: 150px;
    line-height: 150px;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-aside {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-layout {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
  }
  .hf-ui-doc-layout-demo-0 {
    .hf-ui-layout {
      align-items: stretch;
      line-height: 150px;
      text-align: center;
      width: 80%;
      margin: 48px auto 24px auto;
      background-color: transparent;
    }

    .hf-ui-aside {
      margin-right: 24px;
    }

    .hf-ui-main {
      flex: auto;
    }
  }
</style>
```
:::

#### 中部带Tab并左右布局
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
<style>
  .hf-ui-header{
    background-color: rgba(#B09375, 0.3);
    text-align: center;
    position: relative;
    line-height: 60px;
    color: #FFFFFF;
    .logo {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(#B09375, 0.4);
      color: #FFFFFF;
      position: absolute;
      top: 10px;
      left: 100px;
    }

    span {
      display: inline-block;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .hf-ui-footer {
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    background-color: rgba(#B09375, 0.2);
  }
  .hf-ui-main {
    color: #FFFFFF;
    height: 150px;
    line-height: 150px;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-aside {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-layout {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
  }
  .hf-ui-tab {
    height: 50px;
    display: block;
    flex: 1;
    list-style: none;
    display: flex;
    width: 80%;
    background-color: rgba(#B09375, 0.3);
    margin: 24px auto;

    li {
      line-height: 50px;
      min-width: 100px;
      text-align: center;
      color: #FFFFFF;
    }
  }
  .hf-ui-doc-layout-demo-1 {
    .hf-ui-layout {
      align-items: stretch;
      line-height: 150px;
      text-align: center;
      width: 80%;
      margin: 0 auto 24px auto;
      background-color: transparent;
    }

    .hf-ui-aside {
      margin-right: 24px;
    }

    .hf-ui-main {
      flex: auto;
    }
  }
</style>
```
:::

#### 中部整合布局
:::demo 中部整合布局
```html
<hf-ui-layout class="hf-ui-doc-layout-demo-2">
  <hf-ui-header>
    <span class="logo">LOGO</span>
    <span>Header</span>
  </hf-ui-header>
  <hf-ui-main>Main</hf-ui-main>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
<style>
  .hf-ui-header{
    background-color: rgba(#B09375, 0.3);
    text-align: center;
    position: relative;
    line-height: 60px;
    color: #FFFFFF;
    .logo {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(#B09375, 0.4);
      color: #FFFFFF;
      position: absolute;
      top: 10px;
      left: 100px;
    }

    span {
      display: inline-block;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .hf-ui-footer {
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    background-color: rgba(#B09375, 0.2);
  }
  .hf-ui-main {
    color: #FFFFFF;
    height: 150px;
    line-height: 150px;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-aside {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-layout {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
  }
  .hf-ui-doc-layout-demo-2 {
    .hf-ui-main {
      margin: 24px auto 0 auto;
      width: 80%;
      margin-bottom: 24px;
    }
  }
</style>
```
:::

#### 中部带Tab并整合布局
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
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
<style>
  .hf-ui-header{
    background-color: rgba(#B09375, 0.3);
    text-align: center;
    position: relative;
    line-height: 60px;
    color: #FFFFFF;
    .logo {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(#B09375, 0.4);
      color: #FFFFFF;
      position: absolute;
      top: 10px;
      left: 100px;
    }

    span {
      display: inline-block;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .hf-ui-footer {
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    background-color: rgba(#B09375, 0.2);
  }
  .hf-ui-main {
    color: #FFFFFF;
    height: 150px;
    line-height: 150px;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-aside {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-layout {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
  }
  .hf-ui-tab {
    height: 50px;
    display: block;
    flex: 1;
    list-style: none;
    display: flex;
    width: 80%;
    background-color: rgba(#B09375, 0.3);
    margin: 24px auto;

    li {
      line-height: 50px;
      min-width: 100px;
      text-align: center;
      color: #FFFFFF;
    }
  }
  .hf-ui-doc-layout-demo-1 {
    .hf-ui-tab {
      margin-bottom: 0;
    }
    .hf-ui-main {
      margin: 24px auto 0 auto;
      width: 80%;
      margin-bottom: 24px;
    }
  }
</style>
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
</hf-ui-layout>
<style>
  .hf-ui-header{
    background-color: rgba(#B09375, 0.3);
    text-align: center;
    position: relative;
    line-height: 60px;
    color: #FFFFFF;
    .logo {
      display: inline-block;
      width: 200px;
      height: 40px;
      line-height: 40px;
      background-color: rgba(#B09375, 0.4);
      color: #FFFFFF;
      position: absolute;
      top: 10px;
      left: 100px;
    }

    span {
      display: inline-block;
      line-height: 60px;
      vertical-align: middle;
    }
  }
  .hf-ui-footer {
    color: #FFFFFF;
    text-align: center;
    line-height: 60px;
    background-color: rgba(#B09375, 0.2);
  }
  .hf-ui-main {
    color: #FFFFFF;
    height: 150px;
    line-height: 150px;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-aside {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
    text-align: center;
  }

  .hf-ui-layout {
    color: #FFFFFF;
    background-color: rgba(#B09375, 0.3);
  }
  .hf-ui-tab {
    height: 50px;
    display: block;
    flex: 1;
    list-style: none;
    display: flex;
    width: 80%;
    background-color: rgba(#B09375, 0.3);
    margin: 24px auto;

    li {
      line-height: 50px;
      min-width: 100px;
      text-align: center;
      color: #FFFFFF;
    }
  }
  .hf-ui-crumbread {
    color: #B09375;
    height: 60px;
    line-height: 60px;
    background-color: rgba(#B09375, 0.4);
  }
  .hf-ui-doc-layout-demo-4 {
    .hf-ui-layout {
      margin: 0;
      width: 100%;
      display: flex;

      .hf-ui-layout {
        display: block;
        width: 100%;
        margin: 0 24px 24px 24px;
      }
    }

    .hf-ui-aside {
      background-color: rgba(#B09375, 0.4);
    }

    .hf-ui-aside {
      margin: 0;
      line-height: 200px;
    }

    .hf-ui-layout {
      background-color: transparent;
      .hf-ui-layout {
        background-color: transparent;
      }
    }

    .hf-ui-main {
      margin: 0;
      background-color: rgba(#B09375, 0.4);
    }
  }
</style>
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
| width | 侧边栏宽度 | string | — | 200px |

### Footer Attributes
| 参数    | 说明     | 类型    | 可选值      | 默认值 |
|---------|----------|---------|-------------|--------|
| height | 底栏高度 | string | — | 60px |
