/* global describe, it, afterEach, expect */
import { createVue, destroyVM } from '../util';

describe('Carousel', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel ref="carousel">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });
    expect(vm.$refs.carousel.direction).to.be.equal('horizontal');
    expect(vm.$el.querySelectorAll('.hf-ui-carousel__item').length).to.equal(3);
  });

  it('auto play', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :interval="50">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
      expect(items[0].classList.contains('is-active')).to.true;
      setTimeout(() => {
        expect(items[1].classList.contains('is-active')).to.true;
        done();
      }, 60);
    }, 10);
  });
  it('autosize', () => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :interval="50" autosize>
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });

    const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
    expect(items[0].classList.contains('is-autosize')).to.true;
  });

  it('initial index', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :autoplay="false" :initial-index="1">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });

    setTimeout(() => {
      expect(vm.$el.querySelectorAll('.hf-ui-carousel__item')[1].classList.contains('is-active')).to.true;
      done();
    }, 10);
  });

  it('reset timer', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :interval="20">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const carousel = vm.$children[0];
      const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
      carousel.handleMouseEnter();
      setTimeout(() => {
        expect(items[0].classList.contains('is-active')).to.true;
        carousel.handleMouseLeave();
        setTimeout(() => {
          expect(items[1].classList.contains('is-active')).to.true;
          done();
        }, 30);
      }, 20);
    }, 10);
  });

  it('change', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :interval="50" @change="handleChange">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `,
      data() {
        return {
          val: -1,
          oldVal: -1
        };
      },
      methods: {
        handleChange(val, oldVal) {
          this.val = val;
          this.oldVal = oldVal;
        }
      }
    });

    setTimeout(() => {
      expect(vm.val).to.equal(1);
      expect(vm.oldVal).to.equal(0);
      done();
    }, 60);
  });

  it('label', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel>
            <hf-ui-carousel-item v-for="item in 3" :key="item" :label="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });
    setTimeout(() => {
      expect(vm.$el.querySelector('.hf-ui-carousel__button').innerText).to.equal('1');
      done();
    }, 10);
  });

  describe('manual control', () => {
    it('hover', (done) => {
      vm = createVue({
        template: `
        <div>
          <hf-ui-carousel :autoplay="false" trigger="hover">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].throttledIndicatorHover(1);
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.hf-ui-carousel__item')[1].classList.contains('is-active')).to.true;
          done();
        }, 10);
      }, 10);
    });

    it('click', (done) => {
      vm = createVue({
        template: `
        <div>
          <hf-ui-carousel :autoplay="false" ref="carousel" arrow="hover">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
      });

      setTimeout(() => {
        const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
        const carousel = vm.$refs.carousel;
        vm.$el.querySelectorAll('.hf-ui-carousel__indicator')[2].click();
        setTimeout(() => {
          expect(items[2].classList.contains('is-active')).to.true;
          carousel.handleButtonEnter('right');
          vm.$el.querySelector('.hf-ui-carousel__arrow--right').click();
          setTimeout(() => {
            expect(items[0].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    });
  });

  describe('methods', () => {
    it('setActiveItem', (done) => {
      vm = createVue({
        template: `
        <div>
          <hf-ui-carousel :autoplay="false">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].setActiveItem(1);
        setTimeout(() => {
          expect(vm.$el.querySelectorAll('.hf-ui-carousel__item')[1].classList.contains('is-active')).to.true;
          done();
        }, 10);
      }, 10);
    });

    it('slide', (done) => {
      vm = createVue({
        template: `
        <div>
          <hf-ui-carousel :autoplay="false">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
      });

      setTimeout(() => {
        vm.$children[0].prev(1);
        const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
        setTimeout(() => {
          expect(items[2].classList.contains('is-active')).to.true;
          vm.$children[0].next(1);
          setTimeout(() => {
            expect(items[0].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    });
  });
  it('column', () => {
    vm = createVue({
      template: `
          <hf-ui-carousel :autoplay="false" type="column">
            <hf-ui-carousel-item v-for="item in 7" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
      `
    });
    expect(vm.$el.classList.contains('hf-ui-carousel--column')).to.true;
  });
  it('card', (done) => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel :autoplay="false" type="card" arrow="hover">
            <hf-ui-carousel-item v-for="item in 7" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });

    setTimeout(() => {
      const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');
      expect(items[0].classList.contains('is-active')).to.true;
      expect(items[1].classList.contains('is-in-stage')).to.true;
      expect(items[6].classList.contains('is-in-stage')).to.true;
      items[1].click();
      setTimeout(() => {
        expect(items[1].classList.contains('is-active')).to.true;
        vm.$el.querySelector('.hf-ui-carousel__arrow--left').click();
        setTimeout(() => {
          expect(items[0].classList.contains('is-active')).to.true;
          items[6].click();
          setTimeout(() => {
            expect(items[6].classList.contains('is-active')).to.true;
            done();
          }, 10);
        }, 10);
      }, 10);
    }, 10);
  });
  it('background', () => {
    vm = createVue({
      template: `
          <hf-ui-carousel :autoplay="false" type="column" background>
            <hf-ui-carousel-item v-for="item in 7" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
      `
    });
    expect(vm.$el.classList.contains('is-background')).to.true;
  });

  it('vertical direction', () => {
    vm = createVue({
      template: `
        <div>
          <hf-ui-carousel ref="carousel" :autoplay="false" direction="vertical" height="100px">
            <hf-ui-carousel-item v-for="item in 3" :key="item"></hf-ui-carousel-item>
          </hf-ui-carousel>
        </div>
      `
    });
    const items = vm.$el.querySelectorAll('.hf-ui-carousel__item');

    expect(vm.$refs.carousel.direction).to.be.equal('vertical');
    expect(items[0].style.transform.indexOf('translateY') !== -1).to.be.true;
  });
});
