import { createTest, createVue, destroyVM } from '../util';
import H from 'components/h';

describe('Custom H', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(H, true);
    expect(vm.$el).to.exist;
  });

  it('prop size work', () => {
    vm = createVue({
      template: `
        <hf-ui-h :size="1">
          h1 text
        </hf-ui-h>
      `
    }, true);
    const hDom = vm.$el.querySelector('b')
    expect(hDom.className.indexOf('hf-ui-h__h1') >= 0).to.true;
  });

  it('prop font-weight work', () => {
    vm = createVue({
      template: `
        <hf-ui-h :size="2" :font-weight="600">
          h2 text
        </hf-ui-h>
      `
    }, true);
    const hDom = vm.$el.querySelector('b')
    expect(hDom.className.indexOf('hf-ui-h__h2') >= 0).to.true;
    expect(hDom.className.indexOf('hf-ui-h--600') >= 0).to.true;
  });
});

