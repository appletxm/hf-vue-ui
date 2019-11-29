import Row from 'components/row'
import { createTest, createVue, destroyVM } from '../util'

describe('Row', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Row, true);
    const rowElm = vm.$el;
    const res = rowElm.classList.contains('hf-ui-row')
    expect(res).to.be.true;
  })

  it('gutter', () => {
    vm = createVue({
      template: `
        <hf-ui-row :gutter="20"></hf-ui-row>
      `
    }, true);
    expect(vm.$el.style.marginLeft).to.equal('-10px');
    expect(vm.$el.style.marginRight).to.equal('-10px');
  })
})
