import Row from 'components/row'
import { createTest, destroyVM } from '../util'

describe('Row', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Row, {
      type: 'primary'
    }, true);
    const rowElm = vm.$el;
    const res = rowElm.classList.contains('hf-ui-row')
    expect(res).to.be.true;
  })
})
