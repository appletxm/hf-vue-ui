/* global describe, it, afterEach, expect */
import PopTip from 'components/pop-tip';
import PopTipDirective from 'components/pop-tip/directive';
import { createVue, triggerEvent, createTest, destroyVM, wait } from '../util';

describe('PopTip', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });
  describe('trigger', () => {
    const createVM = (trigger) => createVue(`
      <div>
        <hf-ui-pop-tip
          ref="popover"
          trigger="${trigger}"
          content="content">
          <button slot="reference">trigger ${trigger}</button>
        </hf-ui-pop-tip>
      </div>
    `, true);

    it('click', () => {
      vm = createVM('click');
      const compo = vm.$refs.popover;

      vm.$el.querySelector('button').click();
      expect(compo.showPopper).to.true;
      document.body.click();
      expect(compo.showPopper).to.false;
    });

    it('hover', (done) => {
      vm = createVM('hover');
      const compo = vm.$refs.popover;
      const button = vm.$el.querySelector('button');

      triggerEvent(button, 'mouseenter');
      expect(compo.showPopper).to.true;
      triggerEvent(button, 'mouseleave');
      setTimeout(() => {
        expect(compo.showPopper).to.false;
        done();
      }, 250); // 代码里是 200ms
    });

    it('manual', (done) => {
      vm = createVM('manual');
      const compo = vm.$refs.popover;
      const button = vm.$el.querySelector('button');

      triggerEvent(button, 'mouseenter');
      expect(compo.showPopper).to.false;
      triggerEvent(button, 'mouseleave');
      setTimeout(() => {
        expect(compo.showPopper).to.false;
        done();
      }, 250); // 代码里是 200ms
    });

    it('focus input in children node', () => {
      vm = createVue(`
        <div>
          <hf-ui-pop-tip
            ref="popover"
            trigger="focus"
            content="content">
            <div slot="reference">
              <input type="text" value="trigger focus" />
            </div>
          </hf-ui-pop-tip>
        </div>
      `, true);
      const compo = vm.$refs.popover;
      const input = vm.$el.querySelector('input');

      input.focus();
      expect(compo.showPopper).to.true;
      input.blur();
      expect(compo.showPopper).to.false;
    });

    it('focus textarea in children node', () => {
      vm = createVue(`
        <div>
          <hf-ui-pop-tip
            ref="popover"
            trigger="focus"
            content="content">
            <div slot="reference">
              <textarea></textarea>
            </div>
          </hf-ui-pop-tip>
        </div>
      `, true);
      const compo = vm.$refs.popover;
      const textarea = vm.$el.querySelector('textarea');

      textarea.focus();
      expect(compo.showPopper).to.true;
      textarea.blur();
      expect(compo.showPopper).to.false;
    });

    it('focus input', () => {
      vm = createVue(`
        <div>
          <hf-ui-pop-tip
            ref="popover"
            trigger="focus"
            content="content">
            <input type="text" slot="reference" value="trigger focus" />
          </hf-ui-pop-tip>
        </div>
      `, true);
      const compo = vm.$refs.popover;
      const input = vm.$el.querySelector('input');

      input.focus();
      expect(compo.showPopper).to.true;
      input.blur();
      expect(compo.showPopper).to.false;
    });

    it('focus button', () => {
      vm = createVM('focus');
      const compo = vm.$refs.popover;
      const button = vm.$el.querySelector('button');

      triggerEvent(button, 'mousedown');
      expect(compo.showPopper).to.true;
      triggerEvent(button, 'mouseup');
      expect(compo.showPopper).to.false;
    });
  });

  describe('create by directive', () => {
    const vm = createVue({
      template: `
        <div>
          <hf-ui-pop-tip
            ref="popover"
            trigger="click"
            content="content">
          </hf-ui-pop-tip>
          <hf-ui-button v-pop-tip:popover>create by directive</hf-ui-button>
        </div>
      `,

      directives: {
        PopTip: PopTipDirective
      }
    }, true);
    const compo = vm.$refs.popover;

    it('render', () => {
      expect(vm.$el.querySelector('.hf-ui-pop-tip')).to.have.deep.property('textContent').include('content');
    });

    it('triggering click', (done) => {
      vm.$el.querySelector('button').click();
      expect(compo.popperElm).to.not.exist;
      vm.$nextTick(() => {
        const popperElm = compo.popperElm;
        expect(getComputedStyle(popperElm).display).to.not.equal('none');
        done();
      });
    });

    it('click outside', () => {
      document.body.click();
      expect(compo.showPopper).to.false;
    });
  });

  describe('create by slot', () => {
    const vm = createVue(`
      <div>
        <hf-ui-pop-tip
          ref="popover"
          trigger="click"
          content="content">
          <button slot="reference">create by slot</button>
        </hf-ui-pop-tip>
      </div>
    `, true);
    const compo = vm.$refs.popover;

    it('render', () => {
      expect(vm.$el.querySelector('.hf-ui-pop-tip')).to.have.deep.property('textContent').include('content');
    });

    it('triggering click', (done) => {
      vm.$el.querySelector('button').click();
      expect(compo.popperElm).to.not.exist;
      vm.$nextTick(() => {
        const popperElm = compo.popperElm;
        expect(getComputedStyle(popperElm).display).to.not.equal('none');
        done();
      });
    });

    it('click outside', () => {
      document.body.click();
      expect(compo.showPopper).to.false;
    });
  });

  it('show/hide events', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-pop-tip
            ref="popover"
            trigger="click"
            @show="handleShow"
            @hide="handleHide"
            content="content">
            <button slot="reference">trigger</button>
          </hf-ui-pop-tip>
        </div>
      `,

      methods: {
        handleShow() {
          this.trigger = true;
        },
        handleHide() {
          this.trigger = false;
        }
      },

      data() {
        return {
          trigger: false
        };
      }
    }, true);

    vm.$el.querySelector('button').click();
    setTimeout(() => {
      expect(vm.trigger).to.true;
      document.body.click();
      setTimeout(() => {
        expect(vm.trigger).to.false;
        done();
      }, 50);
    }, 50);
  });

  it('max-width', () => {
    vm = createVue({
      template: `
      <hf-ui-pop-tip
        placement="bottom"
        trigger="click"
        :max-width="maxWidth"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容">
        <hf-ui-button slot="reference">设置最大宽度 click 激活</hf-ui-button>
      </hf-ui-pop-tip>
      `,
      data() {
        return {
          maxWidth: 200,
        };
      }
    }, true);
    expect(vm.$el.querySelector('.hf-ui-pop-tip').style.maxWidth).to.equal('200px');
  });

  it('max-height', () => {
    vm = createVue({
      template: `
      <hf-ui-pop-tip
        placement="bottom"
        trigger="click"
        :max-height="maxHeight"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容。这是一段内容,这是一段内容,这是一段内容,这是一段内容">
        <hf-ui-button slot="reference">设置最大宽度 click 激活</hf-ui-button>
      </hf-ui-pop-tip>
      `,
      data() {
        return {
          maxHeight: 200,
        };
      }
    }, true);
    expect(vm.$el.querySelector('.hf-ui-pop-tip').style.maxHeight).to.equal('200px');
  });

  describe('open/close delays', () => {
    it('100ms open / instant close', async () => {
      vm = createVue(`
        <div>
          <hf-ui-pop-tip
            ref="popover"
            content="content"
            trigger="hover"
            :open-delay="100"
            :close-delay="0">
            <button slot="reference">reference</button>
          </hf-ui-pop-tip>
        </div>
      `, true);
      const compo = vm.$refs.popover;
      const button = vm.$el.querySelector('button');

      triggerEvent(button, 'mouseenter');
      expect(compo.showPopper).to.false;
      await wait(150);
      expect(compo.showPopper).to.true;
      triggerEvent(button, 'mouseleave');
      expect(compo.showPopper).to.false;
    });

    it('instant open / 100ms close', async () => {
      vm = createVue(`
        <div>
          <hf-ui-pop-tip
            ref="popover"
            content="content"
            trigger="hover"
            :open-delay="0"
            :close-delay="100">
            <button slot="reference">reference</button>
          </hf-ui-pop-tip>
        </div>
      `, true);
      const compo = vm.$refs.popover;
      const button = vm.$el.querySelector('button');

      triggerEvent(button, 'mouseenter');
      expect(compo.showPopper).to.true;
      triggerEvent(button, 'mouseleave');
      expect(compo.showPopper).to.true;
      await wait(150);
      expect(compo.showPopper).to.false;
    });
  });

  it('destroy event', () => {
    vm = createTest(PopTip, {
      reference: document.createElement('div'),
      popper: document.createElement('div')
    });
    expect(() => vm.$destroy(true)).not.throw();
  });
});
