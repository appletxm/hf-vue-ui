import Col from 'components/col'
import { createTest, createVue, destroyVM } from '../util'

describe('Col', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Col, {
      type: 'primary'
    }, true);
    const colElm = vm.$el;
    const res = colElm.classList.contains('hf-ui-col')
    expect(res).to.be.true;
  })

  it('span', () => {
    vm = createVue({
      template: `
        <hf-ui-col :span="6"></hf-ui-col>
      `
    }, true);
    expect(vm.$el.classList.contains('hf-ui-col-6')).to.true;
  })
  
  it('gutter', () => {
    vm = createVue({
      template: `
        <hf-ui-row :gutter="20">
          <hf-ui-col :span="6"></hf-ui-col>
        </hf-ui-row>
      `
    }, true);
    expect(vm.$el.children[0].style.paddingLeft).to.equal('10px');
    expect(vm.$el.children[0].style.paddingRight).to.equal('10px');
  })

  it('response', () => {
    vm = createVue({
      template: `
        <hf-ui-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"></hf-ui-col>
      `
    }, true);
    const classList = [
      'hf-ui-col-xs-8',
      'hf-ui-col-sm-6',
      'hf-ui-col-md-4',
      'hf-ui-col-lg-3',
      'hf-ui-col-xl-1',
    ];
    expect(Array.from(vm.$el.classList)).to.include.members(classList);
  })

  it('size', () => {
    vm = createVue({
      template: `
        <hf-ui-col :xl="{span: 4, offset: 4}"></hf-ui-col>
      `
    }, true);
    expect(vm.$el.classList.contains('hf-ui-col-xl-4')).to.true;;
    expect(vm.$el.classList.contains('hf-ui-col-xl-offset-4')).to.true;;
  })
})
