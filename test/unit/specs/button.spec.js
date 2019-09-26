/* global describe, it, afterEach, expect */
import Button from 'components/button'
import { createTest, destroyVM } from '../util'

describe('Button', () => {
  let vm
  afterEach(() => {
    destroyVM(vm)
  })

  it('create', () => {
    vm = createTest(Button, {
      type: 'primary'
    }, true);
    const buttonElm = vm.$el;
    const res = buttonElm.classList.contains('hf-ui-button')
    expect(res).to.be.true;
  })
})
