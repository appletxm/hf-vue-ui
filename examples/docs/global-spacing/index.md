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
</hf-ui-layout>
<style>
  .hf-ui-doc-gaps-demo-0 {
    .hf-ui-layout {
      display: flex;
      background-color: transparent;
    }

    .hf-ui-aside {
      line-height: 150px;
    }

    .hf-ui-main {
      flex: auto;
      margin: 24px;
    }
  }
</style>
```
:::

### 二级间距
分子组件间距 16px, 通产用于页面中分子组件box的间距

:::demo 首页活动卡片间距
```html
<ul class="hf-ui-doc-gaps-demo-1">
  <li>
  </li>
  <li>
  </li>
</ul>
```
:::

### 三级间距
分子组件中原子box间距 20px、16px、12px、8px、4px;

20px、16px通常用于头像与文本内容间距；12px通常用于文本与图片间距；8px通常用于标签间距；4px通常用于图片间距

:::demo 动态中头像与说说内容间距；文字与图片间距4px 通产用于原子内部box的间距
```html
<div class="hf-ui-doc-gaps-demo-2">
  <dl class="left-block">
    <dt>Image</dt>
    <dd>
      <article>
        <hf-ui-h :size="4" :font-weight="700" class="title">广东省教育厅</hf-ui-h>
        <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
        <hf-ui-h :size="4" class="text">暑假快结束了，大家的假期笔记完成的如何？</hf-ui-h>
      </article>
      <section>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
      </section>
    </dd>
  </dl>
</div>
```
:::

### 内容间距类型及示例
下拉框
组件间距16px    高度为60px
:::demo 
```html
<div>
  <div class="hf-ui-doc-gaps-demo-3">
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
    <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="opel">Opel</option>
      <option value="audi">Audi</option>
    </select>
  </div>
</div>
```
:::

资讯列表
内容与边距 20px=  图片与文案 16px <br/>
文案直接间距根据实际字号大小而定 <br/>
:::demo 
```html
<dl class="hf-ui-doc-gaps-demo-4">
  <dt>Image</dt>
  <dd>
    <hf-ui-h :size="3" class="title">杨坤</hf-ui-h>
    <hf-ui-h :size="4" class="text">语文</hf-ui-h>
    <hf-ui-h :size="5" class="date">广州市第二中学</hf-ui-h>
    <hf-ui-h :size="5" class="date">访问量：1638</hf-ui-h>
  </dd>
</dl>
```
:::

大标题<br/>
卡片高度为60px <br/>
:::demo 
```html
<div class="hf-ui-doc-gaps-demo-5">
  <div class="hf-ui-card__header">活动</div>
  <div class="hf-ui-doc-gaps-demo-8">
    <dl class="left-block">
      <dt>Image</dt>
      <dd>
        <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
        <hf-ui-h :size="4" class="text">2018支教贫困山区广东省教育局支教活动广东省教育局支教活动</hf-ui-h>
      </dd>
    </dl>
    <dl class="left-block">
      <dt>Image</dt>
      <dd>
        <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
        <hf-ui-h :size="4" class="text">2018支教贫困山区广东省教育局支教活动广东省教育局支教活动</hf-ui-h>
      </dd>
    </dl>
  </div>
</div>
```
:::

输入框<br/>
文字和输入框之间间距为48px    上下间距为24px <br/>
:::demo 
```html
<div class="hf-ui-doc-gaps-demo-6">
  <div class="hf-ui-form-item">
    <label>姓名</label>
    <input type="text"/>
  </div>
  <div class="hf-ui-form-item">
    <label>应用名称</label>
    <input type="text"/>
  </div>
</div>
```
:::

动态<br/>
内容与边距 20px  图片与文案 12px  图片与图片 4px  <br/>
文案直接间距根据实际字号大小而定 <br/>
:::demo 
```html
<div class="hf-ui-doc-gaps-demo-7">
  <dl class="left-block">
    <dt>Image</dt>
    <dd>
      <article>
        <hf-ui-h :size="4" :font-weight="700" class="title">广东省教育厅</hf-ui-h>
        <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
        <hf-ui-h :size="4" class="text">暑假快结束了，大家的假期笔记完成的如何？</hf-ui-h>
      </article>
      <section>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
        <div><p>Image</p></div>
      </section>
    </dd>
  </dl>
</div>
```
:::

活动、资讯<br/>
内容与边距 20px  图片与文案 16px<br/>
文案直接间距根据实际字号大小而定 <br/>
:::demo 
```html
<div class="hf-ui-doc-gaps-demo-8">
  <dl class="left-block">
    <dt>Image</dt>
    <dd>
      <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
      <hf-ui-h :size="4" class="text">2018支教贫困山区广东省教育局支教活动广东省教育局支教活动</hf-ui-h>
    </dd>
  </dl>
  <dl class="left-block">
    <dt>Image</dt>
    <dd>
      <hf-ui-h :size="5" class="date">2018-8-18</hf-ui-h>
      <hf-ui-h :size="4" class="text">2018支教贫困山区广东省教育局支教活动广东省教育局支教活动</hf-ui-h>
    </dd>
  </dl>
</div>
```
:::
