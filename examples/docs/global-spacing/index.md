## 间距 GlobalSpacomg
产品体系中、常用到的间距规范。

### 一级间距
页面间距 24px

:::demo Main区块与周围区块的间距为24px
```html
<hf-ui-layout class="hf-ui-doc-layout hf-ui-doc-gaps-demo-0">
  <hf-ui-header>Header</hf-ui-header>
  <hf-ui-layout>
    <hf-ui-aside width="206px">Aside</hf-ui-aside>
    <hf-ui-main>Main</hf-ui-main>
  </hf-ui-layout>
  <hf-ui-footer>Footer</hf-ui-footer>
</hf-ui-layout>
```
:::

### 二级间距
分子组件间距 20px, 通产用于页面中分子组件box的间距

:::demo 首页活动卡片间距
```html
<ul class="hf-ui-doc-gaps-demo-1">
  <li>
    <p>Image</p>
    <section>
      <div></div>
      <div></div>
    </section>
  </li>
  <li>
    <p>Image</p>
    <section>
      <div></div>
      <div></div>
    </section>
  </li>
</ul>
```
:::

### 三级间距
分子组件中原子间距 16px、12px、4px, 16px、12px 通常用分子组件内原子box

:::demo 动态中头像与说说内容间距；文字与图片间距4px 通产用于原子内部box的间距
```html
<dl class="hf-ui-doc-gaps-demo-2">
  <dt>Image</dt>
  <dd>
    <article>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
    </article>
    <section>
      <p>Image</p>
      <p>Image</p>
      <p>Image</p>
      <p>Image</p>
      <p>Image</p>
      <p>Image</p>
    </section>
  </dd>
</dl>
```
:::

### 内容间距类型及示例
下拉框
<br/><br/><br/><br/>
资讯列表
内容与边距 20px=  图片与文案 16px <br/>
文案直接间距根据实际字号大小而定 <br/>
:::demo 
```html
<dl>
  <dt></dt>
  <dd></dd>
</dl> 
```
:::
