/* global describe, it, afterEach, expect */
import Button from 'components/button'
import { createTest, destroyVM, createVue } from '../util'

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
    const res = buttonElm.classList.contains('hf-ui-button');
    expect(res).to.be.true;
  });
  it('icon', () => {
    vm = createTest(Button, {
      icon: 'ui-icon-arrowdown'
    }, true);
    const buttonElm = vm.$el;
    const res = buttonElm.querySelector('.ui-icon-arrowdown')
    expect(res).to.be.ok;
  });
  it('nativeType', () => {
    vm = createTest(Button, {
      nativeType: 'submit'
    }, true);
    const buttonElm = vm.$el;
    expect(buttonElm.getAttribute('type')).to.be.equal('submit');
  });
  it('disabled', () => {
    vm = createTest(Button, {
      disabled: true
    }, true);
    const buttonElm = vm.$el;
    expect(buttonElm.classList.contains('is-disabled')).to.be.true;
  });
  it('size', () => {
    vm = createTest(Button, {
      size: 'medium'
    }, true);
    const buttonElm = vm.$el;
    expect(buttonElm.classList.contains('hf-ui-button--medium')).to.be.true;
  });
  it('click', (done) => {
    let result;
    vm = createVue({
      template: `
        <hf-ui-button @click="handleClick"></hf-ui-button>
      `,
      methods: {
        handleClick(evt) {
          result = evt;
        }
      }
    }, true);
    vm.$el.click();
    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });
  it('click inside', (done) => {
    let result;
    vm = createVue({
      template: `
        <hf-ui-button @click="handleClick"><span class="inner-slot"></span></hf-ui-button>
      `,
      methods: {
        handleClick(evt) {
          result = evt;
        }
      }
    }, true);
    vm.$el.querySelector('.inner-slot').click();
    setTimeout(() => {
      expect(result).to.exist;
      done();
    }, 20);
  });
})
