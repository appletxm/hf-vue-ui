import { createTest, createVue, destroyVM } from '../util';
import Icon from 'components/icon';

describe('Icon', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(Icon, true);
    expect(vm.$el).to.exist;
  });

  it('prop icon work', (done) => {
    const icon = 'ui-icon-home'
    vm = createVue({
      template: `<hf-ui-icon icon="${icon}"></hf-ui-icon>`
    }, true);

    setTimeout(() => {
      const iconDom = vm.$el
      expect(iconDom.className.indexOf(icon) >= 0).to.true;
      done()
    }, 0)
  });
});

