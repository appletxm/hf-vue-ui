import { getStyle } from '../../../src/utils/dom';
import { createVue, destroyVM } from '../util';
import Vue from 'vue';
import LoadingService from 'components/loading';

describe('Loading', () => {
  let vms = []
  let Loading = LoadingService.method

  beforeEach(() => {
    vms = []
  })

  afterEach(() => {
    vms.forEach(vm => {
      vm.close && vm.close()
      destroyVM(vm);
    })
  });

  describe('as a directive', () => {
    it('create', done => {
      let vm = createVue({
        template: `
        <div v-loading="loading"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      });

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = vm.$el.querySelector(`.${vm.cfg.prefix}-loading-mask`);
        expect(mask).to.exist;
        vm.loading = false;
        setTimeout(() => {
          expect(mask.style.display).to.equal('none');
          done();
        }, 100);
      });
    });

    it('unbind', done => {
      const vm1 = createVue({
        template: `
        <div v-if="show" v-loading="loading"></div>
      `,
        data() {
          return {
            show: true,
            loading: true
          };
        }
      });

      const vm2 = createVue({
        template: `
        <div v-if="show" v-loading.body="loading"></div>
      `,
        data() {
          return {
            show: true,
            loading: true
          };
        }
      });

      vms.push(vm1, vm2)

      Vue.nextTick(() => {
        vm1.loading = false;
        vm2.loading = false;
        Vue.nextTick(() => {
          vm1.show = false;
          vm2.show = false;
          Vue.nextTick(() => {
            expect(document.querySelector(`.${vm1.cfg.prefix}-loading-mask`)).to.not.exist;
            done();
          });
        });
      });
    });

    it('body', done => {
      let vm = createVue({
        template: `
        <div v-loading.body="loading"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
        expect(mask.parentNode === document.body).to.true;
        vm.loading = false;
        document.body.removeChild(mask);
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('fullscreen', done => {
      let vm = createVue({
        template: `
        <div v-loading.fullscreen="loading"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
        expect(mask.parentNode === document.body).to.true;
        expect(mask.classList.contains('is-fullscreen')).to.true;
        vm.loading = false;
        document.body.removeChild(mask);
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('lock', done => {
      let vm = createVue({
        template: `
        <div v-loading.fullscreen.lock="loading"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        expect(getStyle(document.body, 'overflow')).to.equal('hidden');
        vm.loading = false;
        document.body.removeChild(document.querySelector(`.${vm.cfg.prefix}-loading-mask`));
        document.body.removeChild(vm.$el);
        done();
      });
    });

    it('text', done => {
      let vm = createVue({
        template: `
        <div v-loading="loading" element-loading-text="拼命加载中"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
        const text = mask.querySelector(`.${vm.cfg.prefix}-loading-text`);
        const realText = text.textContent.replace(/[\s|\n|\r|\t]+/g, '')
        expect(text).to.exist;
        expect(realText).to.equal('拼命加载中');
        done();
      });
    });

    it('customClass', done => {
      let vm = createVue({
        template: `
        <div v-loading="loading" element-loading-custom-class="loading-custom-class"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
        expect(mask.classList.contains('loading-custom-class')).to.true;
        done();
      });
    });

    it('type', done => {
      let vm = createVue({
        template: `
        <div v-loading="loading" element-loading-custom-class="loading-custom-class" type="area"></div>
      `,

        data() {
          return {
            loading: true
          };
        }
      }, true);

      vms.push(vm)

      Vue.nextTick(() => {
        const mask = document.querySelector(`.${vm.cfg.prefix}-loading-spinner`);
        expect(mask.classList.contains(`${vm.cfg.prefix}-loading-type-area`)).to.true;
        done();
      });
    });
  });

  describe('as a service', () => {
    it('create', () => {
      let vm = Loading();
      vms.push(vm)
      expect(document.querySelector(`.${vm.cfg.prefix}-loading-mask`)).to.exist;
    });

    it('close', () => {
      let vm = Loading();
      vms.push(vm)
      vm.close();
      expect(vm.visible).to.false;
    });

    it('target', done => {
      let vm = createVue({
        template: `
        <div class="loading-container"></div>
      `
      }, true);
      let vm1 = Loading({ target: '.loading-container' });
      let mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
      let container = document.querySelector('.loading-container');

      vms.push(vm, vm1)

      expect(mask).to.exist;
      expect(mask.parentNode).to.equal(container);
      vm1.close();
      setTimeout(() => {
        expect(getStyle(container, 'position')).to.equal('relative');
        done();
      }, 200);
    });

    it('body', () => {
      let vm = createVue({
        template: `
        <div class="loading-container"></div>
      `
      }, true);
      let vm2 = Loading({
        target: '.loading-container',
        body: true
      });
      vms.push(vm, vm2)
      let mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
      expect(mask).to.exist;
      expect(mask.parentNode).to.equal(document.body);
    });

    it('fullscreen', () => {
      let vm = Loading({ fullScreen: true });
      vms.push(vm)
      const mask = document.querySelector(`.${vm.cfg.prefix}-loading-mask`);
      expect(mask.parentNode).to.equal(document.body);
      expect(mask.classList.contains('is-fullscreen')).to.true;
    });

    it('fullscreen singleton', done => {
      let vm = Loading({ fullScreen: true });
      setTimeout(() => {
        let vm2 = Loading({ fullScreen: true });
        setTimeout(() => {
          let masks = document.querySelectorAll(`.${vm.cfg.prefix}-loading-mask`);
          expect(masks.length).to.equal(1);
          vm2.close();
          setTimeout(() => {
            masks = document.querySelectorAll(`.${vm.cfg.prefix}-loading-mask`);
            expect(masks.length).to.equal(0);
            done();
          }, 350);
        }, 50);
      }, 50);
    });

    it('lock', () => {
      let vm = Loading({ lock: true });
      vms.push(vm)
      expect(getStyle(document.body, 'overflow')).to.equal('hidden');
    });

    it('text', () => {
      let vm = Loading({ text: 'Loading...' });
      vms.push(vm)
      const text = document.querySelector(`.${vm.cfg.prefix}-loading-text`);
      const realText = text.textContent.replace(/[\r|\n|\t|\s]+/g, '')
      expect(text).to.exist;
      expect(realText).to.equal('Loading...');
    });

    it('customClass', () => {
      const cfg = window.Vue.prototype.cfg
      const vm = Loading({ customClass: `${cfg.prefix}-loading-custom-class` });
      vms.push(vm)
      const customClass = document.querySelector(`.${vm.cfg.prefix}-loading-custom-class`);
      expect(customClass).to.exist;
    });
  });
});
