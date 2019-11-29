/* global describe, it, afterEach, expect */
import { createVue, triggerEvent, destroyVM } from '../util';

describe('Menu', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu>
          <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
          <hf-ui-menu-item index="2" ref="item2">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `
    }, true);
    const item1 = vm.$refs.item1;
    const item2 = vm.$refs.item2;
    item1.$el.click();
    setTimeout(() => {
      expect(item1.$el.classList.contains('is-active')).to.be.true;
      item2.$el.click();
      setTimeout(() => {
        expect(item2.$el.classList.contains('is-active')).to.be.true;
        done();
      }, 20);
    }, 20);
  });
  it('background-color', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu default-active="2"
          background-color="#f00"
          text-color="#000"
          active-text-color="#0f0">
          <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
          <hf-ui-menu-item index="2" ref="item2">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `
    }, true);
    expect(vm.$el.style.backgroundColor).to.equal('rgb(255, 0, 0)');
    expect(vm.$refs.item1.$el.style.backgroundColor).to.equal('rgb(255, 0, 0)');
    expect(vm.$refs.item1.$el.style.color).to.equal('rgb(0, 0, 0)');
    expect(vm.$refs.item2.$el.style.color).to.equal('rgb(0, 255, 0)');
    triggerEvent(vm.$refs.item1.$el, 'mouseenter');
    setTimeout(() => {
      expect(vm.$refs.item1.$el.style.backgroundColor).to.equal('rgb(204, 0, 0)');
      done();
    }, 20);
  });
  it('menu-item click', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu>
          <hf-ui-menu-item @click="onMenuItemClick" index="1" ref="item1">处理中心</hf-ui-menu-item>
          <hf-ui-menu-item index="2" ref="item2">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `,
      methods: {
        onMenuItemClick(el) {
          expect(el).to.be.equal(vm.$refs.item1);
          this.clicksCount = this.clicksCount + 1;
        }
      },
      data() {
        return {
          clicksCount: 0
        };
      }
    }, true);
    const item1 = vm.$refs.item1;
    item1.$el.click();

    setTimeout(() => {
      expect(vm.clicksCount).to.be.equal(1);
      done();
    }, 20);

  });
  it('menu-item disabled', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu default-active="2">
          <hf-ui-menu-item index="1" ref="item1" disabled>处理中心</hf-ui-menu-item>
          <hf-ui-menu-item index="2" ref="item2">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `
    }, true);
    expect(vm.$refs.item2.$el.classList.contains('is-active')).to.be.true;
    vm.$refs.item1.$el.click();
    setTimeout(() => {
      expect(vm.$refs.item1.$el.classList.contains('is-active')).to.be.false;
      done();
    }, 20);
  });
  describe('default active', () => {
    it('normal active', (done) => {
      vm = createVue({
        template: `
          <hf-ui-menu default-active="2">
            <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
            <hf-ui-menu-item index="2" ref="item2">订单管理</hf-ui-menu-item>
          </hf-ui-menu>
        `
      }, true);
      expect(vm.$refs.item2.$el.classList.contains('is-active')).to.be.true;
      vm.$refs.item1.$el.click();
      setTimeout(() => {
        expect(vm.$refs.item1.$el.classList.contains('is-active')).to.be.true;
        done();
      }, 20);
    });
    it('dynamic active', (done) => {
      vm = createVue({
        template: `
          <hf-ui-menu :default-active="active">
            <hf-ui-menu-item index="1" ref="item1">active watch处理中心</hf-ui-menu-item>
            <hf-ui-menu-item index="2" ref="item2">active watch订单管理</hf-ui-menu-item>
          </hf-ui-menu>
        `,
        data() {
          return {
            active: '2'
          };
        }
      }, true);
      setTimeout(() => {
        vm.active = '1';
        setTimeout(() => {
          expect(vm.$refs.item1.$el.classList.contains('is-active')).to.be.true;
          done();
        }, 20);
      }, 100);
    });
    it('vertical submenu item active', (done) => {
      vm = createVue({
        template: `
          <div>
            <hf-ui-menu default-active="2-2">
              <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
              <hf-ui-submenu index="2" ref="submenu">
                <template slot="title">我的工作台</template>
                <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
                <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
                <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
              </hf-ui-submenu>
              <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
            </hf-ui-menu>
          </div>
        `
      }, true);
      expect(vm.$refs.submenuItem2.$el.classList.contains('is-active')).to.be.true;

      setTimeout(() => {
        expect(vm.$refs.submenu.$el.classList.contains('is-opened')).to.be.true;
        expect(vm.$refs.submenu.$el.classList.contains('is-active')).to.be.true;
        done();
      }, 20);
    });
    it('horizontal submenu item active', (done) => {
      vm = createVue({
        template: `
          <div>
            <hf-ui-menu default-active="2-2">
              <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
              <hf-ui-submenu index="2" ref="submenu">
                <template slot="title">我的工作台</template>
                <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
                <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
                <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
              </hf-ui-submenu>
              <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
            </hf-ui-menu>
          </div>
        `
      }, true);
      expect(vm.$refs.submenuItem2.$el.classList.contains('is-active')).to.be.true;

      setTimeout(() => {
        expect(vm.$refs.submenu.$el.classList.contains('is-opened')).to.be.true;
        expect(vm.$refs.submenu.$el.classList.contains('is-active')).to.be.true;
        done();
      }, 20);
    });
  });
  describe('submenu', () => {
    it('toggle', (done) => {
      vm = createVue({
        template: `
          <hf-ui-menu>
            <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
            <hf-ui-submenu index="2" ref="submenu">
              <template slot="title">我的工作台</template>
              <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
              <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
            </hf-ui-submenu>
            <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
          </hf-ui-menu>
        `,
        data() {
          return {
          };
        }
      }, true);
      const submenuItem2 = vm.$refs.submenuItem2;
      const submenu = vm.$refs.submenu;
      submenu.$el.querySelector('.hf-ui-submenu__title').click();
      setTimeout(() => {
        expect(submenu.$el.classList.contains('is-opened')).to.be.true;
        submenuItem2.$el.click();
        setTimeout(() => {
          expect(submenuItem2.$el.classList.contains('is-active')).to.be.true;
          submenu.$el.querySelector('.hf-ui-submenu__title').click();
          setTimeout(() => {
            expect(submenu.$el.classList.contains('is-opened')).to.not.true;
            done();
          }, 20);
        }, 20);
      }, 20);
    });
    it('default opened', (done) => {
      vm = createVue({
        template: `
          <hf-ui-menu :default-openeds="defaultOpeneds">
            <hf-ui-menu-item index="1">default opened处理中心</hf-ui-menu-item>
            <hf-ui-submenu index="2" ref="submenu1">
              <template slot="title">default opened我的工作台</template>
              <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="2-2" ref="submenu1Item2">选项2</hf-ui-menu-item>
              <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
            </hf-ui-submenu>
            <hf-ui-submenu index="3" ref="submenu2">
              <template slot="title">default opened订单管理</template>
              <hf-ui-menu-item index="3-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="3-2" ref="submenu2Item2">选项2</hf-ui-menu-item>
              <hf-ui-menu-item index="3-3">选项3</hf-ui-menu-item>
            </hf-ui-submenu>
          </hf-ui-menu>
        `,
        data() {
          return {
            defaultOpeneds: ['2', '3']
          };
        }
      }, true);
      expect(vm.$refs.submenu1.$el.classList.contains('is-opened')).to.be.true;
      expect(vm.$refs.submenu2.$el.classList.contains('is-opened')).to.be.true;
      vm.defaultOpeneds = ['2'];
      setTimeout(() => {
        expect(vm.$refs.submenu1.$el.classList.contains('is-opened')).to.be.true;
        expect(vm.$refs.submenu2.$el.classList.contains('is-opened')).to.not.true;
        done();
      }, 20);
    });
    it('disabled', (done) => {
      vm = createVue({
        template: `
          <hf-ui-menu>
            <hf-ui-menu-item index="1" ref="item1">处理中心</hf-ui-menu-item>
            <hf-ui-submenu index="2" ref="submenu" disabled>
              <template slot="title">我的工作台</template>
              <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
              <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
            </hf-ui-submenu>
            <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
          </hf-ui-menu>
        `
      }, true);
      const submenu = vm.$refs.submenu;
      submenu.$el.querySelector('.hf-ui-submenu__title').click();
      setTimeout(() => {
        expect(submenu.$el.classList.contains('is-opened')).to.be.false;
        done();
      }, 20);
    });
  });
  it('unique-opened', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu unique-opened default-active="2-2">
          <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
          <hf-ui-submenu index="2" ref="submenu1">
            <template slot="title">我的工作台</template>
            <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="2-2" ref="submenu1Item2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
          <hf-ui-submenu index="3" ref="submenu2">
            <template slot="title">订单管理</template>
            <hf-ui-menu-item index="3-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="3-2" ref="submenu2Item2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="3-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
        </hf-ui-menu>
      `,
      data() {
        return {
        };
      }
    }, true);
    vm.$refs.submenu2.$el.querySelector('.hf-ui-submenu__title').click();
    setTimeout(() => {
      expect(vm.$refs.submenu1.$el.classList.contains('is-opened')).to.not.true;
      done();
    }, 20);
  });
  it('horizontal mode', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu mode="horizontal" menu-trigger="hover">
          <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
          <hf-ui-submenu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
          <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `,
      data() {
        return {
        };
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-menu--horizontal')).to.be.true;
    const submenu = vm.$refs.submenu;
    triggerEvent(submenu.$el, 'mouseenter');
    setTimeout(() => {
      expect(document.body.querySelector('.hf-ui-menu--popup').parentElement.style.display).to.not.ok;
      done();
    }, 500);
  });
  it('menu type', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu  type="popup">
          <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
          <hf-ui-submenu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
          <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `,
      data() {
        return {
        };
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-menu--vertical')).to.be.true;
    const submenu = vm.$refs.submenu;
    const triggerElm = submenu.$el.querySelector('.hf-ui-submenu__title');

    triggerEvent(submenu.$el, 'mouseenter');
    triggerElm.click();
    setTimeout(() => {
      expect(document.body.querySelector('.hf-ui-menu--popup').parentElement.style.display).to.not.ok;
      done();
    }, 500);
  });
  it('menu is-fix-submenu', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu :is-fix-submenu="true" type="popup">
          <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
          <hf-ui-submenu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
          <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `,
      data() {
        return {
        };
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-menu--vertical')).to.be.true;
    const submenu = vm.$refs.submenu;
    const triggerElm = submenu.$el.querySelector('.hf-ui-submenu__title');

    triggerEvent(submenu.$el, 'mouseenter');
    triggerElm.click();
    setTimeout(() => {
      expect(document.body.querySelector('.hf-ui-menu--fix-submenu').classList.contains('hf-ui-menu--fix-submenu')).to.be.true;
      done();
    }, 500);
  });
  it('menu trigger click', (done) => {
    vm = createVue({
      template: `
        <hf-ui-menu mode="horizontal" menu-trigger="click">
          <hf-ui-menu-item index="1">处理中心</hf-ui-menu-item>
          <hf-ui-submenu index="2" ref="submenu">
            <template slot="title">我的工作台</template>
            <hf-ui-menu-item index="2-1">选项1</hf-ui-menu-item>
            <hf-ui-menu-item index="2-2" ref="submenuItem2">选项2</hf-ui-menu-item>
            <hf-ui-menu-item index="2-3">选项3</hf-ui-menu-item>
          </hf-ui-submenu>
          <hf-ui-menu-item index="3">订单管理</hf-ui-menu-item>
        </hf-ui-menu>
      `,
      data() {
        return {
        };
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-menu--horizontal')).to.be.true;
    const submenu = vm.$refs.submenu;
    const triggerElm = submenu.$el.querySelector('.hf-ui-submenu__title');

    triggerEvent(submenu.$el, 'mouseenter');
    triggerElm.click();

    setTimeout(() => {
      expect(document.body.querySelector('.hf-ui-menu--popup').parentElement.style.display).to.not.ok;
      triggerElm.click();
      setTimeout(() => {
        expect(document.body.querySelector('.hf-ui-menu--popup').parentElement.style.display).to.be.equal('none');
        done();
      }, 1000);
    }, 500);
  });
  it('menu group', () => {
    vm = createVue({
      template: `
        <hf-ui-menu mode="vertical" default-active="1">
          <hf-ui-menu-item-group title="分组一" ref="group1">
            <hf-ui-menu-item index="1"><i class="hf-ui-icon-message"></i>导航一</hf-ui-menu-item>
            <hf-ui-menu-item index="2"><i class="hf-ui-icon-message"></i>导航二</hf-ui-menu-item>
          </hf-ui-menu-item-group>
          <hf-ui-submenu index="5">
            <template slot="title">导航五</template>
            <hf-ui-menu-item-group title="分组二">
              <hf-ui-menu-item index="5-1">选项1</hf-ui-menu-item>
              <hf-ui-menu-item index="5-2">选项2</hf-ui-menu-item>
            </hf-ui-menu-item-group>
          </hf-ui-submenu>
        </hf-ui-menu>
      `
    }, true);
    expect(vm.$refs.group1.$el.querySelector('.hf-ui-menu-item-group__title').innerText).to.be.equal('分组一');
  });
  it('dynamic menus, issue 9092', (done) => {
    vm = createVue({
      template: `
          <hf-ui-menu :default-active="active">
            <hf-ui-menu-item
              v-for="menu in menus"
              :index="menu.name"
              :key="menu.name">
              {{menu.description}}
            </hf-ui-menu-item>
          </hf-ui-menu>
        `,
      data() {
        return {
          active: '',
          menus: []
        };
      }
    }, true);
    setTimeout(() => {
      vm.active = '2';
      vm.menus = [
        { name: '1', description: 'happy' },
        { name: '2', description: 'new' },
        { name: '3', description: 'year' }
      ];
      setTimeout(() => {
        expect(vm.$el.querySelector('.hf-ui-menu-item.is-active').innerText).to.equal('new');
        done();
      }, 20);
    }, 100);
  });
});
describe('Menubar', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
      <hf-ui-menubar logo-src="../" avatar-src="../">
        <hf-ui-menu mode="horizontal">
          <hf-ui-menu-item index="1">导航一</hf-ui-menu-item>
          <hf-ui-menu-item index="2">导航二</hf-ui-menu-item>
          <hf-ui-menu-item index="3">导航三</hf-ui-menu-item>
          <hf-ui-menu-item index="4">导航四</hf-ui-menu-item>
          <hf-ui-menu-item index="5">导航五</hf-ui-menu-item>
        </hf-ui-menu>
        <hf-ui-dropdown slot="usermenu" trigger="click" expand-icon="ui-icon-arrowup">
            <span>
              杨小贤<i class="hf-ui-icon ui-icon-arrowdown hf-ui-icon--right"></i>
            </span>
            <hf-ui-dropdown-menu slot="dropdown">
              <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
            </hf-ui-dropdown-menu>
          </hf-ui-dropdown>
      </hf-ui-menubar>
      `
    }, true);
    const menubarElm = vm.$el;
    const res = menubarElm.classList.contains('hf-ui-menubar');
    const resMode = menubarElm.classList.contains('hf-ui-menubar--horizontal');
    const resLogo = menubarElm.querySelector('.hf-ui-menubar__logo').classList.contains('hf-ui-menubar__logo');
    const resUserinfo = menubarElm.querySelector('.hf-ui-menubar__right--userinfo').classList.contains('hf-ui-menubar__right--userinfo');
    expect(res && resMode && resLogo && resUserinfo).to.be.true;
  });
  it('content-width', () => {
    vm = createVue({
      template: `
      <hf-ui-menubar content-width="1200">
        <hf-ui-menu mode="horizontal">
          <hf-ui-menu-item index="1">导航一</hf-ui-menu-item>
          <hf-ui-menu-item index="2">导航二</hf-ui-menu-item>
          <hf-ui-menu-item index="3">导航三</hf-ui-menu-item>
          <hf-ui-menu-item index="4">导航四</hf-ui-menu-item>
          <hf-ui-menu-item index="5">导航五</hf-ui-menu-item>
        </hf-ui-menu>
        <hf-ui-dropdown slot="usermenu" trigger="click" expand-icon="ui-icon-arrowup">
            <span>
              杨小贤<i class="hf-ui-icon ui-icon-arrowdown hf-ui-icon--right"></i>
            </span>
            <hf-ui-dropdown-menu slot="dropdown">
              <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
            </hf-ui-dropdown-menu>
          </hf-ui-dropdown>
      </hf-ui-menubar>
      `

    }, true);
    const menubarElm = vm.$el;
    const res = menubarElm.querySelector('.hf-ui-menubar__wrap');
    expect(res.style.width).to.be.equal('1200px');
  });
  it('max-width and min-width', () => {
    vm = createVue({
      template: `
      <hf-ui-menubar max-width="1200" min-width="800">
        <hf-ui-menu mode="horizontal">
          <hf-ui-menu-item index="1">导航一</hf-ui-menu-item>
          <hf-ui-menu-item index="2">导航二</hf-ui-menu-item>
          <hf-ui-menu-item index="3">导航三</hf-ui-menu-item>
          <hf-ui-menu-item index="4">导航四</hf-ui-menu-item>
          <hf-ui-menu-item index="5">导航五</hf-ui-menu-item>
        </hf-ui-menu>
        <hf-ui-dropdown slot="usermenu" trigger="click" expand-icon="ui-icon-arrowup">
            <span>
              杨小贤<i class="hf-ui-icon ui-icon-arrowdown hf-ui-icon--right"></i>
            </span>
            <hf-ui-dropdown-menu slot="dropdown">
              <hf-ui-dropdown-item divided>黄金糕</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>狮子头</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>螺蛳粉</hf-ui-dropdown-item>
              <hf-ui-dropdown-item divided>蚵仔煎</hf-ui-dropdown-item>
            </hf-ui-dropdown-menu>
          </hf-ui-dropdown>
      </hf-ui-menubar>
      `

    }, true);
    const menubarElm = vm.$el;
    expect(menubarElm.style.maxWidth).to.be.equal('1200px');
    expect(menubarElm.style.minWidth).to.be.equal('800px');
  });
  it('collapse', (done) => {
    vm = createVue({
      template: `
      <hf-ui-menubar mode="vertical" :collapse="isCollapse">
        <hf-ui-menu
          :collapse="isCollapse"
          type="popup">
          <hf-ui-submenu index="1">
            <template slot="title">
              <i class="hf-ui-icon ui-icon-home"></i>
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
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航二</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="3">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航三</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="4">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航四</span>
          </hf-ui-menu-item>
        </hf-ui-menu>
      </hf-ui-menubar>
      `,
      data() {
        return {
          isCollapse: false,
        };
      }
    }, true);
    const menubarElm = vm.$el;
    const res = menubarElm.classList.contains('hf-ui-menubar');
    const resMode = menubarElm.classList.contains('hf-ui-menubar--vertical');
    const resFoldicon = menubarElm.querySelector('.hf-ui-menubar__wrap--foldicon').classList.contains('hf-ui-menubar__wrap--foldicon');
    expect(res && resMode && resFoldicon).to.be.true;
    vm.isCollapse = true;
    vm.$nextTick(() => {
      expect(menubarElm.classList.contains('hf-ui-menubar--collapse')).to.be.true;
      done();
    });
  });
  it('collapse-open-icon and collapse-close-icon', (done) => {
    vm = createVue({
      template: `
      <hf-ui-menubar mode="vertical" :collapse="isCollapse" collapse-open-icon="ui-icon-zhankai-line-currency-expand" collapse-close-icon="ui-icon-shouqi-line-currency-collapse">
        <hf-ui-menu
          :collapse="isCollapse"
          type="popup">
          <hf-ui-submenu index="1">
            <template slot="title">
              <i class="hf-ui-icon ui-icon-home"></i>
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
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航二</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="3">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航三</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="4">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航四</span>
          </hf-ui-menu-item>
        </hf-ui-menu>
      </hf-ui-menubar>
      `,
      data() {
        return {
          isCollapse: false,
        };
      }

    }, true);
    const menubarElm = vm.$el;
    const res = menubarElm.classList.contains('hf-ui-menubar');
    const resMode = menubarElm.classList.contains('hf-ui-menubar--vertical');
    const resFoldicon = menubarElm.querySelector('.hf-ui-menubar__wrap--foldicon').querySelector('.ui-icon-shouqi-line-currency-collapse').classList.contains('ui-icon-shouqi-line-currency-collapse');
    expect(res && resMode && resFoldicon).to.be.true;
    vm.isCollapse = true;
    vm.$nextTick(() => {
      expect(menubarElm.querySelector('.hf-ui-menubar__wrap--foldicon').querySelector('.ui-icon-zhankai-line-currency-expand').classList.contains('ui-icon-zhankai-line-currency-expand')).to.be.true;
      done();
    });
  });
  it('toggleCollapse methods', (done) => {
    vm = createVue({
      template: `
      <hf-ui-menubar mode="vertical" :collapse="isCollapse" @toggleCollapse="toggleCollapse">
        <hf-ui-menu
          default-active="2"
          :collapse="isCollapse"
          type="popup">
          <hf-ui-submenu index="1">
            <template slot="title">
              <i class="hf-ui-icon ui-icon-home"></i>
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
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航二</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="3">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航三</span>
          </hf-ui-menu-item>
          <hf-ui-menu-item index="4">
            <i class="hf-ui-icon ui-icon-home"></i>
            <span slot="title">导航四</span>
          </hf-ui-menu-item>
        </hf-ui-menu>
    </hf-ui-menubar>
      `,
      data() {
        return {
          isCollapse: false,
        };
      },
      methods: {
        toggleCollapse() {
          this.isCollapse = !this.isCollapse;
        }
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-menubar--collapse')).to.be.false;
    vm.$el.querySelector('.hf-ui-menubar__wrap--foldicon').click();
    setTimeout(() => {
      expect(vm.$el.classList.contains('hf-ui-menubar--collapse')).to.be.true;
      vm.$el.querySelector('.hf-ui-menubar__wrap--foldicon').click();
      setTimeout(() => {
        expect(vm.$el.classList.contains('hf-ui-menubar--collapse')).to.be.false;
        done();
      }, 50);
    }, 50);
  });
})
