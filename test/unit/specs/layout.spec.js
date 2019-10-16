/* global describe, it, afterEach, expect */
import Layout from 'components/layout';
import Header from 'components/header';
import Content from 'components/content';
import Main from 'components/main';
import Aside from 'components/aside';
import Footer from 'components/footer';
import { createTest, createVue, destroyVM } from '../util';

describe('Layout', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Layout, true);
    expect(vm.$el).to.exist;
  });

  it('vertical', () => {
    vm = createVue({
      template: `
        <hf-ui-layout>
          <hf-ui-header></hf-ui-header>
          <hf-ui-main></hf-ui-main>
        </hf-ui-layout>
      `
    }, true);
    expect(vm.$children[0].$el.classList.contains('is-vertical')).to.true;
  });

  it('direction', (done) => {
    vm = createVue({
      template: `
        <hf-ui-layout :direction="direction">
          <hf-ui-header></hf-ui-header>
          <hf-ui-main></hf-ui-main>
        </hf-ui-layout>
      `,
      data() {
        return {
          direction: 'horizontal'
        };
      }
    }, true);
    expect(vm.$children[0].$el.classList.contains('is-vertical')).not.to.true;
    vm.direction = 'vertical';
    vm.$nextTick(() => {
      expect(vm.$children[0].$el.classList.contains('is-vertical')).to.true;
      done();
    });
  });
  it('type', (done) => {
    vm = createVue({
      template: `
      <hf-ui-layout :type="type">
        <hf-ui-aside width="206px">Aside</hf-ui-aside>
        <hf-ui-main>Main</hf-ui-main>
      </hf-ui-layout>
      `,
      data() {
        return {
          type: 'api'
        };
      }
    }, true);
    expect(vm.$el.classList.contains('hf-ui-layout-api')).to.true;
    vm.type = 'api-tab';
    vm.$nextTick(() => {
      expect(vm.$children[0].$el.classList.contains('hf-ui-layout-api-tab')).to.true;
      done();
    });
  });
  it('min-width', () => {
    vm = createVue({
      template: `
        <hf-ui-layout :min-width="minWidth"></hf-ui-layout>
      `,
      data() {
        return {
          minWidth: 500,
        };
      }
    }, true);
    expect(vm.$el.style.minWidth).to.equal('500px');
  });
});

describe('Header', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Header, true);
    expect(vm.$el).to.exist;
  });

  it('height', () => {
    vm = createVue({
      template: `
        <hf-ui-header height="100px"></hf-ui-header>
      `
    }, true);
    expect(vm.$children[0].$el.style.height).to.equal('100px');
  });
});
describe('Content', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Content, true);
    expect(vm.$el).to.exist;
  });

  it('width', () => {
    vm = createVue({
      template: `
        <hf-ui-content width="400"></hf-ui-content>
      `
    }, true);
    expect(vm.$children[0].$el.style.width).to.equal('400px');
  });
});

describe('Aside', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Aside, true);
    expect(vm.$el).to.exist;
  });

  it('width', () => {
    vm = createVue({
      template: `
        <hf-ui-aside width="200px"></hf-ui-aside>
      `
    }, true);
    expect(vm.$children[0].$el.style.width).to.equal('200px');
  });
});

describe('Main', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Main, true);
    expect(vm.$el).to.exist;
  });
});

describe('Footer', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Footer, true);
    expect(vm.$el).to.exist;
  });

  it('height', () => {
    vm = createVue({
      template: `
        <hf-ui-footer height="100px"></hf-ui-footer>
      `
    }, true);

    expect(vm.$children[0].$el.style.height).to.equal('100px');
  });
});
