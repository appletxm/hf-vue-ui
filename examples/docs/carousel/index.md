## Carousel 走马灯

在有限空间内，循环播放同一类型的图片、文字等内容

### 基础用法

适用广泛的基础用法

:::demo 结合使用`hf-ui-carousel`和`hf-ui-carousel-item`标签就得到了一个走马灯。幻灯片的内容是任意的，需要放在`hf-ui-carousel-item`标签中。默认情况下，点击 底部的指示器时就会触发切换。通过设置`trigger`属性为`hover`，可以达到鼠标hover触发的效果。
```html
<template>
  <div class="block">
    <span class="demonstration">默认 Click 指示器触发</span>
    <hf-ui-carousel height="150px">
      <hf-ui-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </hf-ui-carousel-item>
    </hf-ui-carousel>
  </div>
  <div class="block">
    <span class="demonstration">Hover 指示器触发</span>
    <hf-ui-carousel trigger="hover" height="150px">
      <hf-ui-carousel-item v-for="item in 4" :key="item">
        <h3 class="small">{{ item }}</h3>
      </hf-ui-carousel-item>
    </hf-ui-carousel>
  </div>
</template>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .hf-ui-carousel__item:nth-child(2n) {
     background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
     background-color: #CCCCCC;
  }
</style>
```
:::

### 指示器

可以将指示器的显示位置设置在容器外部

:::demo `indicator-position`属性定义了指示器的位置。默认情况下，它会显示在走马灯内部，设置为`outside`则会显示在外部；设置为`none`则不会显示指示器。
```html
<template>
  <hf-ui-carousel indicator-position="outside">
    <hf-ui-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</template>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .hf-ui-carousel__item:nth-child(2n) {
    background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
    background-color: #CCCCCC;
  }
</style>
```
:::

### 切换箭头
可以设置切换箭头的显示时机

:::demo `arrow`属性定义了切换箭头的显示时机。默认情况下，切换箭头只有在鼠标 hover 到走马灯上时才会显示；若将`arrow`设置为`always`，则会一直显示；设置为`never`，则会一直隐藏。
```html
<template>
  <hf-ui-carousel :interval="5000" arrow="always">
    <hf-ui-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</template>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .hf-ui-carousel__item:nth-child(2n) {
    background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
    background-color: #CCCCCC;
  }
</style>
```
:::

### 栏目化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用栏目风格

:::demo 将`type`属性设置为`column`即可启用栏目模式。从交互上来说，卡片模式和一般模式的最大区别在于，可以通过直接点击两侧的幻灯片进行切换。
```html
<div>
  <hf-ui-carousel type="column" height="200px" background="#FFFFFF">
    <hf-ui-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium-40">{{ item }}</h3>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</div>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 14px;
    opacity: 0.75;
    line-height: 160px;
    margin: 0;
  }
  
  .hf-ui-carousel__item:nth-child(2n) {
    background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
    background-color: #CCCCCC;
  }
</style>
```
:::

### 卡片化
当页面宽度方向空间空余，但高度方向空间匮乏时，可使用卡片风格

:::demo 将`type`属性设置为`card`即可启用卡片模式。从交互上来说，卡片模式和一般模式的最大区别在于，可以通过直接点击两侧的幻灯片进行切换。
```html
<template>
  <hf-ui-carousel :interval="4000" type="card" height="200px">
    <hf-ui-carousel-item v-for="item in 6" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</template>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .hf-ui-carousel__item:nth-child(2n) {
    background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
    background-color: #CCCCCC;
  }
</style>
```
:::

### 方向
默认情况下，`direction` 为 `horizontal`。通过设置 `direction` 为 `vertical` 来让走马灯在垂直方向上显示。
:::demo
```html
<template>
  <hf-ui-carousel height="200px" direction="vertical" :autoplay="false">
    <hf-ui-carousel-item v-for="item in 3" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </hf-ui-carousel-item>
  </hf-ui-carousel>
</template>

<style>
  .hf-ui-carousel__item h3 {
    color: #FFFFFF;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .hf-ui-carousel__item:nth-child(2n) {
    background-color: #999999;
  }
  
  .hf-ui-carousel__item:nth-child(2n+1) {
    background-color: #CCCCCC;
  }
</style>
```
:::

### Carousel Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| height | 走马灯的高度 | string | — | — |
| background | 是否为分页按钮添加背景色 | Boolean | — | false |
| initial-index | 初始状态激活的幻灯片的索引，从 0 开始 | number | — | 0 |
| trigger | 指示器的触发方式 | string | click / hover | click |
| autoplay | 是否自动切换 | boolean | — | true |
| interval | 自动切换的时间间隔，单位为毫秒 | number | — | 5000 |
| indicator-position | 指示器的位置 | string | outside/none | — |
| arrow | 切换箭头的显示时机 | string | always/hover/never | never |
| type | 走马灯的类型 | string | card / column | — |
| loop | 是否循环显示 | boolean | - | true |
| direction | 走马灯展示的方向 | string | horizontal/vertical | horizontal |
| indicator-title | 指示器的标题(在type为column时才起作用) | String | — |  |
| autosize | 是否自适应内容高度(一般在type为column时才用) | Boolean | — | false |

### Carousel Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 幻灯片切换时触发 | 目前激活的幻灯片的索引，原幻灯片的索引 |

### Carousel Methods
| 方法名      | 说明          | 参数 |
|---------- |-------------- | -- |
| setActiveItem | 手动切换幻灯片 | 需要切换的幻灯片的索引，从 0 开始；或相应 `hf-ui-carousel-item` 的 `name` 属性值 |
| prev | 切换至上一张幻灯片 | — |
| next | 切换至下一张幻灯片 | — |

### Carousel-Item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 幻灯片的名字，可用作 `setActiveItem` 的参数 | string | — | — |
| label | 该幻灯片所对应指示器的文本 | string | — | — |
