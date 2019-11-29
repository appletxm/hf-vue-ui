## Tabs 标签页

选项卡是用于特定板块内，为同范畴内容提供不同类信息展示切换的组件。Tab具有容纳、选项卡作用。

### 全局级标签页

在内容box范围外，需要使用标签页对内容进行区分时，使用全局级标签页。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页，只需要设置 type 属性为 ellipse 就可以使标签页改变为此风格。

```html
<template>
  <div class="hf-doc-tabs-demo-0">
    <hf-ui-tabs v-model="activeName" @tab-click="handleClick" type="ellipse">
      <hf-ui-tab-pane label="用户管理" name="first">用户管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="配置管理" name="second">配置管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="角色管理" name="third">角色管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="定时任务补偿" name="fourth" disabled>定时任务补偿</hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
```
:::

### 一级标签页

基础的、简洁的标签页，最基本的用法。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页，选项卡默认为此风格，或者设置 type 属性为 line 使标签页改变为此风格。

```html
<template>
  <div class="hf-doc-tabs-demo-1">
    <hf-ui-tabs v-model="activeName" @tab-click="handleClick">
      <hf-ui-tab-pane label="用户管理" name="first">用户管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="配置管理" name="second">配置管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="角色管理" name="third" disabled>角色管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
```
:::

### 二级标签页

基础的、简洁的标签页, 通过嵌套组件实现。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页, 只需要设置 type 属性为 text 就可以使标签页改变为此风格。

```html
<template>
  <div class="hf-doc-tabs-demo-2">
    <hf-ui-tabs v-model="activeName" @tab-click="handleClick">
      <hf-ui-tab-pane label="用户管理" name="first">
        <hf-ui-tabs v-model="activeSubName" @tab-click="handleClick" type="text">
          <hf-ui-tab-pane label="子标签一" name="first-sub">子标签一</hf-ui-tab-pane>
          <hf-ui-tab-pane label="子标签二" name="second-sub">子标签二</hf-ui-tab-pane>
          <hf-ui-tab-pane label="子标签三" name="third-sub" disabled>子标签三</hf-ui-tab-pane>
          <hf-ui-tab-pane label="子标签四" name="fourth-sub">子标签四</hf-ui-tab-pane>
        </hf-ui-tabs>
      </hf-ui-tab-pane>
      <hf-ui-tab-pane label="配置管理" name="second"><div class="tab-text-content">配置管理</div></hf-ui-tab-pane>
      <hf-ui-tab-pane label="角色管理" name="third" disabled><div class="tab-text-content">角色管理</div></hf-ui-tab-pane>
      <hf-ui-tab-pane label="定时任务补偿" name="fourth"><div class="tab-text-content">定时任务补偿</div></hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first',
        activeSubName: 'first-sub',
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
```
:::

### 标签页滑动

可以左右、上下滑动，容纳更多标签。。

:::demo Tabs 组件提供了选项卡功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页，选项卡默认为此风格，或者设置 type 属性为 line 使标签页改变为此风格。

```html
<template>
  <div class="hf-doc-tabs-demo-5">
    <hf-ui-button-group>
      <hf-ui-button :class="{'is-active': tabPosition === 'top'}" @click="changePosition('top')">top</hf-ui-button>
      <hf-ui-button :class="{'is-active': tabPosition === 'left'}" @click="changePosition('left')">left</hf-ui-button>
    </hf-ui-button-group>
    <hf-ui-tabs :tab-position="tabPosition">
      <hf-ui-tab-pane label="tab-0">tab-0</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-1">tab-1</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-2">tab-2</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-3">tab-3</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-4">tab-4</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-5">tab-5</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-6">tab-6</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-7">tab-7</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-8">tab-8</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-9">tab-9</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-10">tab-10</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-11">tab-11</hf-ui-tab-pane>
      <hf-ui-tab-pane label="tab-12">tab-12</hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'top'
      };
    },
    methods: {
      changePosition(pos) {
        this.tabPosition = pos;
      }
    },
  };
</script>
```
:::
<!-- 
### 选项卡样式

选项卡样式的标签页。

:::demo 只需要设置 `type` 属性为 `card` 就可以使选项卡改变为标签风格。

```html
<template>
  <div class="hf-doc-tabs-demo-3">
    <hf-ui-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <hf-ui-tab-pane label="用户管理" name="first">用户管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="配置管理" name="second">配置管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="角色管理" name="third">角色管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="定时任务补偿" name="fourth" disabled>定时任务补偿</hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  };
</script>
```
:::

### 卡片化

卡片化的标签页。

:::demo 将`type`设置为`border-card`。
```html
<div class="hf-doc-tabs-demo-4">
  <hf-ui-tabs type="border-card">
    <hf-ui-tab-pane label="用户管理">用户管理</hf-ui-tab-pane>
    <hf-ui-tab-pane label="配置管理">配置管理</hf-ui-tab-pane>
    <hf-ui-tab-pane label="角色管理">角色管理</hf-ui-tab-pane>
    <hf-ui-tab-pane label="定时任务补偿" disabled>定时任务补偿</hf-ui-tab-pane>
  </hf-ui-tabs>
</div>
```
:::
-->

### 位置

可以通过 `tab-position` 设置标签的位置

:::demo 标签一共有四个方向的设置 `tabPosition="left|right|top|bottom"`

```html
<template>
  <div class="hf-doc-tabs-demo-5">
    <hf-ui-button-group>
      <hf-ui-button :class="{'is-active': tabPosition === 'top'}" @click="changePosition('top')">top</hf-ui-button>
      <hf-ui-button :class="{'is-active': tabPosition === 'right'}" @click="changePosition('right')">right</hf-ui-button>
      <hf-ui-button :class="{'is-active': tabPosition === 'bottom'}" @click="changePosition('bottom')">bottom</hf-ui-button>
      <hf-ui-button :class="{'is-active': tabPosition === 'left'}" @click="changePosition('left')">left</hf-ui-button>
    </hf-ui-button-group>
    <hf-ui-tabs :tab-position="tabPosition">
      <hf-ui-tab-pane label="用户管理">用户管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="配置管理">配置管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="角色管理">角色管理</hf-ui-tab-pane>
      <hf-ui-tab-pane label="定时任务补偿">定时任务补偿</hf-ui-tab-pane>
    </hf-ui-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tabPosition: 'left'
      };
    },
    methods: {
      changePosition(pos) {
        this.tabPosition = pos;
      }
    },
  };
</script>
```
:::

### 自定义标签页

可以通过具名 `slot` 来实现自定义标签页的内容

:::demo
```html
<div class="hf-doc-tabs-demo-0">
  <hf-ui-tabs type="ellipse">
    <hf-ui-tab-pane>
      <span slot="label"><i class="hf-ui-icon ui-icon-line-currency-date"></i> 我的行程</span>
      我的行程
    </hf-ui-tab-pane>
    <hf-ui-tab-pane label="消息中心">消息中心</hf-ui-tab-pane>
    <hf-ui-tab-pane label="角色管理">角色管理</hf-ui-tab-pane>
    <hf-ui-tab-pane label="定时任务补偿">定时任务补偿</hf-ui-tab-pane>
  </hf-ui-tabs>
</div>
```
:::
<!--
### 动态增减标签页

增减标签页按钮只能在选项卡样式的标签页下使用

:::demo
```html
<div class="hf-doc-tabs-demo-1">
  <hf-ui-tabs v-model="editableTabsValue" type="line" editable @edit="handleTabsEdit">
    <hf-ui-tab-pane
      :key="item.name"
      v-for="(item, index) in editableTabs"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </hf-ui-tab-pane>
  </hf-ui-tabs>
</div>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        },
        {
          title: 'Tab 3444',
          name: '3',
          content: 'Tab 3 content'
        }
        ],
        tabIndex: 3
      }
    },
    methods: {
      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
  }
</script>
```
:::
-->

### 自定义增加标签页触发器

:::demo
```html
<div class="hf-doc-tabs-demo-1">
  <div class="" style="margin-bottom: 20px;">
    <hf-ui-button
      @click="addTab(editableTabsValue)"
    >
      add tab
    </hf-ui-button>
    <hf-ui-button
      @click="removeTab(editableTabsValue)"
    >
      delete tab
    </hf-ui-button>
  </div>
  <hf-ui-tabs v-model="editableTabsValue">
    <hf-ui-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{item.content}}
    </hf-ui-tab-pane>
  </hf-ui-tabs>
</div>
<script>
  export default {
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: `Tab ${newTabName}`,
          name: newTabName,
          content: `Tab ${newTabName} content`
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>
```
:::

### Tabs Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value / v-model  | 绑定值，选中选项卡的 name  | string   |  —  |  第一个选项卡的 name |
| type     | 风格类型   | string   | line/ellipse/text/card/border-card  |     line   |
| closable  | 标签是否可关闭 (仅在type = card时可用)  | boolean   | — |  false  |
| addable  | 标签是否可增加  (仅在type = card时可用) | boolean   | — |  false  |
| editable  | 标签是否同时可增加和关闭 (仅在type = card时可用)  | boolean   | — |  false  |
| tab-position  | 选项卡所在位置 | string   |  top/right/bottom/left  |  top |
| stretch  | 标签的宽度是否自撑开 | boolean   |  -  |  false |
| before-leave | 切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。 | Function(activeName, oldActiveName) | — | — |

### Tabs Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| tab-click  | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-remove  | 点击 tab 移除按钮后触发  | 被删除的标签的 name |
| tab-add  | 点击 tabs 的新增按钮后触发  | — |
| edit  | 点击 tabs 的新增按钮或 tab 被关闭后触发  | (targetName, action) |

### Tab-pane Attributes
| 参数       | 说明     | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | 选项卡标题   | string   | — |    —     |
| disabled | 是否禁用 | boolean | — | false |
| name      | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string | — | 该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1' |
| closable (仅在type = card时可用) | 标签是否可关闭   | boolean   | — |  false  |
| lazy  | 标签是否延迟渲染   | boolean   | — |  false  |
