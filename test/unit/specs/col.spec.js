import Col from 'components/col'
import { createTest, destroyVM } from '../util'

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
})
