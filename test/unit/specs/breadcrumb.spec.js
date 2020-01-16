import Breadcrumb from 'components/breadcrumb';
import { createTest, createVue, destroyVM } from '../util';

describe('Breadcrumb', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Breadcrumb, true);
    const breadcrumbElm = vm.$el;
    const res = breadcrumbElm.classList.contains('hf-ui-breadcrumb');
    expect(res).to.be.true;
  })

  it('separator class', () => {
    vm = createVue({
      template: `
      <hf-ui-breadcrumb separator-class="hf-ui-icon ui-icon-line-direction-right">
        <hf-ui-breadcrumb-item>1</hf-ui-breadcrumb-item>
        <hf-ui-breadcrumb-item>2</hf-ui-breadcrumb-item>
      </hf-ui-breadcrumb>
      `
    }, true);
    const classList = [
      'hf-ui-breadcrumb__separator',
      'hf-ui-icon',
      'ui-icon-line-direction-right'
    ];
    expect(Array.from(vm.$el.children[0].children[1].classList)).to.include.members(classList);
  })

  it('separator', () => {
    vm = createVue({
      template: `
      <hf-ui-breadcrumb separator="/">
        <hf-ui-breadcrumb-item>3</hf-ui-breadcrumb-item>
        <hf-ui-breadcrumb-item>4</hf-ui-breadcrumb-item>
      </hf-ui-breadcrumb>
      `
    }, true);
    expect(vm.$el.children[0].children[1].classList.contains('hf-ui-breadcrumb__separator')).to.true;
  })

  it('theme', () => {
    vm = createVue({
      template: `
      <hf-ui-breadcrumb theme="white">
        <hf-ui-breadcrumb-item>5</hf-ui-breadcrumb-item>
        <hf-ui-breadcrumb-item>6</hf-ui-breadcrumb-item>
      </hf-ui-breadcrumb>
      `
    }, true);
    expect(vm.$el.classList.contains('white')).to.true;
  })

  it('to', () => {
    vm = createVue({
      template: `
      <hf-ui-breadcrumb separator="/">
        <hf-ui-breadcrumb-item ref="to" :to="{ path: '/' }">7</hf-ui-breadcrumb-item>
        <hf-ui-breadcrumb-item ref="replace" :replace="true" :to="{ path: '/page' }">8</hf-ui-breadcrumb-item>
      </hf-ui-breadcrumb>
      `
    }, true);
    expect(vm.$el.children[0].children[0].classList.contains('is-link')).to.true;
  })
})