## Menu 导航菜单

为网站提供导航功能的菜单。

### 顶部导航菜单

顶部导航菜单由于延展性受限，如果导航菜单项很多的情况不适合使用。固定在页面顶部, 导航菜单项最多限制6个，每个菜单最多6个汉字

#### 顶部居中导航菜单

:::demo 默认固定1200x

```html
<button class="preview-btn" @click="preview">预览</button>
<hf-ui-menubar :content-width="contentWidth" logo-src="assets/images/logo.png" avatar-src="assets/images/avatar.png">
  <hf-ui-menu :default-active="activeIndex" mode="horizontal">
    <hf-ui-menu-item index="1">导航一</hf-ui-menu-item>
    <hf-ui-menu-item index="2">导航二</hf-ui-menu-item>
    <hf-ui-menu-item index="3">导航三</hf-ui-menu-item>
    <hf-ui-menu-item index="4">导航四</hf-ui-menu-item>
    <hf-ui-menu-item index="5">导航五</hf-ui-menu-item>
  </hf-ui-menu>
  <hf-ui-dropdown slot="usermenu" trigger="click">
      <span>
        杨小贤<i class="hf-ui-icon ui-icon-line-direction-down hf-ui-icon--right"></i>
      </span>
      <hf-ui-dropdown-menu slot="dropdown">
        <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
      </hf-ui-dropdown-menu>
    </hf-ui-dropdown>
</hf-ui-menubar>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        contentWidth: '',
      };
    },
    methods: {
      preview(e) {
        const ele = e.currentTarget.parentElement;
        const appEle = document.getElementsByTagName('body');
        const docEle = document.getElementsByClassName('hf-ui-module-all');
        if(ele.getAttribute('class') === 'fullscreen-class') {
          ele.classList.remove("fullscreen-class");
          appEle[0].removeAttribute('style');
          docEle[0].removeAttribute('style');
          this.contentWidth = '';
        } else {
          ele.classList.add("fullscreen-class");
          // appEle[0].style.width = '0';
          appEle[0].style.overflow = 'hidden';
          docEle[0].style.width = '0';
          this.contentWidth = '1200';
        }
      },
    }
  }
</script>
```
:::

#### 顶部左右对齐导航菜单

:::demo 自适应

```html
<button class="preview-btn" @click="preview">预览</button>
<hf-ui-menubar :min-width="750">
  <div slot="logo" class="hf-ui-menubar__logo">
    <a target="_blank">
      <img class="hf-ui-menubar__logo--img" src="assets/images/logo.png">
    </a>
  </div>
  <hf-ui-menu :default-active="activeIndex" mode="horizontal">
    <hf-ui-menu-item index="1">导航一</hf-ui-menu-item>
    <hf-ui-menu-item index="2">导航二</hf-ui-menu-item>
    <hf-ui-menu-item index="3">导航三</hf-ui-menu-item>
    <hf-ui-menu-item index="4">导航四</hf-ui-menu-item>
    <hf-ui-menu-item index="5">导航五</hf-ui-menu-item>
  </hf-ui-menu>
  <div slot="userinfo" class="hf-ui-menubar__right--userinfo">
    <img src="assets/images/avatar.png" class="hf-ui-menubar__right--userinfo--avatar">
    <hf-ui-dropdown trigger="click">
      <span>
        杨小贤<i class="hf-ui-icon ui-icon-line-direction-down hf-ui-icon--right"></i>
      </span>
      <hf-ui-dropdown-menu slot="dropdown">
        <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
        <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
      </hf-ui-dropdown-menu>
    </hf-ui-dropdown>
  </div>
</hf-ui-menubar>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      preview(e) {
        const ele = e.currentTarget.parentElement;
        const appEle = document.getElementsByTagName('body');
        const docEle = document.getElementsByClassName('hf-ui-module-all');
        if(ele.getAttribute('class') === 'fullscreen-class') {
          ele.classList.remove("fullscreen-class");
          appEle[0].removeAttribute('style');
          docEle[0].removeAttribute('style');
        } else {
          ele.classList.add("fullscreen-class");
          // appEle[0].style.width = '0';
          appEle[0].style.overflow = 'hidden';
          docEle[0].style.width = '0';
        }
      },
    }
  }
</script>
```
:::

### 左侧导航菜单

:::demo

```html
<div class="hf-ui-menu-demo-0">
  <button class="preview-btn" @click="preview" style="z-index: 2">预览</button>
  <hf-ui-menubar mode="vertical" :collapse="isCollapse" @toggleCollapse="toggleCollapse">
    <hf-ui-menu
        default-active="2"
        :is-close-menu="isCloseMenu"
        :collapse="isCollapse"
        :is-fix-submenu="true"
        type="popup"
        class="hf-ui-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <hf-ui-submenu index="1">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-user"></i>
            <span>导航一</span>
          </template>
          <hf-ui-menu-item index="1-1">选项1</hf-ui-menu-item>
          <hf-ui-menu-item index="1-2">选项2</hf-ui-menu-item>
          <hf-ui-menu-item index="1-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="1-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item index="1-4-1">选项1</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-submenu>
        <hf-ui-menu-item index="2">
          <i class="hf-ui-icon ui-icon-line-currency-setting"></i>
          <span slot="title">导航二</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="3">
          <i class="hf-ui-icon ui-icon-line-currency-star"></i>
          <span slot="title">导航三</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="4">
          <i class="hf-ui-icon ui-icon-line-currency-date"></i>
          <span slot="title">导航四</span>
        </hf-ui-menu-item>
        <hf-ui-submenu index="5">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-upload"></i>
            <span>导航五</span>
          </template>
          <hf-ui-menu-item index="5-1">选项1</hf-ui-menu-item>
          <hf-ui-menu-item index="5-2">选项2</hf-ui-menu-item>
          <hf-ui-menu-item index="5-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="5-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item index="5-4-1">子选项1</hf-ui-menu-item>
            <hf-ui-submenu index="5-4-2">
              <template slot="title">子选项2</template>
              <hf-ui-menu-item index="5-4-2-1">子子选项1</hf-ui-menu-item>
            </hf-ui-submenu>
          </hf-ui-submenu>
        </hf-ui-submenu>
      </hf-ui-menu>
  </hf-ui-menubar>
</div>
<div class="fullscreen-class" :style="{ display: isShowFullStyle}" ref="fullscreenPreview">
   <button class="preview-btn" @click="preview">预览</button>
   <hf-ui-layout type="sidebar">
    <hf-ui-header>
      <span class="logo">LOGO</span>
      <span>Header</span>
    </hf-ui-header>
    <hf-ui-layout>
      <hf-ui-aside :width="width">
        <hf-ui-menubar mode="vertical" :collapse="isCollapse" @toggleCollapse="toggleCollapse">
          <hf-ui-menu
              default-active="2"
              :is-close-menu="isCloseMenu"
              :collapse="isCollapse"
              :is-fix-submenu="true"
              type="popup"
              class="hf-ui-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <hf-ui-submenu index="1">
                <template slot="title">
                  <i class="hf-ui-icon ui-icon-line-currency-user"></i>
                  <span>导航一</span>
                </template>
                <hf-ui-menu-item index="1-1">选项1</hf-ui-menu-item>
                <hf-ui-menu-item index="1-2">选项2</hf-ui-menu-item>
                <hf-ui-menu-item index="1-3">选项3</hf-ui-menu-item>
                <hf-ui-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <hf-ui-menu-item index="1-4-1">选项1</hf-ui-menu-item>
                </hf-ui-submenu>
              </hf-ui-submenu>
              <hf-ui-menu-item index="2">
                <i class="hf-ui-icon ui-icon-line-currency-setting"></i>
                <span slot="title">导航二</span>
              </hf-ui-menu-item>
              <hf-ui-menu-item index="3">
                <i class="hf-ui-icon ui-icon-line-currency-star"></i>
                <span slot="title">导航三</span>
              </hf-ui-menu-item>
              <hf-ui-menu-item index="4">
                <i class="hf-ui-icon ui-icon-line-currency-date"></i>
                <span slot="title">导航四</span>
              </hf-ui-menu-item>
              <hf-ui-submenu index="5">
                <template slot="title">
                  <i class="hf-ui-icon ui-icon-line-currency-upload"></i>
                  <span>导航五</span>
                </template>
                <hf-ui-menu-item index="5-1">选项1</hf-ui-menu-item>
                <hf-ui-menu-item index="5-2">选项2</hf-ui-menu-item>
                <hf-ui-menu-item index="5-3">选项3</hf-ui-menu-item>
                <hf-ui-submenu index="5-4">
                  <template slot="title">选项4</template>
                  <hf-ui-menu-item index="5-4-1">子选项1</hf-ui-menu-item>
                  <hf-ui-submenu index="5-4-2">
                    <template slot="title">子选项2</template>
                    <hf-ui-menu-item index="5-4-2-1">子子选项1</hf-ui-menu-item>
                  </hf-ui-submenu>
                </hf-ui-submenu>
              </hf-ui-submenu>
            </hf-ui-menu>
        </hf-ui-menubar>
      </hf-ui-aside>
      <div class="aside-right">
        <hf-ui-layout>
          <div class="hf-ui-breadcrumb">Home > nav > Subnav</div>
          <hf-ui-main>Main</hf-ui-main>
        </hf-ui-layout>
      </div>
    </hf-ui-layout>
  </hf-ui-layout>
</div>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        isCollapse: false,
        isShowFullStyle: 'none',
        width: 200,
        isCloseMenu: false,
      };
    },
    methods: {
      preview() {
        this.isCloseMenu = true;
        if (this.isShowFullStyle === 'none') {
          this.isShowFullStyle = 'block';
        } else {
          this.isShowFullStyle = 'none';
        }
      },
      toggleCollapse() {
        this.isCollapse = !this.isCollapse;
        if (this.isCollapse) {
          this.width = 68;
          document.query
        } else {
          this.width = 200;
        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

### 下拉菜单

移动到下拉菜单上，展开更多操作。更多用法详见下拉菜单组件

:::demo 通过组件`slot`来设置下拉触发的元素以及需要通过具名`slot`为`dropdown` 来设置下拉菜单。默认情况下，下拉按钮只要`hover`即可，无需点击也会显示下拉菜单。

```html
<hf-ui-dropdown trigger="click">
  <span>
    基础下拉菜单<i class="hf-ui-icon ui-icon-line-direction-down hf-ui-icon--right"></i>
  </span>
  <hf-ui-dropdown-menu slot="dropdown">
    <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
    <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
    <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
    <hf-ui-dropdown-item divided>双皮奶</hf-ui-dropdown-item>
    <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
  </hf-ui-dropdown-menu>
</hf-ui-dropdown>

<hf-ui-dropdown trigger="click">
  <span>
    带图标下拉菜单<i class="hf-ui-icon ui-icon-line-direction-down hf-ui-icon--right"></i>
  </span>
  <hf-ui-dropdown-menu slot="dropdown">
    <hf-ui-dropdown-item icon="ui-icon-line-currency-user" divided>黄金糕</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-setting" divided>狮子头</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-star" divided>螺蛳粉</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-date" divided>双皮奶</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-edit" divided>蚵仔煎</hf-ui-dropdown-item>
  </hf-ui-dropdown-menu>
</hf-ui-dropdown>

<hf-ui-dropdown trigger="click">
  <span>
    混合下拉菜单<i class="hf-ui-icon ui-icon-line-direction-down hf-ui-icon--right"></i>
  </span>
  <hf-ui-dropdown-menu slot="dropdown">
    <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
    <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-star" divided>螺蛳粉</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-date" divided>双皮奶</hf-ui-dropdown-item>
    <hf-ui-dropdown-item icon="ui-icon-line-currency-edit" divided>蚵仔煎</hf-ui-dropdown-item>
  </hf-ui-dropdown-menu>
</hf-ui-dropdown>

```
:::

### 树形菜单

:::demo
```html
<div class="hf-ui-menu-demo-1">
  <hf-ui-menu class="hf-ui-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <hf-ui-submenu index="1">
      <template slot="title">
        <i class="hf-ui-icon ui-icon-line-currency-user"></i>
        <span slot="title">导航一</span>
      </template>
      <hf-ui-menu-item index="1-1">选项1</hf-ui-menu-item>
      <hf-ui-menu-item index="1-2">选项2</hf-ui-menu-item>
      <hf-ui-menu-item index="1-3">选项3</hf-ui-menu-item>
      <hf-ui-submenu index="1-4">
        <span slot="title">选项4</span>
        <hf-ui-menu-item index="1-4-1">选项1</hf-ui-menu-item>
      </hf-ui-submenu>
    </hf-ui-submenu>
    <hf-ui-menu-item index="2">
      <i class="hf-ui-icon ui-icon-line-currency-setting"></i>
      <span slot="title">导航二</span>
    </hf-ui-menu-item>
    <hf-ui-menu-item index="3">
      <i class="hf-ui-icon ui-icon-line-currency-star"></i>
      <span slot="title">导航三</span>
    </hf-ui-menu-item>
    <hf-ui-menu-item index="4">
      <i class="hf-ui-icon ui-icon-line-currency-date"></i>
      <span slot="title">导航四</span>
    </hf-ui-menu-item>
  </hf-ui-menu>
</div>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

### 顶栏

适用广泛的基础用法。

:::demo 导航菜单默认为垂直模式，通过`mode`属性可以使导航菜单变更为水平模式。另外，在菜单中通过`submenu`组件可以生成二级菜单。Menu 还提供了`background-color`、`text-color`和`active-text-color`，分别用于设置菜单的背景色、菜单的文字颜色和当前激活菜单的文字颜色。

```html
<div class="hf-ui-menu-demo-1">
  <hf-ui-menu :default-active="activeIndex" class="hf-ui-menu-horizontal--demo" mode="horizontal" @select="handleSelect" menu-trigger="click">
    <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
    <hf-ui-submenu index="2">
      <template slot="title">我的工作台</template>
      <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
      <hf-ui-menu-item index="2-2">选项2</hf-ui-menu-item>
      <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
      <hf-ui-submenu index="2-4">
        <template slot="title">选项4</template>
        <hf-ui-menu-item index="2-4-1">选项1</hf-ui-menu-item>
        <hf-ui-menu-item index="2-4-2">选项2</hf-ui-menu-item>
        <hf-ui-menu-item index="2-4-3">选项3</hf-ui-menu-item>
      </hf-ui-submenu>
    </hf-ui-submenu>
    <hf-ui-menu-item index="3" disabled>消息中心</hf-ui-menu-item>
    <hf-ui-menu-item index="4">订单管理</hf-ui-menu-item>
  </hf-ui-menu>
</div>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

### 侧栏

垂直菜单，可内嵌子菜单。

:::demo 通过`hf-ui-menu-item-group`组件可以实现菜单进行分组，分组名可以通过`title`属性直接设定，也可以通过具名 slot 来设定。
```html
<div class="hf-ui-menu-demo-2">
  <div class="col">
    <div>
      <h5>弹出窗菜单</h5>
      <hf-ui-menu
        default-active="2"
        type="popup"
        class="hf-ui-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <hf-ui-submenu index="1">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-user"></i>
            <span>导航一</span>
          </template>
          <hf-ui-menu-item index="1-1">选项1</hf-ui-menu-item>
          <hf-ui-menu-item index="1-2">选项2</hf-ui-menu-item>
          <hf-ui-menu-item index="1-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="1-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item index="1-4-1">选项1</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-submenu>
        <hf-ui-menu-item index="2">
          <i class="hf-ui-icon ui-icon-line-currency-setting"></i>
          <span slot="title">导航二</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="3" disabled>
          <i class="hf-ui-icon ui-icon-line-currency-star"></i>
          <span slot="title">导航三</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="4">
          <i class="hf-ui-icon ui-icon-line-currency-date"></i>
          <span slot="title">导航四</span>
        </hf-ui-menu-item>
        <hf-ui-submenu index="5">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-upload"></i>
            <span>导航五</span>
          </template>
          <hf-ui-menu-item index="5-1">选项1</hf-ui-menu-item>
          <hf-ui-menu-item index="5-2">选项2</hf-ui-menu-item>
          <hf-ui-menu-item index="5-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="5-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item index="5-4-1">选项1</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-submenu>
      </hf-ui-menu>
    </div>
  </div>
  <div class="col">
    <div>
      <h5>树形菜单</h5>
      <hf-ui-menu
        default-active="2"
        class="hf-ui-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose">
        <hf-ui-submenu index="1">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-user"></i>
            <span>导航一</span>
          </template>
          <hf-ui-menu-item-group>
            <template slot="title">分组一</template>
            <hf-ui-menu-item index="1-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="1-2">选项2</hf-ui-menu-item>
          </hf-ui-menu-item-group>
          <hf-ui-menu-item index="1-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="1-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item-group>
              <template slot="title">分组二</template>
              <hf-ui-menu-item index="1-4-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="1-4-2">选项2</hf-ui-menu-item>
            </hf-ui-menu-item-group>
            <hf-ui-menu-item index="1-4-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-submenu>
        <hf-ui-menu-item index="2">
          <i class="hf-ui-icon ui-icon-line-currency-setting"></i>
          <span slot="title">导航二</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="3" disabled>
          <i class="hf-ui-icon ui-icon-line-currency-star"></i>
          <span slot="title">导航三</span>
        </hf-ui-menu-item>
        <hf-ui-menu-item index="4">
          <i class="hf-ui-icon ui-icon-line-currency-date"></i>
          <span slot="title">导航四</span>
        </hf-ui-menu-item>
        <hf-ui-submenu index="5">
          <template slot="title">
            <i class="hf-ui-icon ui-icon-line-currency-upload"></i>
            <span>导航五</span>
          </template>
          <hf-ui-menu-item index="5-1">选项1</hf-ui-menu-item>
          <hf-ui-menu-item index="5-2">选项2</hf-ui-menu-item>
          <hf-ui-menu-item index="5-3">选项3</hf-ui-menu-item>
          <hf-ui-submenu index="5-4">
            <template slot="title">选项4</template>
            <hf-ui-menu-item index="5-4-1">选项1</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-submenu>
      </hf-ui-menu>
    </div>
  </div>
</div>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
```
:::

### Menubar Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal / vertical   | horizontal |
| logo-src     | logo的路径(仅在mode为horizontal时可用)   | string  |   -   | - |
| avatar-src     | 头像的路径(仅在mode为horizontal时可用)    | string  |   -   | - |
| content-width     | 内容宽度(仅在mode为horizontal时可用)    | string / number  |   -   | - |
| min-width     | 最小宽度    | string / number  |   -   | - |
| max-width     | 最大宽度    | string / number  |   -   | - |
| width     | 宽度    | string / number  |   -   | - |
| collapse  | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean  |   —   | false |
| collapse-open-icon  | 折叠展开类名（仅在 mode 为 vertical 时可用）| string  |   —   | ui-icon-line-currency-expand |
| collapse-close-icon  | 折叠关闭类名（仅在 mode 为 vertical 时可用）| string  |   —   | ui-icon-line-currency-collapse |

### Menubar Slots

| Name | 说明 |
|------|--------|
| — | 菜单。 注意： 必须是一个menu组件  |
| logo | 图标， (仅在mode为horizontal时可用)     |
| userinfo | 用户信息 (仅在mode为horizontal时可用)     |
| usermenu | 用户下拉菜单 (仅在mode为horizontal时可用， 通常是dropdown组件， 与userinfo slot 不可共用)     |
| collapseIcon | 折叠图标 (仅在mode为vertical时可用)     |

### Menubar Methods
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| toggleCollapse  | 折叠图标点击触发(仅在mode为vertical时可用)  | — |

### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| mode     | 模式   | string  |   horizontal / vertical   | vertical |
| type  | 菜单弹出类型（仅在 mode 为 vertical 时可用）| string  |   popup / tree   | tree |
| collapse  | 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）| boolean  |   —   | false |
| background-color  | 菜单的背景色（仅支持 hex 格式） | string |   —   |  |
| text-color  | 菜单的文字颜色（仅支持 hex 格式） | string |   —   |  |
| active-text-color  | 当前激活菜单的文字颜色（仅支持 hex 格式） | string |   —   |  |
| default-active | 当前激活菜单的 index | string    | — | — |
| default-openeds | 当前打开的 sub-menu 的 index 的数组 | Array    | — | — |
| unique-opened  | 是否只保持一个子菜单的展开 | boolean   | — | true   |
| menu-trigger  | 子菜单打开的触发方式 | string   | hover / click | hover |
| router  | 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 | boolean   | — | false   |
| collapse-transition  | 是否开启折叠动画 | boolean   | — | false   |
| is-fix-submenu  | 是否固定子菜单打开的位置(仅在type为popup时可用) | boolean   | — | true   |
| is-close-menu  | 手动关闭菜单(仅在type为popup时可用) | boolean   | — | false   |

### Menu Methods
| 方法名称      | 说明    | 参数      |
|---------- |-------- |---------- |
| open  | 展开指定的 sub-menu | index: 需要打开的 sub-menu 的 index |
| close  | 收起指定的 sub-menu | index: 需要收起的 sub-menu 的 index |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| select  | 菜单激活回调 | index: 选中菜单项的 index, indexPath: 选中菜单项的 index path  |
| open  | sub-menu 展开的回调 | index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path  |
| close  | sub-menu 收起的回调 | index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path  |

### SubMenu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string/null  | — | null |
| popper-class | 弹出菜单的自定义类名 | string | — | — |
| show-timeout | 展开 sub-menu 的延时 | number | — | 300 |
| hide-timeout | 收起 sub-menu 的延时 | number | — | 300 |
| disabled  | 是否禁用 | boolean | — | false |
| popper-append-to-body | 是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性 | boolean | — | 一级子菜单：true / 非一级子菜单：false |

### Menu-Item Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| index     | 唯一标志   | string  | — | — |
| route     | Vue Router 路径对象 | Object | — | — |
| disabled  | 是否禁用 | boolean | — | false |

### Menu-Group Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title     | 分组标题   | string  | — | — |
